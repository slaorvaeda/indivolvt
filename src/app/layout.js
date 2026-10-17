import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://indivoltappliances.com"),
  title: {
    default: "Indivolt Appliances | Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances",
    template: "%s | Indivolt - Official Zigma Appliances Store",
  },
  description:
    "Official online store for Indivolt & Zigma Appliances. Shop India's top-rated energy-saving BLDC fans, high-speed wall fans, digital air fryers, instant water heaters, dry & steam irons, electric kettles, and room heaters with manufacturer warranty and free delivery across India.",
  keywords: [
    "airfryer",
    "air fryer",
    "digital air fryer",
    "zigma air fryer",
    "oil free air fryer",
    "airfryer price india",
    "best air fryer in india",
    "wall fan",
    "wallfan",
    "high speed wall fan",
    "zigma wall fan",
    "oscillating wall fan",
    "wall mounted fan",
    "wall fan with remote",
    "bldc fan",
    "bldc ceiling fan",
    "silent bldc fan",
    "energy saving bldc fan",
    "5 star bldc fan",
    "bldc fan with remote",
    "bldc table fan",
    "zigma",
    "zigma appliances",
    "zigma products",
    "zigma fan",
    "zigma tiktik",
    "zigma zenith",
    "zigma table fan",
    "zigma ceiling fan",
    "zigma water heater",
    "zigma iron",
    "zigma electric kettle",
    "zigma room heater",
    "indivolt",
    "indivolt appliances",
    "indivolt official store",
    "home appliances india",
    "kitchen appliances india"
  ],
  authors: [{ name: "Indivolt Appliances" }],
  creator: "Indivolt Appliances",
  publisher: "Indivolt Appliances",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://indivoltappliances.com",
    siteName: "Indivolt Appliances",
    title: "Indivolt Appliances | Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances",
    description:
      "Explore official Zigma Appliances: 5-Star BLDC ceiling fans, heavy-duty wall fans, digital air fryers, instant water geysers & premium kitchen solutions with 100% manufacturer warranty.",
    images: [
      {
        url: "/logo2.png",
        width: 1200,
        height: 630,
        alt: "Indivolt & Zigma Home Appliances Official Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indivolt Appliances | Buy Zigma BLDC Fans, Wall Fans, Air Fryers & Home Appliances",
    description:
      "Shop official Zigma BLDC ceiling fans, oscillating wall fans, digital air fryers & instant water heaters. Free shipping across India.",
    images: ["/logo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Home & Kitchen Appliances",
};

export default function RootLayout({ children }) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Indivolt Appliances",
    "alternateName": ["Indivolt", "Zigma Appliances", "Zigma Home Appliances"],
    "url": "https://indivoltappliances.com",
    "logo": "https://indivoltappliances.com/logo2.png",
    "description": "Official online store and distributor for Zigma BLDC fans, high-speed wall fans, digital air fryers, water heaters, irons, and home appliances in India.",
    "brand": {
      "@type": "Brand",
      "name": "Zigma"
    },
    "sameAs": [
      "https://facebook.com/indivoltappliances",
      "https://instagram.com/indivoltappliances"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9999999999",
      "contactType": "Customer Support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Indivolt Appliances",
    "url": "https://indivoltappliances.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://indivoltappliances.com/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
