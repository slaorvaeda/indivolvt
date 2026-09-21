import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFan from "@/components/FeaturedFan";
import Categories from "@/components/Categories";
import Story from "@/components/Story";
import ProductShowcase from "@/components/ProductShowcase";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Indivolt Appliances | Official Store for Zigma Home Appliances",
  description:
    "Welcome to Indivolt Appliances, the official home of Zigma premium silent BLDC fans, smart water heaters, room heaters, irons, kettles, and kitchen solutions.",
  keywords: "Indivolt, Indivolt Appliances, Zigma, Zigma Appliances, home appliances, kitchen appliances, smart switches, smart electricals, energy efficient, silent motors",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-sky-950">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Featured Fan Spotlight */}
        <FeaturedFan />

        {/* Categories Showcase */}
        <Categories />

        {/* Legacy / Story / Innovation Tabs */}
        <Story />

        {/* Filterable Products List */}
        <ProductShowcase />

        {/* FAQ Accordion */}

        <Faq />
      </main>

      {/* Footer & Watermark */}
      <Footer />
    </div>
  );
}
