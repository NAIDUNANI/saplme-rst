import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Users, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/context/AdminContext";

export function Reservation() {
  const { content, addBooking } = useAdmin();
  const TOTAL_TABLES = content.totalTables;
  const reserved = content.bookings.length;
  const available = Math.max(TOTAL_TABLES - reserved, 0);

  const [form, setForm] = useState({ name: "", date: "", time: "19:00", guests: 2 });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date) {
      toast.error("Please fill in your name and date.");
      return;
    }
    if (available <= 0) {
      toast.error("Sorry, fully booked tonight.");
      return;
    }
    addBooking(form);
    setDone(true);
    toast.success("Reservation confirmed!");
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <section
      id="reserve"
      className="relative py-24 md:py-32 px-6 text-cream overflow-hidden"
      style={{
        backgroundColor: "var(--burgundy-deep)",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, oklch(0.32 0.12 18 / 0.95), transparent 55%), radial-gradient(circle at 85% 80%, oklch(0.78 0.13 82 / 0.22), transparent 50%), linear-gradient(180deg, oklch(0.14 0.06 18), oklch(0.10 0.04 18))",
      }}
    >
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-gold/15 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-burgundy/60 rounded-full blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(var(--gold)_1px,transparent_1px),linear-gradient(90deg,var(--gold)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase font-semibold">Reserve</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl mt-5 text-cream leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
            Book Your <span className="italic text-gradient-gold">Table</span>
          </h2>
          <p className="text-cream/85 mt-5 max-w-md leading-relaxed text-base md:text-lg">
            Secure your seat at the table. We hold reservations for 15 minutes past the booked time — please arrive in style.
          </p>

          <div className="mt-10 p-7 bg-charcoal/70 border border-gold/35 rounded-2xl backdrop-blur-md shadow-elegant">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Live Availability — Tonight
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Stat n={TOTAL_TABLES} l="Total" />
              <Stat n={available} l="Available" highlight />
              <Stat n={reserved} l="Reserved" />
            </div>
            <div className="mt-6 h-1.5 bg-charcoal/90 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-gold"
                initial={{ width: 0 }}
                whileInView={{ width: `${TOTAL_TABLES ? (reserved / TOTAL_TABLES) * 100 : 0}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-cream/60 mt-4">Updated in real time</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-cream text-charcoal p-8 md:p-10 rounded-3xl shadow-elegant relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold/20 rounded-full blur-3xl" />
          <h3 className="font-display text-3xl relative">Your Details</h3>
          <p className="text-charcoal/70 text-sm mt-1 mb-6 relative">A few details and your evening is set.</p>
          <div className="space-y-4 relative">
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-white border border-border focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/15 transition"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={<Calendar className="w-4 h-4" />}>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent focus:outline-none"
                />
              </Field>
              <Field icon={<Clock className="w-4 h-4" />}>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full bg-transparent focus:outline-none"
                >
                  {["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field icon={<Users className="w-4 h-4" />}>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="w-full bg-transparent focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </Field>
            <button
              type="submit"
              disabled={done}
              className="w-full mt-2 bg-charcoal text-cream py-4 rounded-xl font-semibold tracking-wide hover:bg-burgundy transition-colors disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {done ? (
                <><Check className="w-4 h-4" /> Confirmed</>
              ) : (
                <>Confirm Reservation<span className="text-gold group-hover:translate-x-1 transition-transform">→</span></>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Stat({ n, l, highlight }: { n: number; l: string; highlight?: boolean }) {
  return (
    <div>
      <div className={`font-display text-5xl ${highlight ? "text-gradient-gold" : "text-cream"}`}>{n}</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-cream/75 mt-2 font-semibold">{l}</div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white border border-border focus-within:border-burgundy focus-within:ring-2 focus-within:ring-burgundy/15 transition">
      <span className="text-burgundy">{icon}</span>
      {children}
    </div>
  );
}
