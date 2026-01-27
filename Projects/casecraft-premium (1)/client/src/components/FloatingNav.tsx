import React from "react";
import { Link, useLocation } from "wouter";

/**
 * FloatingNav – a premium, glass‑morphism navigation bar that stays fixed at the top of the viewport.
 * It uses the `.floating-nav` utility class defined in `index.css` which provides:
 *   - Fixed positioning with high z‑index
 *   - Rounded pill shape, subtle backdrop blur, and glass‑like translucency
 *   - Smooth drop‑shadow for depth
 *
 * The navigation items are driven by a simple array of objects so the component can be reused
 * across the application. Feel free to extend the `navItems` list with more routes.
 */
const navItems = [
    { name: "Home", to: "/" },
    { name: "Blog", to: "/blog" },
    { name: "Criminal Defense", to: "/criminal-defense" },
    { name: "DUI Defense", to: "/dui-defense" },
    { name: "Family Law", to: "/family-law" },
    { name: "Contact", to: "/contact" },
];

export const FloatingNav: React.FC = () => {
    const [location] = useLocation();

    return (
        <nav className="floating-nav flex items-center justify-center space-x-4 px-4 py-2">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    href={item.to}
                    className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${location === item.to
                            ? "bg-navy-blue text-off-white"
                            : "text-navy-blue hover:bg-navy-blue hover:text-off-white"
                        }`}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default FloatingNav;
