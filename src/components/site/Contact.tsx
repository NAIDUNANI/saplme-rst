import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-burgundy tracking-[0.4em] text-xs uppercase">Visit Us</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-charcoal">
            Find Your <span className="italic text-burgundy">Seat</span>
          </h2>
          <div className="mt-10 space-y-5">
            <Info icon={MapPin} title="Address" lines={["42 Rue de la Lumière", "Paris, 75008, France"]} />
            <Info icon={Phone} title="Phone" lines={["+33 1 45 67 89 00"]} />
            <Info icon={Mail} title="Email" lines={["reservations@maisondore.com"]} />
            <Info
              icon={Clock}
              title="Hours"
              lines={["Tue – Sun · 17:30 – 23:00", "Closed Mondays"]}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-elegant min-h-[400px]"
        >
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=Champs+Elysees+Paris&output=embed"
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, title, lines }: { icon: React.ElementType; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4 p-5 bg-white rounded-xl border border-border hover:border-gold transition-colors">
      <div className="w-11 h-11 rounded-lg bg-gradient-gold flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-charcoal" />
      </div>
      <div>
        <div className="font-display text-lg text-charcoal">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-muted-foreground text-sm">{l}</div>
        ))}
      </div>
    </div>
  );
}
