"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, addedProductId, handleAddToCart, cardVariants }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="bg-gradient-to-b from-slate-100/10 to-slate-200 border border-slate-100 border-t-2 rounded-[36px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_24px_50px_rgba(8,112,184,0.08)] hover:border-slate-200/60 transition-all duration-500 flex flex-col justify-between group relative z-10"
    >
      {/* Image Container (Nested Frame) */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] w-full border border-slate-100/50 bg-white rounded-[28px] overflow-hidden flex items-center justify-center p-6 cursor-pointer">
          {/* Ambient background glow behind product image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Pulse skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/80 animate-pulse rounded-[28px] z-10" />
          )}

          {/* Badge inside the frame */}
          {product.badge && (
            <span className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-white backdrop-blur-sm border border-slate-200/50 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            className={`object-contain p-6 transition-all duration-500 group-hover:scale-108 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        </div>
      </Link>

      {/* Info Column */}
      <div className="p-3 pt-4 pb-2 space-y-4 flex-grow flex flex-col justify-between z-20">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-orange-500 stroke-orange-500" />
              <span className="text-[10px] font-black text-sky-950">
                {product.rating}
              </span>
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-black text-sky-950 leading-snug group-hover:text-sky-600 transition-colors line-clamp-1 cursor-pointer">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] font-medium text-slate-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          {/* Price Tag */}
          <div className="flex flex-col">
            {product.originalPrice != null && (
              <span className="text-[9px] font-black text-slate-400 line-through leading-none mb-1">
                ₹{Number(product.originalPrice).toFixed(2)}
              </span>
            )}
            <span className="text-base font-black text-sky-950 leading-none">
              ₹{Number(product.price).toFixed(2)}
            </span>
          </div>

          {/* Add To Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart(product)}
            disabled={addedProductId === product.id}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
              addedProductId === product.id
                ? "bg-emerald-600 text-white"
                : "bg-sky-950 hover:bg-orange-500 text-white shadow-sky-950/10"
            }`}
            aria-label="Add to Cart"
          >
            {addedProductId === product.id ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
