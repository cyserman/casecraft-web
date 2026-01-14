import { ArrowRight, Lock, Zap, Shield, CheckCircle } from "lucide-react";

export default function TruthTrack() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6">
            CaseCraft <span className="text-steel-blue">TruthTrack™</span>
          </h1>
          <p className="text-xl text-charcoal-gray max-w-3xl mx-auto">
            Revolutionary legal evidence platform that transforms messy digital tracks into court-ready documentation.
          </p>
        </div>
      </section>

      {/* Three-Layer Architecture */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Three-Layer Architecture</h2>
          <p className="text-xl text-charcoal-gray max-w-2xl mx-auto">
            TruthTrack uses a patented three-layer system to organize, verify, and present evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              layer: "Layer 1",
              title: "Evidence Collection",
              description: "Gather all digital evidence from multiple sources including emails, messages, documents, and media.",
              icon: "📁",
            },
            {
              layer: "Layer 2",
              title: "Verification &amp; Organization",
              description: "Verify integrity with SHA-256 fingerprinting and automatically organize by date, type, and relevance.",
              icon: "✓",
            },
            {
              layer: "Layer 3",
              title: "Court-Ready Presentation",
              description: "Generate professional reports, timelines, and exhibits ready for trial or settlement.",
              icon: "📊",
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl">
              <div className="text-4xl mb-4">{item.icon}</div>
              <p className="text-sm font-bold text-steel-blue uppercase tracking-widest mb-2">{item.layer}</p>
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-3">{item.title}</h3>
              <p className="text-charcoal-gray">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHA-256 Fingerprinting */}
      <section className="container mb-20">
        <div className="glass-panel-lg p-12 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-navy-blue">SHA-256 Fingerprinting</h2>
              </div>
              <p className="text-lg text-charcoal-gray mb-6 leading-relaxed">
                Every file is verified with military-grade SHA-256 cryptographic hashing. This creates a unique digital fingerprint that proves the file hasn't been altered.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Cryptographic verification of file integrity",
                  "Immutable audit trail of all changes",
                  "Court-admissible evidence of authenticity",
                  "Protection against tampering and manipulation",
                  "Compliance with digital evidence standards",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                    <span className="text-charcoal-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-8 rounded-xl">
              <div className="bg-gradient-to-br from-navy-blue/10 to-steel-blue/10 rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-navy-blue mx-auto mb-4" />
                  <p className="text-charcoal-gray font-semibold">Cryptographic Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Analysis */}
      <section className="container mb-20">
        <div className="glass-panel-lg p-12 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-panel p-8 rounded-xl order-2 lg:order-1">
              <div className="bg-gradient-to-br from-steel-blue/10 to-off-blue/10 rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-steel-blue mx-auto mb-4" />
                  <p className="text-charcoal-gray font-semibold">AI Intelligence</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-navy-blue">AI-Powered Analysis</h2>
              </div>
              <p className="text-lg text-charcoal-gray mb-6 leading-relaxed">
                Artificial intelligence automatically analyzes your evidence to identify patterns, inconsistencies, and defense strategies. Get insights that would take hours to discover manually.
              </p>
              <ul className="space-y-4">
                {[
                  "Automatic pattern recognition and anomaly detection",
                  "Timeline generation and gap identification",
                  "Inconsistency detection in witness statements",
                  "Predictive analysis of case outcomes",
                  "Defense strategy recommendations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                    <span className="text-charcoal-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Key Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Shield,
              title: "Evidence Integrity",
              description: "100% guarantee of evidence integrity with cryptographic verification.",
            },
            {
              icon: Zap,
              title: "Instant Timeline",
              description: "AI-generated timelines that automatically organize events chronologically.",
            },
            {
              icon: CheckCircle,
              title: "Pattern Recognition",
              description: "Identify patterns and inconsistencies that strengthen your defense.",
            },
            {
              icon: Lock,
              title: "Secure Storage",
              description: "Military-grade encryption protects all evidence and case data.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-blue mb-3">{feature.title}</h3>
              <p className="text-charcoal-gray">{feature.description}</p>
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
              description: "Import evidence from emails, documents, photos, videos, and other digital sources.",
            },
            {
              step: 2,
              title: "Automatic Verification",
              description: "TruthTrack verifies each file with SHA-256 fingerprinting and creates an immutable record.",
            },
            {
              step: 3,
              title: "AI Analysis",
              description: "Artificial intelligence analyzes the evidence to identify patterns and inconsistencies.",
            },
            {
              step: 4,
              title: "Generate Reports",
              description: "Create professional reports, timelines, and exhibits ready for court.",
            },
            {
              step: 5,
              title: "Present in Court",
              description: "Use court-ready documentation to strengthen your case and defend your rights.",
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

      {/* Benefits */}
      <section className="container mb-20">
        <div className="glass-panel-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-serif font-bold text-navy-blue mb-8 text-center">Why Choose TruthTrack?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Proven Track Record",
                description: "Used by criminal defense attorneys across the country to win cases.",
              },
              {
                title: "Court-Admissible",
                description: "All evidence and reports meet court standards and admissibility requirements.",
              },
              {
                title: "Time Savings",
                description: "Save hours of manual work with automated analysis and report generation.",
              },
              {
                title: "Better Outcomes",
                description: "Stronger cases lead to better plea deals, dismissals, and trial verdicts.",
              },
              {
                title: "Secure &amp; Compliant",
                description: "HIPAA and SOC 2 compliant infrastructure protects sensitive case data.",
              },
              {
                title: "Expert Support",
                description: "Dedicated support team helps you maximize the platform's capabilities.",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="border-l-4 border-steel-blue pl-6 py-4">
                <h3 className="text-lg font-serif font-bold text-navy-blue mb-2">{benefit.title}</h3>
                <p className="text-charcoal-gray text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glass-panel-lg p-12 rounded-2xl text-center bg-gradient-to-r from-navy-blue/5 to-steel-blue/5">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">
            Ready to Transform Your Case?
          </h2>
          <p className="text-xl text-charcoal-gray mb-8 max-w-2xl mx-auto">
            Contact us to learn how CaseCraft TruthTrack can strengthen your defense and win your case.
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
