import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-blue text-off-white mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="flex flex-col items-start space-y-4">
            <img src="/logo-seal.png" alt="Griffiths Law Firm Est. 2002" className="h-32 w-auto opacity-90" />
            <div>
              <h3 className="text-xl font-serif font-bold mb-2 text-off-white">Griffiths Law</h3>
              <p className="text-light-gray text-sm leading-relaxed">
                Expert criminal defense and constitutional rights representation in Montgomery & Chester Counties, Pennsylvania. Dedicated to protecting your rights.
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-off-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/criminal-defense" className="text-light-gray hover:text-steel-blue transition-colors">
                  Criminal Defense
                </Link>
              </li>
              <li>
                <Link href="/services/dui-defense" className="text-light-gray hover:text-steel-blue transition-colors">
                  DUI Defense
                </Link>
              </li>
              <li>
                <Link href="/services/family-law" className="text-light-gray hover:text-steel-blue transition-colors">
                  Family Law
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-off-white">Client Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-light-gray hover:text-steel-blue transition-colors">
                  Steve's Corner Blog
                </Link>
              </li>
              <li>
                <Link href="/tools/case-assist" className="text-light-gray hover:text-steel-blue transition-colors">
                  Client Case Assist
                </Link>
              </li>
              <li>
                <Link href="/tools/file-organizer" className="text-light-gray hover:text-steel-blue transition-colors">
                  Digital File Organizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-off-white">Contact</h4>
            <ul className="space-y-2 text-sm text-light-gray">
              <li>
                <a href="tel:+16109991234" className="hover:text-steel-blue transition-colors">
                  +1 (610) 999-1234
                </a>
              </li>
              <li>
                <a href="mailto:steve@grifflawpa.com" className="hover:text-steel-blue transition-colors">
                  steve@grifflawpa.com
                </a>
              </li>
              <li className="pt-2">
                <Link href="/contact" className="text-steel-blue hover:text-off-white transition-colors font-semibold">
                  Schedule Consultation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-light-gray">
          <p>&copy; {currentYear} Griffiths Law Firm. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-steel-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-steel-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-steel-blue transition-colors">
              Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

