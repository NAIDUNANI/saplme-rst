import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// --- Types ---
export type Dish = { id: string; name: string; price: string; rating: number; desc: string; img: string };
export type MenuItem = { id: string; name: string; price: string; desc: string; category: string; veg: boolean };
export type EventItem = { id: string; t: string; d: string; kind: "event" | "offer" };
export type Booking = { id: string; name: string; date: string; time: string; guests: number; createdAt: number };
export type GalleryItem = { id: string; src: string; label: string; alt: string; span: string };

type Content = {
  dishes: Dish[];
  menu: MenuItem[];
  events: EventItem[];
  totalTables: number;
  bookings: Booking[];
  gallery: GalleryItem[];
};

// --- Defaults ---
import d1 from "@/assets/dish-1.jpg";
import d2 from "@/assets/dish-2.jpg";
import d3 from "@/assets/dish-3.jpg";
import d4 from "@/assets/dish-4.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

const dishImages: Record<string, string> = { d1, d2, d3, d4 };
export const dishImageOptions = Object.keys(dishImages);
export const resolveDishImage = (key: string) => {
  if (!key) return dishImages.d1;
  if (key.startsWith("data:") || key.startsWith("http") || key.startsWith("/")) return key;
  return dishImages[key] ?? dishImages.d1;
};
export const resolveImage = resolveDishImage;

export const gallerySpanOptions = [
  { value: "md:col-span-2 md:row-span-2", label: "Large (2x2)" },
  { value: "md:row-span-2", label: "Tall (1x2)" },
  { value: "md:col-span-2", label: "Wide (2x1)" },
  { value: "", label: "Standard (1x1)" },
];

const DEFAULTS: Content = {
  dishes: [
    { id: "1", name: "Truffle Tagliolini", price: "$32", rating: 4.9, desc: "Hand-cut pasta tossed in brown butter, shaved black truffle, parmigiano.", img: "d1" },
    { id: "2", name: "Wagyu Ribeye", price: "$68", rating: 5.0, desc: "Cast-iron seared A5 wagyu, rosemary brown butter, smoked sea salt.", img: "d2" },
    { id: "3", name: "Saffron Scallops", price: "$42", rating: 4.8, desc: "Hokkaido scallops, saffron beurre blanc, microgreens.", img: "d4" },
    { id: "4", name: "Molten Chocolate", price: "$18", rating: 4.9, desc: "70% dark chocolate, raspberry coulis, edible gold leaf.", img: "d3" },
  ],
  menu: [
    { id: "m1", name: "Burrata & Heirloom", price: "$18", desc: "Cream burrata, heirloom tomatoes, basil oil, focaccia crisp.", category: "Starters", veg: true },
    { id: "m2", name: "Tuna Tartare", price: "$22", desc: "Yellowfin, avocado, yuzu kosho, taro chips.", category: "Starters", veg: false },
    { id: "m3", name: "French Onion Soup", price: "$14", desc: "Slow caramelized onions, gruyère crouton.", category: "Starters", veg: true },
    { id: "m4", name: "Truffle Tagliolini", price: "$32", desc: "Hand-cut pasta, black truffle, parmigiano.", category: "Main Course", veg: true },
    { id: "m5", name: "Wagyu Ribeye", price: "$68", desc: "A5 wagyu, rosemary brown butter.", category: "Main Course", veg: false },
    { id: "m6", name: "Pan-Seared Salmon", price: "$36", desc: "Citrus glaze, fennel, dill crème.", category: "Main Course", veg: false },
    { id: "m7", name: "Mushroom Risotto", price: "$28", desc: "Carnaroli rice, wild mushrooms, white wine.", category: "Main Course", veg: true },
    { id: "m8", name: "Molten Chocolate", price: "$18", desc: "70% dark, raspberry coulis, gold leaf.", category: "Desserts", veg: true },
    { id: "m9", name: "Crème Brûlée", price: "$14", desc: "Tahitian vanilla, caramelized sugar crust.", category: "Desserts", veg: true },
    { id: "m10", name: "Vintage Bordeaux", price: "$22", desc: "Glass · Château Margaux 2015.", category: "Beverages", veg: true },
    { id: "m11", name: "Espresso Martini", price: "$16", desc: "Vanilla vodka, fresh espresso, cocoa.", category: "Beverages", veg: true },
    { id: "m12", name: "Aged Whiskey Flight", price: "$28", desc: "Three pours, single malt selection.", category: "Beverages", veg: true },
  ],
  events: [
    { id: "e1", t: "Birthday Celebrations", d: "Custom menus, private rooms, cake service.", kind: "event" },
    { id: "e2", t: "Family Gatherings", d: "Long tables, family-style feasts, warm welcome.", kind: "event" },
    { id: "e3", t: "Corporate Events", d: "Private dining, AV setup, tailored hospitality.", kind: "event" },
    { id: "e4", t: "Off-Site Catering", d: "We bring the kitchen — and the elegance — to you.", kind: "event" },
    { id: "o1", t: "Weekend Brunch", d: "20% off bottomless mimosa pairings, Sat & Sun.", kind: "offer" },
    { id: "o2", t: "Chef's Tasting Combo", d: "5-course tasting + wine flight at $89.", kind: "offer" },
    { id: "o3", t: "Festival Special", d: "Seasonal menu with festive desserts on the house.", kind: "offer" },
    { id: "o4", t: "Loyalty Rewards", d: "Earn points on every visit. Redeem for tastings.", kind: "offer" },
  ],
  totalTables: 24,
  bookings: [],
  gallery: [
    { id: "ga1", src: g1, label: "The Room", alt: "Dining room", span: "md:col-span-2 md:row-span-2" },
    { id: "ga2", src: d2, label: "Wagyu", alt: "Wagyu", span: "" },
    { id: "ga3", src: d4, label: "Scallops", alt: "Scallops", span: "" },
    { id: "ga4", src: g2, label: "The Craft", alt: "Chef plating", span: "md:row-span-2" },
    { id: "ga5", src: d1, label: "Pasta", alt: "Pasta", span: "" },
    { id: "ga6", src: g3, label: "The Bar", alt: "Cocktail", span: "" },
  ],
};

