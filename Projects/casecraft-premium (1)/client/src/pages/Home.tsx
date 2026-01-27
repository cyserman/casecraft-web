import { Link } from "wouter";
import { ArrowRight, Shield, FileText, Scale, Users, Award, Clock, Phone, Zap } from "lucide-react";
import JargonSlayer from "@/components/JargonSlayer";
import ParentingPlan from "@/components/ParentingPlan";
import EvidenceVault from "@/components/EvidenceVault";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section - Dark with Impact */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-navy-blue/50 to-slate-900 opacity-90"></div>


        <div className="container relative z-10 text-center px-4">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Prepared. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3cf55]">
              Present.
            </span> <br />
            Persistent. <br />
            <span className="text-white opacity-90">Omnipresent.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Criminal defense & family law. One attorney. Fully invested. Everywhere you need him to be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="gold-gradient text-white px-10 py-5 rounded-lg text-lg font-bold shadow-lg hover:shadow-yellow-500/30 transition-all inline-flex items-center gap-2">
              Get Protected Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/services" className="border-2 border-slate-600 text-white bg-slate-800/50 backdrop-blur px-10 py-5 rounded-lg text-lg font-bold hover:bg-slate-700 transition-all inline-flex items-center gap-2">
              <Scale className="w-5 h-5 text-yellow-400" />
              Practice Areas
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">20+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider mt-1">Years Experience</div>
            </div>
            <div className="text-center border-x border-slate-700">
              <div className="text-4xl font-bold text-yellow-400">2</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider mt-1">Counties Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider mt-1">Committed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas - Clean White Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Real Legal Defense
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Focused representation in Chester & Montgomery County courts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Criminal Defense",
                badge: "Aggressive Advocacy",
                description: "From felonies to misdemeanors—representation that fights back against prosecution overreach.",
                href: "/services/criminal-defense",
              },
              {
                icon: FileText,
                title: "DUI Defense",
                badge: "Technical Defense",
                description: "Challenge breathalyzers, field sobriety tests, and illegal traffic stops with precision.",
                href: "/services/dui-defense",
              },
              {
                icon: Users,
                title: "Family Law",
                badge: "Strategic Solutions",
                description: "Custody battles, divorce, support—protecting your family's future in PA courts.",
                href: "/services/family-law",
              },
            ].map((service, idx) => (
              <div key={idx} className="group bg-slate-50 p-8 border border-slate-200 rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-yellow-500 group-hover:bg-yellow-600 w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">
                  {service.badge}
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <Link href={service.href} className="text-yellow-600 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section - Dark Theme */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Real Outcomes
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-slate-300 text-lg">
              Recent victories in Chester & Montgomery County courts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "DUI Dismissal",
                result: "Case Dismissed",
                description: "Challenged breathalyzer calibration. Suppressed evidence due to improper stop procedure.",
              },
              {
                icon: Users,
                title: "Custody Victory",
                result: "Primary Custody",
                description: "Father granted primary physical custody after documenting parental alienation tactics.",
              },
              {
                icon: FileText,
                title: "Felony Reduction",
                result: "Reduced to Misdemeanor",
                description: "Negotiated felony assault charge down to summary offense. No jail time.",
              },
              {
                icon: Award,
                title: "Acquittal",
                result: "Not Guilty Verdict",
                description: "Jury acquittal in drug possession case. Constitutional search violation proven.",
              },
            ].map((result, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-yellow-500/50 transition-all group">
                <div className="bg-yellow-500/10 group-hover:bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <result.icon className="w-6 h-6 text-yellow-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">{result.title}</h3>
                <div className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3">
                  {result.result}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{result.description}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Quote */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-slate-300 mb-6">
              "You hire me, you get me. Not a paralegal, not an associate—me in every courtroom."
            </blockquote>
            <div className="flex justify-center gap-1 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="text-slate-400">Rated 5.0 by clients on Google & Avvo</p>
          </div>
        </div>
      </section>

      {/* Tactical Intelligence Section - The AI Tools */}
      <section id="tactical" className="py-24 bg-slate-900 relative border-y border-slate-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl font-serif font-bold text-white">Tactical Intelligence</h2>
              </div>
              <p className="text-slate-400 text-lg">
                Instant answers. No waiting. The information you need, right now.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool 1: Jargon Slayer */}
            <div>
              <JargonSlayer />
            </div>

            {/* Tool 2: Parenting Plan */}
            <div>
              <ParentingPlan />
            </div>
          </div>
        </div>
      </section>

      {/* Secure Evidence Vault - The Drop Zone */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="container">
          <EvidenceVault />
        </div>
      </section>

      {/* Blog Preview - The War Room */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">The War Room</h2>
              <p className="text-slate-600 text-lg">
                Field notes from Chester & Montgomery County courts.
              </p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-yellow-600 font-bold hover:text-yellow-700 transition-colors gap-2">
              View All Intel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                badge: "NEW LAW",
                badgeColor: "bg-red-600",
                date: "Dec 20, 2024",
                title: "Kayden's Law Changes Everything",
                description: "PA Act 8 requires courts to consider ALL criminal history. What this means for your custody case.",
                href: "/blog/kaydens-law",
              },
              {
                badge: "STRATEGY",
                badgeColor: "bg-blue-600",
                date: "Dec 18, 2024",
                title: "The 30% Myth in Asset Division",
                description: "There is no '30% rule' in PA divorce. Courts rarely award more than 60% to one party.",
                href: "/blog/asset-division-myth",
              },
              {
                badge: "HOT TOPIC",
                badgeColor: "bg-slate-800",
                date: "Dec 15, 2024",
                title: "High-Conflict & Narcissists",
                description: "Parallel parenting, evidence collection, and why 'playing nice' fails with high-conflict personalities.",
                href: "/blog/high-conflict-custody",
              },
            ].map((post, idx) => (
              <article key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-200 group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 group-hover:scale-105 transition-transform duration-300"></div>
                  <div className={`absolute top-4 left-4 ${post.badgeColor} text-white text-xs font-bold px-3 py-1 rounded`}>
                    {post.badge}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-400 mb-2">{post.date}</div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{post.description}</p>
                  <Link href={post.href} className="text-yellow-600 font-bold text-sm hover:underline inline-flex items-center gap-1">
                    Read Analysis <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client Tools Section - Secondary Focus */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">Client Resource Center</h2>
              <p className="text-slate-400">
                Secure tools for our active clients to manage their case.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tools/case-assist" className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-900/50 p-3 rounded-lg group-hover:bg-blue-900 transition-colors">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Secure Portal</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Access your case files, court dates, and legal documents in one secure location.
              </p>
              <span className="text-blue-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Client Login <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link href="/tools/file-organizer" className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-900/50 p-3 rounded-lg group-hover:bg-purple-900 transition-colors">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Evidence Organizer</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Securely upload and organize evidence, photos, and documents for your defense.
              </p>
              <span className="text-purple-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Upload Files <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link href="/tools/case-assist" className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-900/50 p-3 rounded-lg group-hover:bg-amber-900 transition-colors">
                  <Scale className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Case Analysis</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Review case strategy, notes, and analysis powered by our legal tech platform.
              </p>
              <span className="text-amber-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                View Analysis <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Strong & Direct */}
      <section className="py-24 bg-white relative">
        <div className="container max-w-5xl">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left - Contact Info */}
              <div className="p-12 bg-slate-800">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                  Let's Talk Strategy
                </h2>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  I know these courts, these judges, and these systems. Tell me about your case.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-3 rounded-full">
                      <Phone className="text-yellow-400 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Emergency Line</h4>
                      <a href="tel:+16105550123" className="text-yellow-400 text-xl font-bold hover:text-yellow-300 transition-colors">
                        (610) 555-0123
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-3 rounded-full">
                      <Clock className="text-yellow-400 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Available 24/7</h4>
                      <p className="text-slate-300 text-sm">Emergencies don't wait—neither do we.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - CTA */}
              <div className="p-12 bg-gradient-to-br from-yellow-500 to-yellow-600 flex flex-col justify-center items-center text-center">
                <Shield className="w-16 h-16 text-white mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Don't Wait—Your Rights Matter
                </h3>
                <p className="text-yellow-100 mb-8">
                  The sooner you contact us, the sooner we start building your defense.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-slate-900 px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
