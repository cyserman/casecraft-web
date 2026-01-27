import { useState } from "react";
import { Lock, FileUp, ShieldCheck, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function EvidenceVault() {
    const [rawText, setRawText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [refinedOutput, setRefinedOutput] = useState<{ date: string; fact: string }[] | null>(null);

    const handleProcess = () => {
        if (!rawText.trim()) return;

        setIsProcessing(true);

        // Simulate Agent Processing Delay
        setTimeout(() => {
            // Mock Agent "Refining" Logic
            // In a real app, this would send rawText to an LLM or Agent 2
            const simulatedFacts = [
                { date: "Detected Date", fact: "Incident trigger event identified." },
                { date: "Timeline Start", fact: "Narrative began." },
                { date: "Key Entity", fact: "Officer/Witness identified in text." },
            ];

            // Simple regex to extract dates if they exist (just for "Wow" factor)
            const dateRegex = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}(st|nd|rd|th)?\b/gi;
            const matches = rawText.match(dateRegex);

            if (matches) {
                simulatedFacts.unshift({ date: matches[0], fact: "Specific date referenced in your statement." });
            }

            setRefinedOutput(simulatedFacts);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="glass-panel-lg p-8 border border-slate-700 bg-slate-900/80 relative overflow-hidden">
            {/* Encryption Background Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50"></div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-8 h-8 text-green-500" />
                        <h2 className="text-3xl font-serif font-bold text-white">The Vault</h2>
                    </div>
                    <p className="text-slate-400">
                        Secure Intelligence Drop. Encrypted. Immutable.
                    </p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="text-xs font-mono text-green-500 mb-1">CONNECTION SECURE</div>
                    <div className="flex gap-1 justify-end">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-green-500 animate-pulse' : 'bg-green-900'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Input Zone - Brain Dump */}
                <div className="space-y-6">
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <label className="block text-slate-300 font-bold mb-4 flex items-center gap-2">
                            <FileUp className="w-5 h-5 text-blue-400" />
                            Raw Intelligence Input
                        </label>
                        <Textarea
                            placeholder="Dump everything here. Copied texts, emails, your own memory of the event. Don't worry about formatting. Just get it out."
                            className="min-h-[300px] bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-green-500/50 transition-colors font-mono text-sm"
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={handleProcess}
                                disabled={isProcessing || !rawText}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold"
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Encrypting & Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-4 h-4 mr-2" />
                                        Secure Drop & Analyze
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Output Zone - Refined Intelligence */}
                <div className="relative">
                    <div className="absolute inset-0 bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>

                    <div className="relative z-10 h-full flex flex-col">
                        <label className="block text-slate-300 font-bold mb-4 flex items-center gap-2">
                            <Send className="w-5 h-5 text-yellow-500" />
                            Refined Intel (Agent View)
                        </label>

                        <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-6 font-mono text-sm">
                            {!refinedOutput && !isProcessing && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center opacity-50">
                                    <Lock className="w-12 h-12 mb-4" />
                                    <p>Awaiting Intelligence Drop...</p>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                                    <div className="text-green-500 text-xs mt-4 typewriter">
                                        &gt; Parsing narrative...<br />
                                        &gt; Extracting metadata...<br />
                                        &gt; Establishing chain of custody...
                                    </div>
                                </div>
                            )}

                            {refinedOutput && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                                        <span className="text-green-500 text-xs">STATUS: SECURE</span>
                                        <span className="text-slate-500 text-xs">ID: {Math.floor(Math.random() * 100000)}</span>
                                    </div>

                                    {refinedOutput.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-24 flex-shrink-0 text-yellow-500 font-bold text-xs pt-1 border-r border-slate-800 pr-4 text-right">
                                                {item.date}
                                            </div>
                                            <div className="text-slate-300 group-hover:text-white transition-colors">
                                                {item.fact}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-8 p-4 bg-green-500/10 rounded border border-green-500/20 text-center">
                                        <p className="text-green-400 text-xs font-bold mb-1">SUCCESS</p>
                                        <p className="text-slate-400 text-xs">
                                            Intelligence logged to Case Logs. Steve has been notified.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