const STORAGE_KEY = "sample_site_content_v2";
const AUTH_KEY = "sample_site_admin_v1";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "maison2026";

type Ctx = {
  isAdmin: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  content: Content;
  setDishes: (d: Dish[]) => void;
  setMenu: (m: MenuItem[]) => void;
  setEvents: (e: EventItem[]) => void;
  setTotalTables: (n: number) => void;
  addBooking: (b: Omit<Booking, "id" | "createdAt">) => void;
  removeBooking: (id: string) => void;
  setGallery: (g: GalleryItem[]) => void;
  resetAll: () => void;
};

const AdminCtx = createContext<Ctx | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<Content>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContent({ ...DEFAULTS, ...JSON.parse(raw) });
      setIsAdmin(localStorage.getItem(AUTH_KEY) === "1");
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); } catch { /* ignore */ }
  }, [content]);

  const value = useMemo<Ctx>(
    () => ({
      isAdmin,
      login: (u, p) => {
        if (u === ADMIN_USER && p === ADMIN_PASS) {
          setIsAdmin(true);
          try { localStorage.setItem(AUTH_KEY, "1"); } catch { /* */ }
          return true;
        }
        return false;
      },
      logout: () => {
        setIsAdmin(false);
        try { localStorage.removeItem(AUTH_KEY); } catch { /* */ }
      },
      content,
      setDishes: (dishes) => setContent((c) => ({ ...c, dishes })),
      setMenu: (menu) => setContent((c) => ({ ...c, menu })),
      setEvents: (events) => setContent((c) => ({ ...c, events })),
      setTotalTables: (totalTables) => setContent((c) => ({ ...c, totalTables })),
      addBooking: (b) =>
        setContent((c) => ({
          ...c,
          bookings: [...c.bookings, { ...b, id: crypto.randomUUID(), createdAt: Date.now() }],
        })),
      removeBooking: (id) =>
        setContent((c) => ({ ...c, bookings: c.bookings.filter((x) => x.id !== id) })),
      setGallery: (gallery) => setContent((c) => ({ ...c, gallery })),
      resetAll: () => setContent(DEFAULTS),
    }),
    [isAdmin, content],
  );

  return <AdminCtx.Provider value={value}>{children}</AdminCtx.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminCtx);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
