import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, CheckCircle, Users, FileText, Clock, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CriminalDefense() {
  const [, navigate] = useLocation();

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Felony Defense",
      description: "Comprehensive representation for serious felony charges with aggressive defense strategies.",
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Misdemeanor Defense",
      description: "Skilled advocacy for misdemeanor charges with focus on minimizing consequences.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Pre-Trial Motions",
      description: "Strategic motion practice to suppress evidence and protect your constitutional rights.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Plea Negotiations",
      description: "Expert negotiation with prosecutors to achieve the best possible outcomes.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Sentencing Advocacy",
      description: "Compelling sentencing arguments to minimize penalties and protect your future.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Post-Conviction Relief",
      description: "Appeals and post-conviction remedies to challenge unjust convictions.",
    },
  ];

  const benefits = [
    "Thorough investigation of all evidence",
    "Protection of your constitutional rights",
    "Aggressive defense at every stage",
    "Experienced negotiation with prosecutors",
    "Compassionate representation during difficult times",
    "Clear communication about your case",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white pt-24 text-charcoal-gray">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-blue to-dark-blue text-white py-16 md:py-24">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: "Criminal Defense" }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Criminal Defense</h1>
          <p className="text-lg md:text-xl text-light-gray max-w-2xl">
            Aggressive representation for individuals facing criminal charges in Montgomery and Chester Counties, Pennsylvania.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-6">Protecting Your Rights</h2>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              If you've been charged with a criminal offense, the decisions you make in the first hours and days can have profound consequences for your future. At Glaw, we understand the stress and uncertainty you're facing, and we're committed to providing aggressive, compassionate representation.
            </p>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              Whether you're facing felony or misdemeanor charges, our experienced criminal defense attorneys will thoroughly investigate your case, protect your constitutional rights, and develop a strategic defense tailored to your specific circumstances.
            </p>
            <p className="text-charcoal-gray leading-relaxed">
              We handle every aspect of criminal defense, from initial arrest through trial and appeal. Our goal is always to achieve the best possible outcome for you—whether that means dismissal, acquittal, or negotiating the most favorable resolution available.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="glass-panel p-6 hover:shadow-lg transition-shadow">
                <div className="text-steel-blue mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-navy-blue mb-3">{service.title}</h3>
                <p className="text-charcoal-gray">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-8">Why Choose Glaw</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                  <span className="text-charcoal-gray">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Criminal Charges We Handle</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Assault and Battery",
              "Drug Possession and Distribution",
              "Theft and Burglary",
              "Weapons Charges",
              "White Collar Crimes",
              "Domestic Violence",
              "Probation Violations",
              "Parole Violations",
            ].map((charge, index) => (
              <div key={index} className="glass-panel p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0" />
                <span className="text-charcoal-gray">{charge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Ready to Protect Your Rights?</h2>
          <p className="text-charcoal-gray mb-8">
            Contact our office today for a confidential consultation. The sooner you speak with an experienced criminal defense attorney, the better we can protect your future.
          </p>
          <Button onClick={() => navigate("/contact")} className="glass-button-primary">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
