"use client";

import { useState, use } from "react";
import { products, categories } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage({ params: paramsPromise }) {
  // Unwrap params using React.use()
  const params = use(paramsPromise);
  const slug = params.slug;

  const [addedProductId, setAddedProductId] = useState(null);

  // Find current category
  const category = categories.find((cat) => cat.slug === slug);
  
  // Filter products matching this category
  const filteredProducts = products.filter((prod) => prod.category === category?.id);

  const handleAddToCart = (id) => {
    setAddedProductId(id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-sky-950">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-40 px-6 text-center space-y-6">
          <h1 className="text-3xl font-black text-sky-950">Category Not Found</h1>
          <p className="text-sm font-bold text-sky-850 max-w-md">
            The category slug "{slug}" doesn't exist or has been relocated.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-full text-xs font-black text-white bg-orange-500 hover:bg-sky-600 transition-colors shadow-md"
          >
            Return to Homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Animation variants for staggered product cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-sky-950">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] pb-24">
        
        {/* Full-Width Category Hero Banner */}
        <div className="relative w-full bg-gradient-to-r from-sky-950 via-sky-900 to-orange-500/20 overflow-hidden border-b border-sky-900/30">
          
          {/* Animated Ambient background decoration circles */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.8, 0.6],
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute right-1/4 top-10 w-40 h-40 rounded-full bg-sky-500/10 blur-2xl pointer-events-none"
          />

          {/* Centered Content Wrapper (Constrained to standard grid boundaries) */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Heading and description with staggered slide-ins */}
            <div className="space-y-6 text-left">
              {/* Back Navigation Link */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/#categories"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Collections</span>
                </Link>
              </motion.div>

              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-[2px] w-6 bg-orange-400"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    Collection
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-4xl md:text-5xl font-black text-white leading-tight"
                >
                  {category.label}
                </motion.h1>
              </div>
              
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-sm font-bold text-sky-100/90 leading-relaxed max-w-md"
              >
                Discover Zigma's high-efficiency {category.label.toLowerCase()} collection. Engineered with top-notch craftsmanship, robust electrical safety standards, and elegant aesthetics to fit modern residences perfectly.
              </motion.p>
            </div>

            {/* Right Column: Category image with floating physics animation */}
            <div className="flex justify-center md:justify-end h-64 md:h-72 relative">
              {/* Glowing ring backdrop */}
              <div className="absolute inset-0 m-auto w-52 h-52 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm shadow-inner flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-orange-500/10 blur-md"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                className="relative z-10 w-full h-full flex items-center justify-center md:justify-end"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </div>

          </div>
        </div>

        {/* Product Grid Area (Constrained to standard grid boundaries) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-sky-100 rounded-3xl p-12 text-center space-y-4 shadow-sm">
              <h3 className="text-xl font-black text-sky-950">No Products Available</h3>
              <p className="text-xs font-bold text-sky-850">
                We're currently updating our catalog. Check back soon for new {category.label.toLowerCase()} models!
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group hover:border-orange-500/10 hover:shadow-xl transition-all duration-300 relative"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-orange-500 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Image Container */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-full h-64 bg-sky-50/50 flex items-center justify-center p-8 overflow-hidden border-b border-sky-100/50 cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={180}
                        height={180}
                        className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                      />
                    </div>
                  </Link>

                  {/* Info Column */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                        <span className="text-xs font-black text-sky-950 mt-0.5">
                          {product.rating}
                        </span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-black text-sky-950 leading-snug group-hover:text-orange-500 transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs font-bold text-sky-850 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-sky-100/50 flex items-center justify-between gap-4">
                      {/* Price Tag */}
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-sky-400 line-through">
                          ₹{product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xl font-black text-sky-950">
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Add To Cart */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAddToCart(product.id)}
                        disabled={addedProductId === product.id}
                        className={`px-5 py-3 rounded-full text-xs font-black transition-all duration-305 flex items-center gap-1.5 shadow-md ${
                          addedProductId === product.id
                            ? "bg-emerald-600 text-white shadow-emerald-600/10 scale-95"
                            : "bg-sky-950 hover:bg-orange-500 text-white shadow-sky-950/10 hover:shadow-orange-500/15 hover:-translate-y-0.5"
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
