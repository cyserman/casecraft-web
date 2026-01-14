import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const services = [
    { label: "Criminal Defense", href: "/services/criminal-defense" },
    { label: "DUI Defense", href: "/services/dui-defense" },
    { label: "Family Law", href: "/services/family-law" },
  ];

  const publicNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasSubmenu: true },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const authenticatedNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasSubmenu: true },
    { label: "Client Tools", href: "/tools/case-assist" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-panel-lg mx-4 mt-4 rounded-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-serif font-bold text-xl text-navy-blue hover:text-dark-blue transition-colors">
            <span className="text-2xl">⚖️</span>
            <span>Griff Law</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.hasSubmenu ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-charcoal-gray hover:text-navy-blue transition-colors font-medium outline-none">
                  {item.label} <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-panel-lg border-none min-w-[200px] mt-2">
                  <DropdownMenuItem asChild>
                    <Link href="/services">
                      <a className="w-full cursor-pointer hover:bg-white/20 px-4 py-2 text-sm font-medium text-navy-blue rounded-lg">
                        All Services
                      </a>
                    </Link>
                  </DropdownMenuItem>
                  {services.map((service) => (
                    <DropdownMenuItem key={service.href} asChild>
                      <Link href={service.href}>
                        <a className="w-full cursor-pointer hover:bg-white/20 px-4 py-2 text-sm font-medium text-navy-blue rounded-lg">
                          {service.label}
                        </a>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={item.href} href={item.href}>
                <a className="text-charcoal-gray hover:text-navy-blue transition-colors font-medium">
                  {item.label}
                </a>
              </Link>
            )
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="glass-button px-6 py-2 text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <a
              href={getLoginUrl()}
              className="glass-button-primary px-6 py-2 text-sm font-semibold"
            >
              Sign In
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-navy-blue" />
          ) : (
            <Menu className="w-6 h-6 text-navy-blue" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-panel-lg mx-4 mt-2 rounded-2xl p-6 space-y-4 animate-slide-in-down overflow-y-auto max-h-[80vh]">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.hasSubmenu ? (
                <>
                  <Link href={item.href}>
                    <a
                      className="block text-charcoal-gray hover:text-navy-blue transition-colors font-semibold py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                  <div className="pl-4 space-y-2 border-l border-navy-blue/10 ml-2 mt-1">
                    {services.map((service) => (
                      <Link key={service.href} href={service.href}>
                        <a
                          className="block text-charcoal-gray hover:text-navy-blue transition-colors font-medium py-1 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href}>
                  <a
                    className="block text-charcoal-gray hover:text-navy-blue transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-slate-gray">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full glass-button px-4 py-2 text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <a
                href={getLoginUrl()}
                className="block text-center glass-button-primary px-4 py-2 text-sm font-semibold"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

