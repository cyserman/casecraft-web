import { ArrowRight, Upload, Folder, Shield, Zap, CheckCircle } from "lucide-react";

export default function FileOrganizer() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6">
            File Organizer
          </h1>
          <p className="text-xl text-charcoal-gray max-w-3xl mx-auto">
            Drag-and-drop file management with automatic organization and SHA-256 verification.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Upload,
              title: "Drag and Drop Upload",
              description: "Simply drag files from your computer and drop them into the organizer. Supports all file types.",
            },
            {
              icon: Folder,
              title: "Auto-Organization",
              description: "Files are automatically organized by type, date, and custom categories.",
            },
            {
              icon: Shield,
              title: "Integrity Verification",
              description: "Every file is verified with SHA-256 fingerprinting to ensure data integrity.",
            },
            {
              icon: Zap,
              title: "Fast Search",
              description: "Full-text search across all files and metadata for instant retrieval.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-3">{feature.title}</h3>
              <p className="text-charcoal-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upload Interface */}
      <section className="container mb-20">
        <div className="glass-panel-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-serif font-bold text-navy-blue mb-8 text-center">Upload Files</h2>
          
          <div className="border-2 border-dashed border-slate-gray rounded-xl p-12 text-center bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
            <Upload className="w-16 h-16 text-steel-blue mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-navy-blue mb-2">Drag files here</h3>
            <p className="text-charcoal-gray mb-4">or click to browse your computer</p>
            <p className="text-sm text-medium-gray">Supports all file types - documents, images, videos, audio, and more</p>
          </div>
        </div>
      </section>

      {/* Organization System */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Smart Organization</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "Automatic Categorization",
              description: "Files are automatically sorted into categories based on file type, date, and custom tags you create.",
              features: ["Document files", "Images and photos", "Audio recordings", "Video files", "Custom categories"],
            },
            {
              title: "Metadata Extraction",
              description: "Automatically extract and index metadata from files for better searchability and organization.",
              features: ["File creation date", "Author information", "Document properties", "Image EXIF data", "Custom metadata"],
            },
            {
              title: "Version Control",
              description: "Keep track of file versions and changes with automatic version history.",
              features: ["Version history", "Change tracking", "Rollback capability", "Comparison tools", "Audit trail"],
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-4">{item.title}</h3>
              <p className="text-charcoal-gray mb-6">{item.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {item.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0" />
                    <span className="text-sm text-charcoal-gray">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glass-panel-lg p-12 rounded-2xl text-center bg-gradient-to-r from-navy-blue/5 to-steel-blue/5">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">
            Start Organizing Your Files Today
          </h2>
          <p className="text-xl text-charcoal-gray mb-8 max-w-2xl mx-auto">
            Experience the power of intelligent file organization with CaseCraft File Organizer.
          </p>
          <button className="glass-button-primary px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 rounded-lg">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
