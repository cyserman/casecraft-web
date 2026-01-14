import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-blue text-off-white mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-off-white">Griff Law</h3>
            <p className="text-light-gray text-sm leading-relaxed">
              Expert criminal defense and constitutional rights representation in Montgomery & Chester Counties, Pennsylvania. Led by Steven F. O'Meara, dedicated to protecting your rights.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-off-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/criminal-defense">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">Criminal Defense</a>
                </Link>
              </li>
              <li>
                <Link href="/services/dui-defense">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">DUI Defense</a>
                </Link>
              </li>
              <li>
                <Link href="/services/family-law">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">Family Law</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-off-white">Client Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">Steve's Corner Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/tools/case-assist">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">Client Case Assist</a>
                </Link>
              </li>
              <li>
                <Link href="/tools/file-organizer">
                  <a className="text-light-gray hover:text-steel-blue transition-colors">Digital File Organizer</a>
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
                <Link href="/contact">
                  <a className="text-steel-blue hover:text-off-white transition-colors font-semibold">
                    Schedule Consultation →
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-light-gray">
          <p>&copy; {currentYear} Griff Law PA. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/">
              <a className="hover:text-steel-blue transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/">
              <a className="hover:text-steel-blue transition-colors">Terms of Service</a>
            </Link>
            <Link href="/">
              <a className="hover:text-steel-blue transition-colors">Legal Disclaimer</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

