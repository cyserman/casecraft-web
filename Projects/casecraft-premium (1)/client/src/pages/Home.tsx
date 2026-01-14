import { Link } from "wouter";
import { ArrowRight, Shield, FileText, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-up">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6 leading-tight">
              Aggressive Criminal Defense for Your Rights
            </h1>
            <p className="text-xl text-charcoal-gray mb-8 leading-relaxed">
              Griff Law provides expert legal representation for criminal defense, DUI cases, and family law matters in Montgomery and Chester Counties, Pennsylvania. We fight hard to protect your constitutional rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <a className="glass-button-primary px-8 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 rounded-lg">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <Link href="/services">
                <a className="glass-button px-8 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 rounded-lg">
                  Explore Services
                </a>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-slide-in-down">
            <div className="glass-panel-lg p-8 rounded-2xl">
              <img
                src="/steve.jpg"
                alt="Steve Griffiths, Criminal Defense Attorney"
                className="w-full h-auto rounded-xl object-cover shadow-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-navy-blue mb-2">Steve Griffiths</h3>
                <p className="text-charcoal-gray font-medium">Criminal Defense Attorney</p>
                <p className="text-medium-gray text-sm mt-2">Montgomery & Chester Counties, PA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Our Services</h2>
          <p className="text-xl text-charcoal-gray max-w-2xl mx-auto">
            Comprehensive legal representation across criminal defense, DUI defense, and family law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Criminal Defense",
              description: "Expert representation for felony and misdemeanor charges with aggressive advocacy.",
              href: "/services/criminal-defense",
            },
            {
              icon: FileText,
              title: "DUI Defense",
              description: "Specialized defense challenging breathalyzers, field sobriety tests, and illegal stops.",
              href: "/services/dui-defense",
            },
            {
              icon: Users,
              title: "Family Law",
              description: "Compassionate representation for divorce, custody, and family matters.",
              href: "/services/family-law",
            },
          ].map((service, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-3">{service.title}</h3>
              <p className="text-charcoal-gray mb-6">{service.description}</p>
              <Link href={service.href}>
                <a className="text-steel-blue hover:text-dark-blue font-semibold inline-flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Griff Law */}
      <section className="container mb-20">
        <div className="glass-panel-lg p-12 rounded-2xl bg-gradient-to-br from-white/90 to-off-white/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">Why Choose Griff Law</h2>
              <p className="text-xl text-charcoal-gray mb-6 leading-relaxed">
                With decades of experience in criminal defense and family law, we provide aggressive representation tailored to your unique situation. We understand the stakes and fight hard to protect your rights.
              </p>
              <ul className="space-y-4">
                {[
                  "Experienced criminal defense representation",
                  "Deep knowledge of Montgomery & Chester County courts",
                  "Aggressive advocacy for your constitutional rights",
                  "Personalized strategy for every case",
                  "Transparent communication throughout your case",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-steel-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-steel-blue"></div>
                    </div>
                    <span className="text-charcoal-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-xl">
              <div className="bg-gradient-to-br from-navy-blue/10 to-steel-blue/10 rounded-lg p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-steel-blue mx-auto mb-4" />
                  <p className="text-charcoal-gray font-semibold">Protecting Your Rights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Steve's Corner</h2>
          <p className="text-xl text-charcoal-gray max-w-2xl mx-auto">
            Legal insights and case analysis from Steve Griffiths.
          </p>
        </div>

        <div className="glass-panel-lg p-8 rounded-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="text-sm font-bold text-steel-blue uppercase tracking-widest">Constitutional Rights</span>
              <h3 className="text-3xl font-serif font-bold text-navy-blue my-3">
                Commonwealth v. Shiflett: ARD Sentencing Protection
              </h3>
              <p className="text-charcoal-gray mb-6 leading-relaxed">
                A landmark decision protecting ARD participants from enhanced sentencing on subsequent offenses. This case has significant implications for first-time offenders in Pennsylvania.
              </p>
              <Link href="/blog">
                <a className="glass-button-primary px-6 py-3 text-lg font-semibold inline-flex items-center gap-2 rounded-lg">
                  Read More Articles <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
            <div className="md:w-48 flex-shrink-0">
              <img
                src="/steve.jpg"
                alt="Steve Griffiths"
                className="w-full h-auto rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-4">Practice Areas</h2>
          <p className="text-xl text-charcoal-gray max-w-2xl mx-auto">
            Comprehensive legal services across multiple practice areas.
          </p>
        </div>

        <div className="glass-panel-lg p-12 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-6">Criminal Law</h3>
              <ul className="space-y-3 text-charcoal-gray">
                {[
                  "Felony & Misdemeanor Defense",
                  "Drug Crimes",
                  "Assault & Battery",
                  "Theft & Burglary",
                  "White Collar Crimes",
                  "Probation Violations",
                  "Appeals & Post-Conviction Relief",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-steel-blue"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-6">Family Law</h3>
              <ul className="space-y-3 text-charcoal-gray">
                {[
                  "Divorce & Separation",
                  "Custody & Visitation",
                  "Child Support",
                  "Alimony & Spousal Support",
                  "Property Division",
                  "Modification & Enforcement",
                  "Mediation & Negotiation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-steel-blue"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="glass-panel-lg p-12 rounded-2xl text-center bg-gradient-to-r from-navy-blue/5 to-steel-blue/5">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">
            Ready to Defend Your Rights?
          </h2>
          <p className="text-xl text-charcoal-gray mb-8 max-w-2xl mx-auto">
            Schedule a confidential consultation with Steve Griffiths today. We're here to fight for you.
          </p>
          <Link href="/contact">
            <a className="glass-button-primary px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 rounded-lg">
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
