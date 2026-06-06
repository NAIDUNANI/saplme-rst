import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Isabella Rossi", role: "Food Critic", text: "An absolute symphony of flavor. The truffle tagliolini alone is worth the trip — possibly the city's finest pasta.", rating: 5 },
  { name: "Marcus Chen", role: "Regular Guest", text: "Twenty visits in, and every single dish has surprised me. The service is warm without being intrusive. Perfection.", rating: 5 },
  { name: "Aisha Patel", role: "Travel Writer", text: "The ambience transports you. Velvet, candlelight, and food that tastes like memory. A must-experience.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.4em] text-xs uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            What Our <span className="italic text-gradient-gold">Guests</span> Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-8 bg-burgundy-deep/40 border border-gold/15 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/30" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-cream/85 leading-relaxed">"{r.text}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-charcoal font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-cream font-semibold text-sm">{r.name}</div>
                  <div className="text-cream/50 text-xs">{r.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
