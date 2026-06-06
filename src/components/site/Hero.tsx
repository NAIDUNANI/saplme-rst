import { motion } from "motion/react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-charcoal">
      <motion.img
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        src={heroImg}
        alt="Elegant dining"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.16_0.012_50/0.7)_80%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <span className="h-px w-12 bg-gold/60" />
        <span className="text-gold tracking-[0.5em] text-[10px] uppercase">Sample Site · Est. 1987</span>
        <span className="h-px w-12 bg-gold/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-display text-cream max-w-5xl leading-[0.95] text-[clamp(2.75rem,7vw,5.75rem)]"
        >
          Experience <span className="italic text-gradient-gold">Authentic</span>
          <br />
          Flavors, Crafted
          <br />
          with <span className="italic text-gradient-gold">Passion</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-cream/70 max-w-lg text-base md:text-lg font-light"
        >
          A culinary sanctuary where heritage recipes meet contemporary artistry — one unforgettable plate at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#menu"
            className="bg-gradient-gold text-charcoal px-8 py-3.5 rounded-full font-semibold tracking-wide hover:shadow-glow transition-shadow duration-300"
          >
            View Menu
          </a>
          <a
            href="#reserve"
            className="border border-gold/50 text-cream px-8 py-3.5 rounded-full font-semibold tracking-wide hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold text-[10px] tracking-[0.4em] z-10"
      >
        ↓ SCROLL
      </motion.div>
    </section>
  );
}

