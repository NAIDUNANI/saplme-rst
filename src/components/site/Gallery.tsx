import { motion } from "motion/react";
import { useAdmin } from "@/context/AdminContext";

export function Gallery() {
  const { content } = useAdmin();
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        backgroundColor: "var(--cream)",
        backgroundImage:
          "radial-gradient(circle at 15% 10%, oklch(0.78 0.13 82 / 0.18), transparent 55%), radial-gradient(circle at 85% 90%, oklch(0.32 0.12 18 / 0.10), transparent 55%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-burgundy/40" />
            <span className="text-burgundy tracking-[0.4em] text-xs uppercase">Gallery</span>
            <span className="h-px w-10 bg-burgundy/40" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl mt-5 text-charcoal">
            A Visual <span className="italic text-burgundy">Feast</span>
          </h2>
          <p className="text-charcoal/60 mt-4 max-w-lg mx-auto">
            Moments from our dining room, the pass, and the bar — captured by candlelight.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[230px] gap-3 md:gap-4">
          {content.gallery.map((im, i) => (
            <motion.div
              key={im.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(i * 0.05, 0.25), duration: 0.5, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ring-1 ring-burgundy/10 hover:ring-gold/50 transition-all duration-300 ${im.span}`}
            >
              {im.src && (
                <img
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
              <div className="absolute inset-0 bg-burgundy-deep/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <span className="font-display text-cream text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {im.label}
                </span>
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
