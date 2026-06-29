"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Categories() {
  // 9 Circular Categories
  const categories = [
    {
      name: "Irons",
      image: "/catogeries/irons.png",
      link: "/category/irons",
    },
    {
      name: "Fans",
      image: "/catogeries/fan.png",
      link: "/category/fans",
    },
    {
      name: "Water Heaters",
      image: "/catogeries/waterheeter.avif",
      link: "/category/water-heaters",
    },
    {
      name: "Kettles",
      image: "/catogeries/Kettles.png",
      link: "/category/kettles",
    },
    {
      name: "Room Heaters",
      image: "/catogeries/Room Heaters.png",
      link: "/category/room-heaters",
    },
    {
      name: "Industrial Motors",
      image: "/catogeries/Industrial Motors.png",
      link: "/category/motors",
    },
    {
      name: "Mixers",
      image: "/catogeries/Mixers.png",
      link: "/category/mixers",
    },
    {
      name: "Hot Plate",
      image: "/catogeries/Hot Plate.png",
      link: "/category/hot-plate",
    },
    {
      name: "Water Pump",
      image: "/catogeries/pump.png",
      link: "/category/water-pump",
    },
  ];

  // 4 Featured Collection Cards (Scooped Notch Corner)
  const featuredCollections = [
    {
      id: "kitchen",
      title: "Smart Kitchen",
      count: "18 Products",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800",
      link: "#products",
    },
    {
      id: "climate",
      title: "Climate Control",
      count: "12 Products",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
      link: "#products",
    },
    {
      id: "power",
      title: "Power & Switches",
      count: "24 Products",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
      link: "#products",
    },
    {
      id: "utility",
      title: "Home Utility",
      count: "14 Products",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
      link: "#products",
    },
  ];

  return (
    <section id="categories" className="py-24 bg-[#f8fafc] overflow-hidden border-b border-sky-100 space-y-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="h-[2px] w-8 bg-sky-600"></div>
              <span className="text-xs font-black uppercase tracking-widest text-sky-600">
                Collections
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950">
              Explore Our Categories
            </h2>
          </div>
          <p className="max-w-md text-sm text-sky-850 font-bold leading-relaxed">
            Engineered for high efficiency, durability, and safety. Select a category below to browse our flagship models.
          </p>
        </div>

        {/* Circular Categories Row */}
        <div className="flex overflow-x-auto pb-6 pt-2 md:pb-0 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-9 gap-4 md:gap-6 justify-start md:justify-center border-b border-sky-100/50 pb-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex-shrink-0 flex flex-col items-center group w-28 md:w-auto"
            >
              <Link href={cat.link} className="flex flex-col items-center focus:outline-none">
                {/* Image Circle Container */}
                <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-orange-500 shadow-md border border-sky-100/50 flex items-center justify-center p-3 transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-lg group-hover:shadow-orange-500/10 group-hover:scale-105 relative overflow-hidden">
                  
                  {/* Subtle color highlight behind */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-50 to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image wrapper */}
                  <div className="w-full h-full rounded-full relative overflow-hidden bg-sky-50/40 p-1 flex items-center justify-center">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={80}
                      height={80}
                      className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Text Label */}
                <span className="text-xs sm:text-sm font-black text-sky-950 text-center mt-3.5 group-hover:text-orange-500 transition-colors duration-250 tracking-tight leading-snug break-words max-w-[100px]">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Categories Grid (Scooped Notch Cards) */}
        <div className="space-y-8 pt-8">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-sky-950 uppercase tracking-wider pl-1">
              Featured Collections
            </h3>
            <p className="text-xs font-bold text-sky-850 pl-1">
              Browse consolidated setups tailored for your home and utility spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollections.map((col, index) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-[420px] bg-white rounded-[40px] p-6 flex flex-col justify-between shadow-md border border-sky-100/50 hover:border-sky-500/10 transition-all duration-300"
              >
                {/* Content Wrapper */}
                <div className="space-y-4">
                  {/* Product Image Frame */}
                  <div className="relative w-full h-44 overflow-hidden rounded-[28px] bg-sky-50">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 to-transparent"></div>
                  </div>

                  {/* Typography info */}
                  <div className="space-y-1 pl-1">
                    <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
                      {col.count}
                    </span>
                    <h3 className="text-2xl font-black text-sky-950 leading-tight">
                      {col.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom Left Branding */}
                <div className="flex items-center gap-1.5 pl-1 opacity-60 pb-2">
                  <div className="w-5 h-5 rounded-md overflow-hidden relative border border-sky-100">
                    <Image
                      src="/logo.jpg"
                      alt="Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[8px] font-black tracking-widest uppercase text-sky-900">
                    Indivolt
                  </span>
                </div>

                {/* The Scoop Notch Corner (Bottom Right) */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#f8fafc] rounded-tl-[40px] rounded-br-[40px]">
                  {/* Inverted curves via box-shadow */}
                  <div className="inverted-radius-top"></div>
                  <div className="inverted-radius-left"></div>

                  {/* The Circular Arrow Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href={col.link}
                      className="w-[72px] h-[72px] bg-sky-50 group-hover:bg-orange-500 text-sky-900 group-hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105"
                    >
                      <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
