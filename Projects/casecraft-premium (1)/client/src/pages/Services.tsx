import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, AlertCircle, Heart, ArrowRight } from "lucide-react";

export default function Services() {
  const [, navigate] = useLocation();

  const services = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Criminal Defense",
      description: "Aggressive representation for felony and misdemeanor charges. We protect your constitutional rights at every stage of the criminal justice process.",
      link: "/services/criminal-defense",
      highlights: ["Felony Defense", "Misdemeanor Defense", "Pre-Trial Motions", "Appeals"],
    },
    {
      icon: <AlertCircle className="w-12 h-12" />,
      title: "DUI Defense",
      description: "Specialized expertise in DUI and DWI cases. We challenge breath tests, field sobriety tests, and defend your license suspension.",
      link: "/services/dui-defense",
      highlights: ["Breath Test Challenges", "ARD Program", "License Defense", "Trial Defense"],
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Family Law",
      description: "Compassionate representation in divorce, custody, and family matters. We protect your family's interests and your parental rights.",
      link: "/services/family-law",
      highlights: ["Divorce & Separation", "Custody & Visitation", "Child Support", "Property Division"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-blue to-dark-blue text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg md:text-xl text-light-gray max-w-2xl">
            Comprehensive legal representation across criminal defense, DUI defense, and family law in Montgomery and Chester Counties, Pennsylvania.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="glass-panel-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="text-steel-blue mb-6">{service.icon}</div>
              <h2 className="text-2xl font-bold text-navy-blue mb-4">{service.title}</h2>
              <p className="text-charcoal-gray mb-6 flex-1">{service.description}</p>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-navy-blue mb-3">Key Services:</h3>
                <ul className="space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-charcoal-gray flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-steel-blue"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => navigate(service.link)}
                className="glass-button-primary w-full"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Why Choose Griff Law</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Experienced Representation",
                description: "Decades of combined experience handling complex criminal, DUI, and family law cases.",
              },
              {
                title: "Aggressive Advocacy",
                description: "We fight hard for our clients' rights at every stage of the legal process.",
              },
              {
                title: "Personalized Approach",
                description: "Each case is unique. We develop customized strategies tailored to your specific circumstances.",
              },
              {
                title: "Local Expertise",
                description: "Deep knowledge of Montgomery and Chester County courts, judges, and prosecutors.",
              },
              {
                title: "Compassionate Counsel",
                description: "We understand the stress and uncertainty you're facing and provide supportive guidance.",
              },
              {
                title: "Transparent Communication",
                description: "Clear, honest communication about your case and your options throughout the process.",
              },
            ].map((item, index) => (
              <div key={index} className="glass-panel p-6">
                <h3 className="text-lg font-bold text-navy-blue mb-3">{item.title}</h3>
                <p className="text-charcoal-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Areas */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Practice Areas</h2>
          <div className="glass-panel-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-navy-blue mb-4">Criminal Law</h3>
                <ul className="space-y-2 text-charcoal-gray">
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
                <h3 className="text-xl font-bold text-navy-blue mb-4">Family Law</h3>
                <ul className="space-y-2 text-charcoal-gray">
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
        </div>

        {/* CTA Section */}
        <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Ready to Get Started?</h2>
          <p className="text-charcoal-gray mb-8">
            Contact our office today for a confidential consultation about your legal matter.
          </p>
          <Button onClick={() => navigate("/contact")} className="glass-button-primary">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
