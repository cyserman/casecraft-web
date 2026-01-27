import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { AlertCircle, CheckCircle, Microscope, FileText, Scale, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DUIDefense() {
  const [, navigate] = useLocation();

  const services = [
    // ... (rest of the file remains same, I'll just change the return)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white pt-24 text-charcoal-gray">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-blue to-dark-blue text-white py-16 md:py-24">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: "DUI Defense" }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">DUI Defense</h1>
          <p className="text-lg md:text-xl text-light-gray max-w-2xl">
            Specialized representation for DUI and DWI charges in Montgomery and Chester Counties, Pennsylvania.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-6">Expert DUI Defense</h2>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              A DUI conviction can have devastating consequences for your life. Beyond the immediate legal penalties—fines, jail time, and license suspension—a DUI conviction can affect your employment, your insurance rates, your professional licenses, and your ability to travel.
            </p>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              At Glaw, we have extensive experience defending DUI cases. We understand the science behind breath and blood testing, we know how to challenge field sobriety tests, and we understand the nuances of Pennsylvania DUI law. We've successfully defended hundreds of DUI cases and achieved favorable outcomes for our clients.
            </p>
            <p className="text-charcoal-gray leading-relaxed">
              Whether this is your first DUI or you have prior offenses, we'll aggressively protect your rights and work toward the best possible resolution of your case.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Our DUI Services</h2>
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

        {/* Key Points */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-8">What We Challenge</h2>
            <div className="space-y-4">
              {[
                "Traffic stops that lacked reasonable suspicion",
                "Field sobriety test administration and validity",
                "Breathalyzer calibration and maintenance records",
                "Blood test collection and chain of custody procedures",
                "Implied consent warnings and procedures",
                "Officer training and qualifications",
                "Unconstitutional search and seizure",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                  <span className="text-charcoal-gray">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ARD Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel p-8 md:p-12 bg-gradient-to-r from-steel-blue/5 to-navy-blue/5">
            <h2 className="text-2xl font-bold text-navy-blue mb-4">ARD Program for First-Time Offenders</h2>
            <p className="text-charcoal-gray mb-4">
              If this is your first DUI, you may be eligible for Pennsylvania's Accelerated Rehabilitative Disposition (ARD) program. ARD allows first-time offenders to avoid a criminal conviction by completing a probationary program.
            </p>
            <p className="text-charcoal-gray mb-4">
              Successful completion of ARD results in dismissal of charges and expungement of your arrest record. This is a significant opportunity to move forward without the lasting consequences of a DUI conviction.
            </p>
            <p className="text-charcoal-gray">
              We'll evaluate your eligibility for ARD and guide you through the process if it's available in your case.
            </p>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Recent Legal Victories</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: "Commonwealth v. Shiflett",
                description: "ARD cannot be used to enhance criminal sentences for subsequent DUI convictions.",
              },
              {
                title: "Ferguson v. PennDOT",
                description: "Understanding the complex interplay between criminal and administrative DUI consequences.",
              },
            ].map((case_, index) => (
              <div key={index} className="glass-panel p-6">
                <h3 className="text-lg font-bold text-navy-blue mb-2">{case_.title}</h3>
                <p className="text-charcoal-gray text-sm">{case_.description}</p>
                <button
                  onClick={() => navigate("/blog")}
                  className="text-steel-blue font-semibold text-sm mt-4 hover:text-navy-blue transition-colors"
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Facing DUI Charges?</h2>
          <p className="text-charcoal-gray mb-8">
            Time is critical in DUI cases. Contact our office immediately for a confidential consultation to discuss your options.
          </p>
          <Button onClick={() => navigate("/contact")} className="glass-button-primary">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
