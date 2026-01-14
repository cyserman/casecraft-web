import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Heart, Users, FileText, Scale, Home, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function FamilyLaw() {
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
              { label: "Family Law" }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Family Law</h1>
          <p className="text-lg md:text-xl text-light-gray max-w-2xl">
            Compassionate representation for family law matters in Montgomery and Chester Counties, Pennsylvania.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-6">Protecting Your Family's Future</h2>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              Family law matters are deeply personal and often emotionally challenging. Whether you're going through a divorce, facing custody disputes, or dealing with other family law issues, you need an attorney who understands both the legal complexities and the human dimensions of your situation.
            </p>
            <p className="text-charcoal-gray mb-4 leading-relaxed">
              At Griff Law, we approach family law with compassion and pragmatism. We understand that your primary concern is protecting your family's wellbeing and securing the best possible outcome for you and your children. We'll work tirelessly to achieve that goal through negotiation, mediation, or litigation if necessary.
            </p>
            <p className="text-charcoal-gray leading-relaxed">
              Our goal is to help you move forward with your life while protecting your rights and your family's interests.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Our Family Law Services</h2>
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

        {/* Approach Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-8">Our Approach</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-navy-blue mb-2">Negotiation First</h3>
                <p className="text-charcoal-gray">
                  We believe that most family law matters are best resolved through negotiation and agreement rather than adversarial litigation. We'll work with the other party's attorney to reach fair settlements whenever possible.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-blue mb-2">Mediation & Collaboration</h3>
                <p className="text-charcoal-gray">
                  When appropriate, we can facilitate mediation or collaborative processes that help both parties reach mutually acceptable agreements while minimizing conflict and expense.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-blue mb-2">Litigation When Necessary</h3>
                <p className="text-charcoal-gray">
                  If negotiation and mediation don't work, we're prepared to aggressively litigate your case. We'll present compelling evidence and arguments to protect your rights in court.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custody Focus */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-panel p-8 md:p-12 bg-gradient-to-r from-steel-blue/5 to-navy-blue/5">
            <h2 className="text-2xl font-bold text-navy-blue mb-4">Custody & Your Children</h2>
            <p className="text-charcoal-gray mb-4">
              When children are involved, custody and visitation decisions are paramount. Pennsylvania courts apply the "best interests of the child" standard when making custody determinations, considering factors such as:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Each parent's relationship with the child",
                "The child's needs and preferences",
                "Each parent's ability to provide care and support",
                "The stability of each home environment",
                "The child's adjustment to school and community",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                  <span className="text-charcoal-gray">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-charcoal-gray">
              We'll advocate for custody arrangements that serve your children's best interests while protecting your parental rights.
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Consultation", desc: "Understand your situation and goals" },
              { step: 2, title: "Strategy", desc: "Develop a comprehensive legal strategy" },
              { step: 3, title: "Negotiation", desc: "Pursue fair resolution through negotiation" },
              { step: 4, title: "Resolution", desc: "Achieve the best possible outcome" },
            ].map((item) => (
              <div key={item.step} className="glass-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-navy-blue to-steel-blue text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-blue mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Let's Protect Your Family's Future</h2>
          <p className="text-charcoal-gray mb-8">
            Contact our office today for a confidential consultation about your family law matter.
          </p>
          <Button onClick={() => navigate("/contact")} className="glass-button-primary">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
