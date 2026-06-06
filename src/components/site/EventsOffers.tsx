import { motion } from "motion/react";
import { Cake, Users, Briefcase, UtensilsCrossed, Tag, Gift, Sparkles, Heart, Calendar } from "lucide-react";
import { useAdmin, type EventItem } from "@/context/AdminContext";

const eventIcons = [Cake, Users, Briefcase, UtensilsCrossed, Calendar];
const offerIcons = [Tag, Gift, Sparkles, Heart];

export function EventsOffers() {
  const { content } = useAdmin();
  const events = content.events.filter((e) => e.kind === "event");
  const offers = content.events.filter((e) => e.kind === "offer");
  return (
    <section className="py-24 md:py-32 px-6 bg-burgundy text-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <Block title="Events & Catering" subtitle="Celebrate" items={events} icons={eventIcons} />
        <Block title="Offers & Discounts" subtitle="Save" items={offers} icons={offerIcons} />
      </div>
    </section>
  );
}

function Block({
  title,
  subtitle,
  items,
  icons,
}: {
  title: string;
  subtitle: string;
  items: EventItem[];
  icons: React.ElementType[];
}) {
  return (
    <div>
      <span className="text-gold tracking-[0.4em] text-xs uppercase">{subtitle}</span>
      <h2 className="font-display text-3xl md:text-4xl mt-4 mb-8">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((it, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.06, 0.24), duration: 0.4, ease: "easeOut" }}
              className="p-5 bg-burgundy-deep/50 border border-gold/15 rounded-xl hover:border-gold/50 transition-colors"
            >
              <Icon className="w-6 h-6 text-gold mb-3" />
              <h3 className="font-display text-lg">{it.t}</h3>
              <p className="text-cream/70 text-sm mt-1.5">{it.d}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
