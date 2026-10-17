import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFan from "@/components/FeaturedFan";
import Categories from "@/components/Categories";
import Story from "@/components/Story";
import ProductShowcase from "@/components/ProductShowcase";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances | Indivolt",
  description:
    "Official store for Indivolt & Zigma Appliances in India. Shop 5-star energy saving BLDC fans, high-speed wall fans, digital air fryers, instant water heaters, irons & kettles with 1-year brand warranty and free delivery.",
  keywords: [
    "airfryer",
    "air fryer",
    "digital air fryer",
    "zigma air fryer",
    "oil free air fryer",
    "wall fan",
    "wallfan",
    "high speed wall fan",
    "zigma wall fan",
    "oscillating wall fan",
    "bldc fan",
    "bldc ceiling fan",
    "silent bldc fan",
    "energy saving bldc fan",
    "5 star bldc fan",
    "bldc fan with remote",
    "zigma",
    "zigma appliances",
    "zigma products",
    "zigma fan",
    "zigma tiktik",
    "zigma zenith",
    "zigma table fan",
    "zigma geyser",
    "zigma iron",
    "indivolt",
    "indivolt appliances",
    "best appliances india",
  ],
  alternates: {
    canonical: "https://indivoltappliances.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://indivoltappliances.com/",
    siteName: "Indivolt Appliances",
    title: "Indivolt Appliances | Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances",
    description:
      "Official online store for Indivolt & Zigma Appliances. Discover 5-Star BLDC ceiling fans, oscillating wall fans, digital air fryers & instant water heaters with manufacturer guarantee.",
    images: [
      {
        url: "/logo2.png",
        width: 1200,
        height: 630,
        alt: "Indivolt & Zigma Appliances Official Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indivolt Appliances | Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances",
    description:
      "Shop official Zigma BLDC ceiling fans, oscillating wall fans, digital air fryers & water heaters with free shipping across India.",
    images: ["/logo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  const jsonLdHomeProducts = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Zigma & Indivolt Appliances",
    "description": "Top-selling BLDC fans, high-speed wall fans, digital air fryers, and smart home appliances.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Zigma SilentFlow 5-Star BLDC Ceiling Fan",
        "url": "https://indivoltappliances.com/category/fans/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Zigma AeroWave High Speed Wall Fan",
        "url": "https://indivoltappliances.com/category/fans/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "zigma TIKTIK Quiet Portable Table Fan",
        "url": "https://indivoltappliances.com/product/90/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Zigma CrispyAir 5.5L Digital Air Fryer",
        "url": "https://indivoltappliances.com/category/hot-plate/"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "zigma Zenith Air 1200 mm BLDC Ceiling Fan",
        "url": "https://indivoltappliances.com/product/82/"
      }
    ]
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why choose Zigma BLDC fans over conventional ceiling fans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zigma BLDC ceiling fans use high-efficiency Brushless DC motors that consume only 28-32 Watts of power, saving up to 65% on your annual electricity bills compared to standard induction fans. They run silently without humming noises, offer 6-speed remote control, and function seamlessly on inverter backup."
        }
      },
      {
        "@type": "Question",
        "name": "What are the advantages of Zigma high-speed wall fans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zigma wall fans (wallfan) feature 100% pure copper heavy-duty motors delivering up to 2100 RPM air velocity. Equipped with 90-degree automatic horizontal oscillation and dual pull-cord controls, they provide powerful space-saving cooling for kitchens, dining areas, and living rooms."
        }
      },
      {
        "@type": "Question",
        "name": "How does a Zigma digital air fryer promote healthier cooking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Zigma digital air fryer utilizes 360-degree rapid thermal air circulation technology to fry, roast, bake, and grill with up to 85% less oil than traditional deep frying, locking in crispy golden textures while preserving natural nutrients."
        }
      },
      {
        "@type": "Question",
        "name": "How do I claim warranty for Zigma products purchased on Indivolt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All Zigma products come with a minimum 1-year brand replacement warranty. Customers can register their purchase or contact Indivolt customer support directly with their order invoice for doorstep service and hassle-free warranty assistance across India."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-sky-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHomeProducts) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

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

        {/* SEO Category & Keyword Authority Section */}
        <section className="py-20 bg-slate-50 border-t border-sky-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">
                Official Zigma & Indivolt Appliances
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-sky-950">
                Engineering Next-Generation Home Comfort Across India
              </h2>
              <p className="text-sm font-semibold text-sky-800 leading-relaxed">
                From ultra-quiet BLDC fans and heavy-duty oscillating wall fans to rapid digital air fryers and instant water geysers, discover appliances engineered with pure copper durability and smart energy savings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-sky-950">
                  Zigma BLDC Ceiling Fans
                </h3>
                <p className="text-xs font-bold text-sky-800 leading-relaxed">
                  Cut your electricity bills by up to 65% with Zigma Brushless DC (BLDC) technology. Operating at a whisper-silent 28 dB with intelligent remote controls and 5-Star BEE ratings, our BLDC fans deliver high air circulation even on inverter power.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-sky-950">
                  High-Speed Wall Fans (Wallfan)
                </h3>
                <p className="text-xs font-bold text-sky-800 leading-relaxed">
                  Maximize floor space with Zigma high-velocity oscillating wall fans. Featuring aerodynamically balanced aerofoil blades, smooth 90° sweep, and thermal overload protection, they offer instant concentrated cooling for kitchens, shops, and living rooms.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-sky-950">
                  Digital Air Fryers &amp; Kitchen Tech
                </h3>
                <p className="text-xs font-bold text-sky-800 leading-relaxed">
                  Experience guilt-free cooking with Zigma digital air fryers. Utilizing 360° rapid cyclonic heat airflow, achieve mouthwatering crispy textures using up to 85% less oil, supported by one-touch digital presets and easy-clean non-stick baskets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <Faq />
      </main>

      {/* Footer & Watermark */}
      <Footer />
    </div>
  );
}
