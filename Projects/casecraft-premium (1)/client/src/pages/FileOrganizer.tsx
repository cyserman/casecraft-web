import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, Upload, Folder, Shield, Zap, CheckCircle, FileText, Loader2, AlertCircle, Database, Brain, Sparkles } from "lucide-react";
import { parseFile } from "@/services/fileParser";
import { generateSchema } from "@/services/geminiService";
import { AppFile, FileStatus } from "@/types/ingestor";
import { toast } from "sonner";

export default function FileOrganizer() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem("casecraft_files");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // hydration hack: files need to be re-instantiated if strictly needed, 
        // but for display we just need the schema. 
        // The File object itself is lost in localStorage, so we can't re-process without re-upload.
        setFiles(parsed.map((f: any) => ({ ...f, file: { name: f.fileName, size: f.fileSize, type: f.mimeType } })));
      } catch (e) {
        console.error("Failed to load files", e);
      }
    }
  }, []);

  useEffect(() => {
    const toSave = files.map(f => ({
      ...f,
      fileName: f.file.name,
      fileSize: f.file.size,
      // Avoid circular json structure or huge blobs if possible, just save schema/status
      file: undefined
    }));
    localStorage.setItem("casecraft_files", JSON.stringify(toSave));
  }, [files]);

  // File Upload Handler
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    event.preventDefault();
    let uploadedFiles: FileList | File[] | null = null;

    if ('dataTransfer' in event) {
      if (event.dataTransfer.items) {
        uploadedFiles = [] as any;
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          const item = event.dataTransfer.items[i];
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) (uploadedFiles as any).push(file);
          }
        }
      } else {
        uploadedFiles = event.dataTransfer.files;
      }
    } else {
      uploadedFiles = event.target.files;
    }

    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setIsUploading(true);
    // @ts-ignore
    const newFiles: AppFile[] = Array.from(uploadedFiles).map(f => ({
      id: Math.random().toString(36).substring(2, 11),
      file: f,
      status: FileStatus.IDLE,
      progress: 0,
      mimeType: f.type || 'application/octet-stream',
      timestamp: Date.now()
    }));

    setFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
    toast.success(`${newFiles.length} files added to queue`);
  }, []);

  // Process Pipeline
  const processPipeline = async () => {
    const pending = files.filter(f => f.status === FileStatus.IDLE);
    if (pending.length === 0) {
      toast.info("No pending files to process");
      return;
    }

    for (const file of pending) {
      setProcessingId(file.id);
      updateFileStatus(file.id, FileStatus.PARSING);

      try {
        // 1. Parse
        const text = await parseFile(file.file);
        updateFileStatus(file.id, FileStatus.GENERATING, { extractedText: text });

        // 2. Analyze (Gemini)
        const schema = await generateSchema(text, file.file.name);

        // 3. Complete
        updateFileStatus(file.id, FileStatus.COMPLETED, { schema });
        toast.success(`Processed: ${file.file.name}`);

        if (!selectedFileId) setSelectedFileId(file.id);

      } catch (err: any) {
        console.error(err);
        updateFileStatus(file.id, FileStatus.ERROR, { error: err.message });
        toast.error(`Failed: ${file.file.name}`);
      }
    }
    setProcessingId(null);
  };

  const updateFileStatus = (id: string, status: FileStatus, extra: Partial<AppFile> = {}) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status, ...extra } : f));
  };

  const selectedFile = files.find(f => f.id === selectedFileId);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-off-white">
      {/* Hero */}
      <section className="container mb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6">
            The Evidence Eater
          </h1>
          <p className="text-xl text-charcoal-gray max-w-3xl mx-auto">
            Ingest. Analyze. Dominate. Turn raw files into courtroom ammunition with Gemini-3.
          </p>
        </div>
      </section>

      {/* Main Interface */}
      <section className="container grid lg:grid-cols-3 gap-8">

        {/* Left: Ingestion Zone */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`glass-panel p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${isUploading ? 'border-yellow-500 bg-yellow-50' : 'border-slate-300 hover:border-steel-blue'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileUpload}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt,.csv,.xlsx,.pptx"
            />
            <div className="text-center">
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isUploading ? 'text-yellow-500 animate-bounce' : 'text-slate-400'}`} />
              <h3 className="text-lg font-bold text-navy-blue">Drop Evidence Here</h3>
              <p className="text-sm text-slate-500 mt-2">PDF, DOCX, TXT, XLSX</p>
            </div>
          </div>

          {/* Queue List */}
          <div className="glass-panel p-6 rounded-xl min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy-blue flex items-center gap-2">
                <Database className="w-4 h-4" /> Queue ({files.length})
              </h3>
              <button
                onClick={processPipeline}
                disabled={!!processingId || files.filter(f => f.status === FileStatus.IDLE).length === 0}
                className="bg-navy-blue text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                {processingId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                Process All
              </button>
            </div>

            <div className="space-y-3">
              {files.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-8 italic">No evidence queued.</p>
              )}
              {files.map(file => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`p-3 rounded-lg cursor-pointer border transition-all ${selectedFileId === file.id ? 'bg-white border-yellow-500 shadow-md' : 'bg-white/50 border-transparent hover:bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy-blue truncate text-sm">{file.file.name}</span>
                    {file.status === FileStatus.PARSING && <Loader2 className="w-3 h-3 animate-spin text-steel-blue" />}
                    {file.status === FileStatus.GENERATING && <Sparkles className="w-3 h-3 animate-pulse text-yellow-500" />}
                    {file.status === FileStatus.COMPLETED && <div className="text-green-500"><CheckCircle className="w-4 h-4" /></div>}
                    {file.status === FileStatus.ERROR && <div className="text-red-500"><AlertCircle className="w-4 h-4" /></div>}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{(file.file.size / 1024).toFixed(0)} KB</span>
                    <span className="uppercase">{file.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Analysis Results */}
        <div className="lg:col-span-2">
          <div className="glass-panel-lg p-8 rounded-xl min-h-[600px] h-full flex flex-col">
            <h3 className="text-xl font-serif font-bold text-navy-blue mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-yellow-500" />
              Knowledge Core
            </h3>

            {selectedFile ? (
              <div className="flex-1 overflow-y-auto">
                {selectedFile.status === FileStatus.COMPLETED && selectedFile.schema ? (
                  <div className="animate-fade-in">
                    <div className="mb-6 border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1 block">
                        {selectedFile.schema.documentType} • {selectedFile.file.name}
                      </span>
                      <h2 className="text-3xl font-serif font-bold text-navy-blue">
                        {selectedFile.schema.title || "Untitled Analysis"}
                      </h2>
                      <p className="text-lg text-slate-600 mt-2 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                        "{selectedFile.schema.summary}"
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/60 p-5 rounded-xl border border-white/40 shadow-sm">
                        <h4 className="font-bold text-navy-blue mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                          <Shield className="w-4 h-4 text-steel-blue" /> Key Entities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedFile.schema.entities.map((e, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200 hover:bg-white hover:border-steel-blue transition-colors cursor-help" title={e.description}>
                              {e.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/60 p-5 rounded-xl border border-white/40 shadow-sm">
                        <h4 className="font-bold text-navy-blue mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                          <Zap className="w-4 h-4 text-yellow-500" /> Key Claims
                        </h4>
                        <ul className="space-y-2">
                          {selectedFile.schema.keyClaims.slice(0, 5).map((c, i) => (
                            <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                              <span className="text-yellow-500 mt-0.5">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                      <h4 className="text-white font-bold mb-3 border-b border-slate-700 pb-2 flex justify-between">
                        <span>GENERATED EXPERT PERSONA (SYSTEM PROMPT)</span>
                        <span className="text-green-500">READY FOR SYNC</span>
                      </h4>
                      <pre className="whitespace-pre-wrap opacity-80">{selectedFile.schema.expertPersona}</pre>
                    </div>
                  </div>
                ) : selectedFile.status === FileStatus.ERROR ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-red-500">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <h3 className="text-lg font-bold">Analysis Failed</h3>
                    <p className="text-sm mt-2">{selectedFile.error}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 border-4 border-slate-200 border-t-yellow-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-navy-blue" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-navy-blue">Analyzing Evidence...</h3>
                    <p className="text-slate-500 mt-2 animate-pulse font-mono text-xs uppercase tracking-widest">
                      {selectedFile.status === FileStatus.PARSING ? "Extracting Raw Text" : "Generating Semantic Schema"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl m-4">
                <Brain className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a file from the queue to inspect findings.</p>
              </div>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}
