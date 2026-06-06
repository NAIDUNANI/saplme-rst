import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut, Plus, Trash2, Save, RotateCcw, UtensilsCrossed, ListOrdered,
  CalendarHeart, BookOpen, Image as ImageIcon, LayoutDashboard, ArrowLeft, ImagePlus,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  useAdmin, dishImageOptions, resolveImage, gallerySpanOptions,
  type Dish, type MenuItem, type EventItem, type GalleryItem,
} from "@/context/AdminContext";
import { ImageCropper } from "@/components/admin/ImageCropper";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Sample Site" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "dishes" | "menu" | "gallery" | "events" | "reservations";

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "dishes", label: "Signature Dishes", icon: UtensilsCrossed },
  { id: "menu", label: "Menu", icon: ListOrdered },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "reservations", label: "Reservations", icon: BookOpen },
  { id: "events", label: "Events & Offers", icon: CalendarHeart },
];

function AdminPage() {
  const { isAdmin, logout, content } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/" });
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-charcoal border-r border-gold/15 sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-gold/15">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Admin</div>
          <div className="font-display font-semibold text-lg text-cream mt-1">Sample Site</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => {
            const Active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  Active ? "bg-gradient-gold text-charcoal font-medium" : "text-cream/70 hover:bg-gold/10 hover:text-cream"
                }`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gold/15 space-y-1">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-gold/10 hover:text-cream transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-charcoal/95 backdrop-blur border-b border-gold/15 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-display font-semibold capitalize text-cream">{NAV.find((n) => n.id === tab)?.label}</h1>
            <p className="text-sm text-cream/50">Manage your site content</p>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/" className="p-2 rounded-lg hover:bg-gold/10 text-cream/70">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-300">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden flex gap-1 overflow-x-auto px-3 py-2 bg-charcoal border-b border-gold/15">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-full transition ${
                tab === n.id ? "bg-gradient-gold text-charcoal font-medium" : "bg-burgundy-deep/40 text-cream/70"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "overview" && <Overview content={content} setTab={setTab} />}
              {tab === "dishes" && <DishesEditor />}
              {tab === "menu" && <MenuEditor />}
              {tab === "gallery" && <GalleryEditor />}
              {tab === "events" && <EventsEditor />}
              {tab === "reservations" && <ReservationsEditor />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

// --- Shared UI ---
const inputCls = "w-full px-3 py-2 rounded-lg bg-charcoal/60 border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none text-sm text-cream placeholder:text-cream/30";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-burgundy-deep/30 border border-gold/15 rounded-xl p-4 shadow-elegant">{children}</div>;
}

function SectionBar({ title, onAdd, onReset, addLabel = "Add" }: { title: string; onAdd: () => void; onReset?: () => void; addLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-display font-semibold text-cream">{title}</h2>
      <div className="flex gap-2">
        {onReset && (
          <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-gold/20 bg-charcoal/40 hover:bg-charcoal/60 text-cream/80 transition">
            <RotateCcw className="w-3.5 h-3.5" /> Reset all
          </button>
        )}
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-gradient-gold text-charcoal font-medium hover:opacity-90 transition">
          <Plus className="w-3.5 h-3.5" /> {addLabel}
        </button>
      </div>
    </div>
  );
}

// --- Overview ---
function Overview({ content, setTab }: { content: ReturnType<typeof useAdmin>["content"]; setTab: (t: Tab) => void }) {
  const stats = [
    { label: "Signature Dishes", value: content.dishes.length, tab: "dishes" as Tab, icon: UtensilsCrossed, color: "bg-gold text-charcoal" },
    { label: "Menu Items", value: content.menu.length, tab: "menu" as Tab, icon: ListOrdered, color: "bg-green-600 text-cream" },
    { label: "Gallery Photos", value: content.gallery.length, tab: "gallery" as Tab, icon: ImageIcon, color: "bg-amber-500 text-charcoal" },
    { label: "Bookings", value: content.bookings.length, tab: "reservations" as Tab, icon: BookOpen, color: "bg-rose-500 text-cream" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <button key={s.label} onClick={() => setTab(s.tab)} className="text-left">
          <Card>
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-cream">{s.value}</div>
            <div className="text-sm text-cream/50 mt-1">{s.label}</div>
          </Card>
        </button>
      ))}
    </div>
  );
}

// --- Dishes (with crop upload) ---
function DishesEditor() {
  const { content, setDishes, resetAll } = useAdmin();
  const [cropFor, setCropFor] = useState<string | null>(null);

  const upd = (id: string, patch: Partial<Dish>) =>
    setDishes(content.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  return (
    <>
      <SectionBar
        title="Signature Dishes"
        onAdd={() =>
          setDishes([
            ...content.dishes,
            { id: crypto.randomUUID(), name: "New Dish", price: "$0", rating: 4.5, desc: "Description", img: "d1" },
          ])
        }
        onReset={() => { if (confirm("Reset ALL site content to defaults?")) { resetAll(); toast.success("Reset"); } }}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {content.dishes.map((d) => (
          <Card key={d.id}>
            <div className="flex gap-4">
              <div className="relative shrink-0">
                <img src={resolveImage(d.img)} alt={d.name} className="w-24 h-24 rounded-lg object-cover border border-gold/15" />
                <button
                  onClick={() => setCropFor(d.id)}
                  className="absolute -bottom-2 -right-2 bg-gradient-gold text-charcoal rounded-full p-1.5 shadow hover:opacity-90"
                  title="Upload & crop"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <input className={inputCls} value={d.name} onChange={(e) => upd(d.id, { name: e.target.value })} placeholder="Dish name" />
                <div className="grid grid-cols-2 gap-2">
                  <input className={inputCls} value={d.price} onChange={(e) => upd(d.id, { price: e.target.value })} placeholder="Price" />
                  <input type="number" step="0.1" min={0} max={5} className={inputCls} value={d.rating} onChange={(e) => upd(d.id, { rating: Number(e.target.value) })} placeholder="Rating" />
                </div>
              </div>
            </div>
            <textarea className={`${inputCls} mt-3`} value={d.desc} onChange={(e) => upd(d.id, { desc: e.target.value })} rows={2} placeholder="Description" />
            <div className="flex items-center justify-between mt-3">
              <select className={`${inputCls} max-w-[180px]`} value={dishImageOptions.includes(d.img) ? d.img : "__custom"} onChange={(e) => e.target.value !== "__custom" && upd(d.id, { img: e.target.value })}>
                {dishImageOptions.map((k) => <option key={k} value={k}>Preset · {k}</option>)}
                {!dishImageOptions.includes(d.img) && <option value="__custom">Custom upload</option>}
              </select>
              <button onClick={() => setDishes(content.dishes.filter((x) => x.id !== d.id))} className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-700">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
      <ImageCropper
        open={!!cropFor}
        onClose={() => setCropFor(null)}
        aspect={1}
        title="Upload & crop dish photo"
        onConfirm={(url) => {
          if (cropFor) upd(cropFor, { img: url });
          setCropFor(null);
          toast.success("Image updated");
        }}
      />
    </>
  );
}

// --- Menu ---
function MenuEditor() {
  const { content, setMenu } = useAdmin();
  const upd = (id: string, patch: Partial<MenuItem>) =>
    setMenu(content.menu.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  return (
    <>
      <SectionBar
        title="Menu Items"
        onAdd={() =>
          setMenu([...content.menu, { id: crypto.randomUUID(), name: "New Item", price: "$0", desc: "", category: "Starters", veg: true }])
        }
      />
      <div className="grid md:grid-cols-2 gap-4">
        {content.menu.map((m) => (
          <Card key={m.id}>
            <div className="grid grid-cols-2 gap-2">
              <input className={inputCls} value={m.name} onChange={(e) => upd(m.id, { name: e.target.value })} placeholder="Name" />
              <input className={inputCls} value={m.price} onChange={(e) => upd(m.id, { price: e.target.value })} placeholder="Price" />
            </div>
            <textarea className={`${inputCls} mt-2`} value={m.desc} onChange={(e) => upd(m.id, { desc: e.target.value })} rows={2} placeholder="Description" />
            <div className="grid grid-cols-2 gap-2 mt-2 items-center">
              <select className={inputCls} value={m.category} onChange={(e) => upd(m.id, { category: e.target.value })}>
                {["Starters", "Main Course", "Desserts", "Beverages"].map((c) => <option key={c}>{c}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm text-cream/70">
                <input type="checkbox" checked={m.veg} onChange={(e) => upd(m.id, { veg: e.target.checked })} className="accent-gold" /> Vegetarian
              </label>
            </div>
            <button onClick={() => setMenu(content.menu.filter((x) => x.id !== m.id))} className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-700 mt-3">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}

// --- Gallery ---
function GalleryEditor() {
  const { content, setGallery } = useAdmin();
  const [cropFor, setCropFor] = useState<string | null>(null);

  const upd = (id: string, patch: Partial<GalleryItem>) =>
    setGallery(content.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  return (
    <>
      <SectionBar
        title="Gallery"
        addLabel="Add photo"
        onAdd={() => {
          const id = crypto.randomUUID();
          setGallery([...content.gallery, { id, src: "", label: "New Photo", alt: "Photo", span: "" }]);
          setCropFor(id);
        }}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.gallery.map((g) => (
          <Card key={g.id}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-charcoal/50 mb-3">
              {g.src ? (
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream/40 text-sm">No image</div>
              )}
              <button
                onClick={() => setCropFor(g.id)}
                className="absolute bottom-2 right-2 bg-gradient-gold text-charcoal rounded-full p-2 shadow hover:opacity-90"
                title="Upload & crop"
              >
                <ImagePlus className="w-4 h-4" />
              </button>
            </div>
            <input className={inputCls} value={g.label} onChange={(e) => upd(g.id, { label: e.target.value })} placeholder="Caption" />
            <input className={`${inputCls} mt-2`} value={g.alt} onChange={(e) => upd(g.id, { alt: e.target.value })} placeholder="Alt text (accessibility)" />
            <select className={`${inputCls} mt-2`} value={g.span} onChange={(e) => upd(g.id, { span: e.target.value })}>
              {gallerySpanOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={() => setGallery(content.gallery.filter((x) => x.id !== g.id))} className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-700 mt-3">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </Card>
        ))}
      </div>
      <ImageCropper
        open={!!cropFor}
        onClose={() => setCropFor(null)}
        aspect={4 / 3}
        title="Upload & crop gallery photo"
        onConfirm={(url) => {
          if (cropFor) upd(cropFor, { src: url });
          setCropFor(null);
          toast.success("Photo updated");
        }}
      />
    </>
  );
}

// --- Events ---
function EventsEditor() {
  const { content, setEvents } = useAdmin();
  const upd = (id: string, patch: Partial<EventItem>) =>
    setEvents(content.events.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  return (
    <>
      <SectionBar
        title="Events & Offers"
        onAdd={() => setEvents([...content.events, { id: crypto.randomUUID(), t: "New", d: "", kind: "event" }])}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {content.events.map((e) => (
          <Card key={e.id}>
            <div className="grid grid-cols-3 gap-2">
              <input className={`${inputCls} col-span-2`} value={e.t} onChange={(ev) => upd(e.id, { t: ev.target.value })} placeholder="Title" />
              <select className={inputCls} value={e.kind} onChange={(ev) => upd(e.id, { kind: ev.target.value as "event" | "offer" })}>
                <option value="event">Event</option>
                <option value="offer">Offer</option>
              </select>
            </div>
            <textarea className={`${inputCls} mt-2`} value={e.d} onChange={(ev) => upd(e.id, { d: ev.target.value })} rows={2} placeholder="Description" />
            <button onClick={() => setEvents(content.events.filter((x) => x.id !== e.id))} className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-700 mt-3">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}

// --- Reservations ---
function ReservationsEditor() {
  const { content, setTotalTables, removeBooking } = useAdmin();
  const [n, setN] = useState(content.totalTables);
  return (
    <>
      <Card>
        <label className="text-xs uppercase tracking-widest text-cream/50">Total Tables</label>
        <div className="flex items-center gap-3 mt-2">
          <input type="number" min={1} className={`${inputCls} max-w-[140px]`} value={n} onChange={(e) => setN(Number(e.target.value))} />
          <button
            onClick={() => { setTotalTables(n); toast.success("Updated"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-gold text-charcoal text-sm font-medium hover:opacity-90 transition"
          >
            <Save className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </Card>

      <h3 className="font-display font-semibold text-cream mt-6 mb-3">Bookings ({content.bookings.length})</h3>
      {content.bookings.length === 0 ? (
        <Card><p className="text-cream/50 text-sm">No bookings yet.</p></Card>
      ) : (
        <div className="space-y-2">
          {content.bookings.slice().reverse().map((b) => (
            <Card key={b.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-cream">{b.name}</div>
                  <div className="text-xs text-cream/50">{b.date} · {b.time} · {b.guests} {b.guests === 1 ? "guest" : "guests"}</div>
                </div>
                <button onClick={() => removeBooking(b.id)} className="text-rose-600 hover:text-rose-700" aria-label="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
