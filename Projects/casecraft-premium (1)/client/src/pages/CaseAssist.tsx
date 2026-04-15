import { ArrowRight, BarChart3, Clock, Lock, Zap, FileText, Bookmark, Brain, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AppFile, FileStatus } from "@/types/ingestor";
import CaseTimeline from "@/components/CaseTimeline";
import StickyNotes from "@/components/StickyNotes";
import AiReadinessIndicator from "@/components/AiReadinessIndicator";

export default function CaseAssist() {
  const [recentEvidence, setRecentEvidence] = useState<AppFile[]>([]);
  const [stickyNotes, setStickyNotes] = useState([]);
  const [aiScore, setAiScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("casecraft_files");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecentEvidence(parsed.filter((f: any) => f.status === FileStatus.COMPLETED));
      } catch (e) {
        console.error("Failed to load evidence", e);
      }
    }
  }, []);

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6">
            Case Assist Dashboard
          </h1>
          <p className="text-xl text-charcoal-gray max-w-3xl mx-auto">
            Professional-grade case management powered by CaseCraft TruthTrack technology.
          </p>
        </div>
      </section>

      {/* RECENT INTEL - NEW SECTION */}
      {recentEvidence.length > 0 && (
        <section className="container mb-20">
          <div className="glass-panel-lg p-8 rounded-xl border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-navy-blue flex items-center gap-2">
                <Brain className="w-6 h-6 text-yellow-500" />
                Recent Intelligence
              </h2>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {recentEvidence.length} Sources Analyzed
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentEvidence.slice(0, 3).map((file) => (
                <div key={file.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">
                      {file.schema?.documentType || "Document"}
                    </span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <h3 className="font-bold text-navy-blue mb-2 line-clamp-1" title={file.schema?.title}>
                    {file.schema?.title || file.file.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4">{file.schema?.summary}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {file.schema?.keywords.slice(0, 3).map((k, i) => (
                      <span key={i} className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        #{k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Overview */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Evidence Tracking",
              description: "Organize and track all evidence with SHA-256 fingerprinting for integrity verification.",
            },
            {
              icon: Clock,
              title: "Timeline View",
              description: "Visualize case progression with AI-powered timeline generation and analysis.",
            },
            {
              icon: Bookmark,
              title: "Sticky Notes",
              description: "Annotate evidence and create case notes with full-text search capabilities.",
            },
            {
              icon: Lock,
              title: "Secure Storage",
              description: "All case data encrypted and stored securely with automatic backups.",
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

      {/* Timeline Section */}
      <section className="container mb-20">
        <CaseTimeline />
      </section>

      {/* Sticky Notes Section */}
      <section className="container mb-20">
        <StickyNotes />
      </section>

      {/* AI Readiness Indicator */}
      <section className="container mb-20">
        <AiReadinessIndicator />
      </section>

      {/* Metrics */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Evidence", value: "0", icon: "📁" },
            { label: "Integrity Verified", value: "100%", icon: "✓" },
            { label: "Sticky Notes", value: "0", icon: "📝" },
            { label: "AI Readiness", value: "0%", icon: "⚡" },
          ].map((metric, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <p className="text-sm text-medium-gray uppercase font-bold tracking-widest mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-navy-blue">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">How It Works</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Upload Evidence",
              description: "Drag and drop files or use the file browser to upload case evidence.",
            },
            {
              step: 2,
              title: "Organize & Annotate",
              description: "Organize files by category and add detailed notes and annotations.",
            },
            {
              step: 3,
              title: "Generate Timeline",
              description: "AI automatically generates a visual timeline of events.",
            },
            {
              step: 4,
              title: "Analyze & Strategize",
              description: "Use AI insights to identify defense strategies and case weaknesses.",
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-navy-blue mb-2">{item.title}</h3>
                  <p className="text-charcoal-gray">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glass-panel-lg p-12 rounded-2xl text-center bg-gradient-to-r from-navy-blue/5 to-steel-blue/5">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">Ready to Build Your Case?</h2>
          <p className="text-xl text-charcoal-gray mb-8 max-w-2xl mx-auto">
            Contact us to learn more about CaseCraft Case Assist and how it can strengthen your defense.
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