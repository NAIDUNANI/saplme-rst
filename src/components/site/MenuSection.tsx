import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Leaf, Flame } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

export function MenuSection() {
  const { content } = useAdmin();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      content.menu.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          (m.name.toLowerCase().includes(q.toLowerCase()) || m.desc.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q, content.menu],
  );

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-burgundy tracking-[0.4em] text-xs uppercase">Digital Menu</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-charcoal">
            Browse Our <span className="italic text-burgundy">Selection</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  cat === c
                    ? "bg-burgundy text-cream shadow-elegant"
                    : "bg-white text-charcoal hover:bg-gold/20 border border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                className="group flex items-start justify-between gap-4 p-6 bg-white rounded-2xl border border-border hover:border-gold/60 hover:shadow-elegant transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-charcoal">{m.name}</h3>
                    {m.veg ? (
                      <Leaf className="w-4 h-4 text-green-600" aria-label="Vegetarian" />
                    ) : (
                      <Flame className="w-4 h-4 text-burgundy" aria-label="Non-vegetarian" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{m.desc}</p>
                </div>
                <span className="font-display text-xl text-burgundy whitespace-nowrap">{m.price}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="md:col-span-2 text-center text-muted-foreground py-12">No dishes found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
