import { useState } from "react";
import { Instagram, Facebook, Twitter, Lock, LogOut, Settings, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAdmin } from "@/context/AdminContext";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { toast } from "sonner";

export function Footer() {
  const { isAdmin, logout } = useAdmin();
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

  return (
    <footer className="bg-charcoal text-cream py-16 px-6 border-t border-gold/15">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl font-bold">
            Sample<span className="text-gradient-gold"> Site</span>
          </div>
          <p className="text-cream/60 text-sm mt-3 leading-relaxed">
            A culinary sanctuary in the heart of the city since 1987.
          </p>
        </div>
        <FooterCol title="Explore" links={["Home", "Menu", "About", "Gallery"]} />
        <FooterCol title="Visit" links={["Reservations", "Private Events", "Catering", "Contact"]} />
        <div>
          <div className="text-gold text-xs uppercase tracking-widest mb-4">Follow</div>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
        <span>© {new Date().getFullYear()} Sample Site. All rights reserved.</span>
        <div className="flex items-center gap-3">
          <span>Crafted with passion, served with grace.</span>
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-gold">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </span>
              <Link
                to="/admin"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gold text-charcoal font-medium hover:bg-gold-soft transition-colors"
              >
                <Settings className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-cream/80 hover:text-cream hover:bg-burgundy/40 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-gold text-charcoal font-medium hover:opacity-90 transition-opacity"
            >
              <Lock className="w-3.5 h-3.5" /> Admin Login
            </button>
          )}
        </div>
      </div>

      <AdminLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => { setLoginOpen(false); navigate({ to: "/admin" }); }}
      />
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-gold text-xs uppercase tracking-widest mb-4">{title}</div>
      <ul className="space-y-2 text-sm text-cream/70">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
