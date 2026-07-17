import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFan from "@/components/FeaturedFan";
import Categories from "@/components/Categories";
import Story from "@/components/Story";
import ProductShowcase from "@/components/ProductShowcase";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Indivolt | Premium Home Appliances & Smart Electricals",
  description:
    "Experience appliances with a soul, engineered for generations. Browse premium silent BLDC induction systems, smart air purifiers, robust grids, and energy-saving switches.",
  keywords: "home appliances, kitchen appliances, smart switches, smart electricals, energy efficient, silent motors, Indivolt",
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
