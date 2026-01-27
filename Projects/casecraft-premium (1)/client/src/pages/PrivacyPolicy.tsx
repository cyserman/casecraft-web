import Breadcrumbs from "@/components/Breadcrumbs";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-off-white pt-24 text-charcoal-gray">
            {/* Hero */}
            <div className="bg-slate-900 text-white py-16">
                <div className="container">
                    <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="w-10 h-10 text-yellow-500" />
                        <h1 className="text-4xl md:text-5xl font-serif font-bold">Privacy Protocol</h1>
                    </div>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Strict confidentiality. Encrypted communications. Your data is evidence, and we treat it with the same chain-of-custody standards used in court.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container py-16">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Sidebar Navigation (Sticky) */}
                    <div className="md:col-span-1">
                        <div className="sticky top-32 space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Directives</p>
                            <a href="#collection" className="block text-navy-blue hover:text-yellow-600 font-medium transition-colors">1. Data Collection</a>
                            <a href="#usage" className="block text-navy-blue hover:text-yellow-600 font-medium transition-colors">2. Intelligence Usage</a>
                            <a href="#security" className="block text-navy-blue hover:text-yellow-600 font-medium transition-colors">3. Security Protocols</a>
                            <a href="#rights" className="block text-navy-blue hover:text-yellow-600 font-medium transition-colors">4. Client Rights</a>
                        </div>
                    </div>

                    {/* Main Text */}
                    <div className="md:col-span-2 prose prose-slate max-w-none">
                        <h2 id="collection" className="flex items-center gap-2 text-2xl font-bold text-navy-blue">
                            <Eye className="w-6 h-6 text-yellow-500" />
                            1. Data Collection Directive
                        </h2>
                        <p>
                            Griffiths Law accumulates "Operational Data" necessary for effective defense strategies. This includes:
                        </p>
                        <ul>
                            <li><strong>Identity Verification:</strong> Names, coordinates, and secure contact methods.</li>
                            <li><strong>Tactical Input:</strong> Information submitted via the "Evidence Vault", "Jargon Slayer", or "Parenting Plan Architect".</li>
                            <li><strong>Digital Telemetry:</strong> Anonymized site usage data to optimize tool deployment.</li>
                        </ul>
                        <div className="bg-slate-100 p-4 border-l-4 border-yellow-500 my-6">
                            <strong>Critical Note:</strong> Information submitted through our tools (like the Evidence Vault) is processed with 256-bit encryption standards. We do not sell, trade, or expose your data to third-party data brokers.
                        </div>

                        <h2 id="usage" className="flex items-center gap-2 text-2xl font-bold text-navy-blue mt-12">
                            <FileText className="w-6 h-6 text-yellow-500" />
                            2. Intelligence Usage
                        </h2>
                        <p>
                            Your data is deployed strictly for:
                        </p>
                        <ul>
                            <li><strong>Case Strategy:</strong> Analyzing your "Brain Dumps" to construct defense timelines.</li>
                            <li><strong>Communication:</strong> Establishing secure channels for attorney-client privilege.</li>
                            <li><strong>System Optimization:</strong> Improving the accuracy of our AI tools based on aggregate usage patterns (never individual case data).</li>
                        </ul>

                        <h2 id="security" className="flex items-center gap-2 text-2xl font-bold text-navy-blue mt-12">
                            <Lock className="w-6 h-6 text-yellow-500" />
                            3. Security Protocols
                        </h2>
                        <p>
                            We employ a "Defense-in-Depth" strategy for digital assets:
                        </p>
                        <ul>
                            <li><strong>Encryption at Rest:</strong> All data stored in our "Evidence Vault" databases is encrypted.</li>
                            <li><strong>Encryption in Transit:</strong> All communications between your device and our servers use TLS 1.3.</li>
                            <li><strong>Access Control:</strong> Only authorized legal personnel have decryption keys for case files.</li>
                        </ul>

                        <h2 id="rights" className="flex items-center gap-2 text-2xl font-bold text-navy-blue mt-12">
                            <Shield className="w-6 h-6 text-yellow-500" />
                            4. Client Rights
                        </h2>
                        <p>
                            You maintain full sovereignty over your data:
                        </p>
                        <ul>
                            <li><strong>Right to Erasure:</strong> Request the complete deletion of your "Digital Locker" history at any time.</li>
                            <li><strong>Right to Export:</strong> Request a copy of all raw intelligence you have provided.</li>
                            <li><strong>Right to Verify:</strong> Request a chain-of-custody audit of your digital files.</li>
                        </ul>

                        <div className="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                            <p>Last Updated: October 2025</p>
                            <p>For privacy inquiries, contact: secure@griflawpa.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
