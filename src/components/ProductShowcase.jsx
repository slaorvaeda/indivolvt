"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { products } from "@/data/products";
import Link from "next/link";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("all");
  const [addedProductId, setAddedProductId] = useState(null);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "kitchen", label: "Smart Kitchen" },
    { id: "climate", label: "Climate Control" },
    { id: "power", label: "Power & Motors" },
    { id: "utility", label: "Home Utility" },
  ];

  // Dynamically map categories for the homepage showcase tabs
  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => {
        if (activeTab === "kitchen") return ["mixers", "kettles", "hot-plate"].includes(p.category);
        if (activeTab === "climate") return ["fans", "room-heaters", "water-heaters"].includes(p.category);
        if (activeTab === "power") return ["motors"].includes(p.category);
        if (activeTab === "utility") return ["water-pump", "irons"].includes(p.category);
        return false;
      });

  const handleAddToCart = (id) => {
    setAddedProductId(id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <section id="products" className="py-24 bg-white overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sky-100 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-orange-500"></div>
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">
                Showcase
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950">
              Engineering Masterpieces
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-full text-xs font-black transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/10"
                    : "bg-sky-50 text-sky-850 hover:bg-sky-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-sky-50/10 border border-sky-100 rounded-[32px] p-5 hover:shadow-xl hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Badge */}
                  {prod.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {prod.badge}
                    </span>
                  )}

                  {/* Product Image Frame */}
                  <Link href={`/product/${prod.id}`}>
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-6 border border-sky-50/50 cursor-pointer">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        width={160}
                        height={160}
                        className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>

                  {/* Info Panel */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                        <span className="text-xs font-black text-sky-950">
                          {prod.rating}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-sky-650 uppercase tracking-widest">
                        {prod.category}
                      </span>
                    </div>

                    <Link href={`/product/${prod.id}`}>
                      <h3 className="text-lg font-black text-sky-950 group-hover:text-sky-600 transition-colors line-clamp-1 cursor-pointer">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-bold text-sky-850 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-sky-100/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-sky-950">
                      ₹{prod.price.toFixed(2)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-sky-400 line-through font-bold">
                        ₹{prod.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(prod.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      addedProductId === prod.id
                        ? "bg-emerald-600 text-white"
                        : "bg-sky-600 text-white hover:bg-orange-500"
                    }`}
                    aria-label="Add to Cart"
                  >
                    {addedProductId === prod.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
