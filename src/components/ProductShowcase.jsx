"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/utils/api";
import { useCartStore } from "@/store/useCartStore";
import ProductCard from "@/components/ProductCard";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("all");
  const [addedProductId, setAddedProductId] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const prods = await getProducts();
      const mapped = prods.map((prod) => ({
        id: String(prod.id),
        category: prod.category?.toLowerCase() || "products",
        name: prod.name,
        price: prod.price,
        originalPrice: prod.mrp,
        badge: prod.metadata?.badge || null,
        image: prod.imageUrl,
        rating: prod.metadata?.rating || 5.0,
        description: prod.description,
      }));
      setDbProducts(mapped);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "kitchen", label: "Smart Kitchen" },
    { id: "climate", label: "Climate Control" },
    { id: "power", label: "Power & Motors" },
    { id: "utility", label: "Home Utility" },
  ];

  // Dynamically map categories for the homepage showcase tabs
  const filteredProducts =
    activeTab === "all"
      ? dbProducts
      : dbProducts.filter((p) => {
          if (activeTab === "kitchen") return ["mixers", "kettles", "hot-plate"].includes(p.category);
          if (activeTab === "climate") return ["fans", "room-heaters", "water-heaters"].includes(p.category);
          if (activeTab === "power") return ["motors"].includes(p.category);
          if (activeTab === "utility") return ["water-pump", "irons"].includes(p.category);
          return false;
        });

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
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

        {/* Product Grid (4 columns in a row) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-slate-50 border border-slate-100 rounded-[36px] p-3 space-y-4 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-200/70 rounded-[28px]" />
                <div className="p-3 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="w-9 h-9 bg-slate-200 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  addedProductId={addedProductId}
                  handleAddToCart={handleAddToCart}
                  cardVariants={cardVariants}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
