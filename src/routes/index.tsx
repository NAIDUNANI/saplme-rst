import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { SignatureDishes } from "@/components/site/SignatureDishes";
import { MenuSection } from "@/components/site/MenuSection";
import { Reservation } from "@/components/site/Reservation";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { EventsOffers } from "@/components/site/EventsOffers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sample Site — Fine Dining" },
      {
        name: "description",
        content:
          "Experience authentic flavors crafted with passion at Sample Site. Reserve your table for an unforgettable fine-dining evening.",
      },
      { property: "og:title", content: "Sample Site — Fine Dining" },
      {
        property: "og:description",
        content: "Reserve your table for an unforgettable fine-dining evening at Sample Site.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SignatureDishes />
        <MenuSection />
        <Reservation />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <EventsOffers />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
