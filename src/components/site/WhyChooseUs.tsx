import { motion } from "motion/react";
import { Leaf, ChefHat, Sparkles, Zap, BadgeDollarSign } from "lucide-react";

const items = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily from local farms and trusted producers." },
  { icon: ChefHat, title: "Experienced Chefs", desc: "Helmed by Michelin-trained culinary artists." },
  { icon: Sparkles, title: "Hygienic Kitchen", desc: "Spotless standards, certified clean every shift." },
  { icon: Zap, title: "Fast Service", desc: "Attentive, prompt, never rushed. The right pace." },
  { icon: BadgeDollarSign, title: "Honest Pricing", desc: "Premium quality at a fair, transparent price." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-burgundy tracking-[0.4em] text-xs uppercase">Why Choose Us</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-charcoal">
            Crafted for <span className="italic text-burgundy">Excellence</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-7 bg-white rounded-2xl border border-border hover:border-gold hover:shadow-elegant transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-5">
                <it.icon className="w-6 h-6 text-charcoal" />
              </div>
              <h3 className="font-display text-lg text-charcoal">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
