import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", caseType: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-navy-blue mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-charcoal-gray max-w-3xl mx-auto">
            Ready to discuss your case? Contact Griff Law for a confidential consultation.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Phone,
              title: "Phone",
              content: "+1 (610) 555-0123",
              subtext: "Mon-Fri: 9am-6pm EST",
            },
            {
              icon: Mail,
              title: "Email",
              content: "contact@grifflaw.com",
              subtext: "Response within 24 hours",
            },
            {
              icon: MapPin,
              title: "Office",
              content: "Montgomery & Chester Counties",
              subtext: "Pennsylvania",
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel-lg p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-blue mb-2">{item.title}</h3>
              <p className="text-charcoal-gray font-semibold mb-1">{item.content}</p>
              <p className="text-medium-gray text-sm">{item.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="glass-panel-lg p-12 rounded-2xl">
            <h2 className="text-3xl font-serif font-bold text-navy-blue mb-8">Schedule a Consultation</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-serif font-bold text-green-700 mb-2">Thank You!</h3>
                <p className="text-green-600">
                  We've received your message and will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray focus:border-steel-blue focus:outline-none transition-colors bg-white/50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray focus:border-steel-blue focus:outline-none transition-colors bg-white/50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray focus:border-steel-blue focus:outline-none transition-colors bg-white/50"
                    placeholder="+1 (610) 555-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">
                    Case Type *
                  </label>
                  <select
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray focus:border-steel-blue focus:outline-none transition-colors bg-white/50"
                  >
                    <option value="">Select a case type</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="dui">DUI Defense</option>
                    <option value="constitutional">Constitutional Rights</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray focus:border-steel-blue focus:outline-none transition-colors bg-white/50 resize-none"
                    placeholder="Tell us about your case..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full glass-button-primary px-6 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 rounded-lg"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-medium-gray text-center">
                  By submitting this form, you agree to our privacy policy. Your information is confidential and protected.
                </p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Office Hours */}
            <div className="glass-panel-lg p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-off-blue rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy-blue">Office Hours</h3>
              </div>
              <div className="space-y-3 text-charcoal-gray">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">By Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
                <p className="text-sm text-medium-gray pt-4">
                  Emergency consultations available. Call for urgent matters.
                </p>
              </div>
            </div>

            {/* Service Areas */}
            <div className="glass-panel-lg p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-bold text-navy-blue mb-6">Service Areas</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-navy-blue mb-2">Montgomery County</h4>
                  <p className="text-sm text-charcoal-gray">
                    Norriton, Whitpain, Whitemarsh, Upper Merion, and surrounding municipalities
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-blue mb-2">Chester County</h4>
                  <p className="text-sm text-charcoal-gray">
                    West Chester, Kennett Square, and surrounding communities
                  </p>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="glass-panel-lg p-8 rounded-xl bg-blue-50/50">
              <h3 className="text-lg font-serif font-bold text-navy-blue mb-4">Confidentiality Notice</h3>
              <p className="text-sm text-charcoal-gray leading-relaxed">
                All communications with our office are confidential and protected by attorney-client privilege. Your consultation is strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mt-20">
        <div className="glass-panel-lg p-12 rounded-2xl text-center bg-gradient-to-r from-navy-blue/5 to-steel-blue/5">
          <h2 className="text-4xl font-serif font-bold text-navy-blue mb-6">
            Don't Wait - Your Rights Matter
          </h2>
          <p className="text-xl text-charcoal-gray mb-8 max-w-2xl mx-auto">
            The sooner you contact us, the sooner we can begin building your defense. Call today.
          </p>
          <a
            href="tel:+16105550123"
            className="glass-button-primary px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 rounded-lg"
          >
            Call Now: +1 (610) 555-0123
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
