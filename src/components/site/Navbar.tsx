import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-charcoal/40 border-b border-gold/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-cream">
          Sample<span className="text-gradient-gold"> Site</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-cream/80 hover:text-gold text-sm tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#reserve"
          className="hidden md:inline-flex bg-gradient-gold text-charcoal px-5 py-2 rounded-full text-sm font-semibold hover:shadow-glow transition-shadow"
        >
          Reserve
        </a>
      </div>
    </motion.header>
  );
}
