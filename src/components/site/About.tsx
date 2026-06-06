import { motion } from "motion/react";
import g2 from "@/assets/gallery-2.jpg";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img src={g2} alt="Chef" width={800} height={1000} loading="lazy" className="rounded-2xl shadow-elegant w-full" />
          <div className="absolute -bottom-6 -right-6 bg-burgundy text-cream p-6 rounded-2xl shadow-elegant">
            <div className="text-4xl font-display text-gold">38+</div>
            <div className="text-xs uppercase tracking-widest mt-1">Years of Craft</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-burgundy tracking-[0.4em] text-xs uppercase">Our Story</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-charcoal">
            A Legacy of <span className="italic text-burgundy">Flavor</span> & Hospitality
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Founded in 1987 by Chef Antoine Doré, our kitchen has spent nearly four decades perfecting the balance between
            tradition and innovation. Every dish that leaves our pass tells a story — of farmers we know by name, of
            recipes passed down through generations, and of an unwavering commitment to your experience.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe great food is more than nourishment — it's memory, ceremony, and joy on a plate.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { n: "150K+", l: "Guests Served" },
              { n: "24", l: "Awards Won" },
              { n: "4.9★", l: "Avg. Rating" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl text-burgundy">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
