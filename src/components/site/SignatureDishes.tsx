import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useAdmin, resolveDishImage } from "@/context/AdminContext";

export function SignatureDishes() {
  const { content } = useAdmin();
  return (
    <section className="py-24 md:py-32 px-6 bg-charcoal text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.4em] text-xs uppercase">Chef's Selection</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Signature <span className="italic text-gradient-gold">Dishes</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.dishes.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3), ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group bg-burgundy-deep/40 border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/50 transition-colors"
            >
              <div className="overflow-hidden aspect-square">
                <img
                  src={resolveDishImage(d.img)}
                  alt={d.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl text-cream">{d.name}</h3>
                  <span className="text-gold font-semibold">{d.price}</span>
                </div>
                <p className="text-cream/70 text-sm leading-relaxed">{d.desc}</p>
                <div className="flex items-center gap-1 mt-4">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="text-sm text-cream/80">{d.rating}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
