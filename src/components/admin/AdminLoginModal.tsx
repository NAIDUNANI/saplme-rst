import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, X, User, KeyRound } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";

export function AdminLoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { login } = useAdmin();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) {
      toast.success("Welcome back, Chef.");
      setU(""); setP("");
      onSuccess();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-md p-8 rounded-3xl text-cream overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, oklch(0.32 0.12 18 / 0.9), transparent 60%), linear-gradient(180deg, oklch(0.18 0.04 30), oklch(0.12 0.03 30))",
              boxShadow: "0 30px 90px -20px rgba(0,0,0,0.7), 0 0 80px oklch(0.78 0.13 82 / 0.2)",
              border: "1px solid oklch(0.78 0.13 82 / 0.35)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-cream/60 hover:text-cream hover:bg-cream/10 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", damping: 14 }}
              className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-charcoal mx-auto"
            >
              <Lock className="w-6 h-6" />
            </motion.div>

            <h2 className="font-display text-3xl text-center mt-4">Admin Access</h2>
            <p className="text-cream/60 text-center text-sm mt-1">Sample Site · Staff entrance</p>

            <div className="mt-6 space-y-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream/5 border border-cream/15 focus-within:border-gold transition"
              >
                <User className="w-4 h-4 text-gold" />
                <input
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                  className="w-full bg-transparent focus:outline-none placeholder:text-cream/40"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream/5 border border-cream/15 focus-within:border-gold transition"
              >
                <KeyRound className="w-4 h-4 text-gold" />
                <input
                  type="password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full bg-transparent focus:outline-none placeholder:text-cream/40"
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-gold text-charcoal font-semibold tracking-wide"
            >
              Enter Dashboard
            </motion.button>

            <p className="text-[11px] text-cream/40 mt-4 text-center tracking-wider">
              Demo · username <span className="text-gold">admin</span> · password <span className="text-gold">maison2026</span>
            </p>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
