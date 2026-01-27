import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Shield, Scale, Users, Gavel, FileText, Phone, Home } from "lucide-react";
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
    { label: "Criminal Defense", href: "/services/criminal-defense", icon: Gavel },
    { label: "DUI Defense", href: "/services/dui-defense", icon: Shield },
    { label: "Family Law", href: "/services/family-law", icon: Users },
  ];

  const publicNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "/services", hasSubmenu: true, icon: Scale },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  const authenticatedNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "/services", hasSubmenu: true, icon: Scale },
    { label: "Client Tools", href: "/tools/case-assist", icon: Shield },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="mx-4 mt-4 px-6 py-4 flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img src="/logo.png" alt="Griffiths Law Logo" className="relative h-14 md:h-16 w-auto drop-shadow-lg" />
          </div>
          <span className="font-serif font-bold text-xl md:text-2xl text-white tracking-wide">Griffiths Law</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.hasSubmenu ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium outline-none group">
                  <item.icon className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                  {item.label} <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-panel-lg border-none min-w-[220px] mt-2 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700">
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="w-full cursor-pointer hover:bg-white/10 px-4 py-3 text-sm font-medium text-slate-200 hover:text-white rounded-lg flex items-center gap-3">
                      <Scale className="w-4 h-4 text-yellow-500" />
                      All Services
                    </Link>
                  </DropdownMenuItem>
                  {services.map((service) => (
                    <DropdownMenuItem key={service.href} asChild>
                      <Link href={service.href} className="w-full cursor-pointer hover:bg-white/10 px-4 py-3 text-sm font-medium text-slate-200 hover:text-white rounded-lg flex items-center gap-3">
                        <service.icon className="w-4 h-4 text-yellow-500" />
                        {service.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium group"
              >
                <item.icon className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                {item.label}
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
          {/* Tactical Tools Priority - Mobile Only */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-2">
            <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">Tactical Tools</div>
            <div className="grid grid-cols-2 gap-2">
              <a href="/#tactical" className="bg-slate-900/50 text-white text-xs font-bold py-2 px-3 rounded text-center border border-slate-700 hover:border-yellow-500 transition-colors">
                Jargon Slayer
              </a>
              <a href="/#tactical" className="bg-slate-900/50 text-white text-xs font-bold py-2 px-3 rounded text-center border border-slate-700 hover:border-yellow-500 transition-colors">
                Parenting Plan
              </a>
            </div>
          </div>

          {navItems.map((item) => (
            <div key={item.href}>
              {item.hasSubmenu ? (
                <>
                  <Link
                    href={item.href}
                    className="block text-slate-200 hover:text-white transition-colors font-semibold py-2 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-yellow-500" />
                    {item.label}
                  </Link>
                  <div className="pl-4 space-y-2 border-l border-white/10 ml-2 mt-1">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block text-slate-400 hover:text-white transition-colors font-medium py-2 text-sm flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <service.icon className="w-3 h-3 text-yellow-500/80" />
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block text-slate-200 hover:text-white transition-colors font-medium py-2 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4 text-yellow-500" />
                  {item.label}
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

