"use client";

import { useState, use } from "react";
import { products, categories } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params: paramsPromise }) {
  // Unwrap params using React.use()
  const params = use(paramsPromise);
  const productId = params.id;

  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product in database
  const product = products.find((p) => p.id === productId);
  
  // Find associated category
  const category = categories.find((cat) => cat.id === product?.category);

  // Determine alternate images based on category for realistic gallery display
  const galleryImages = product ? [product.image] : [];
  if (product) {
    if (product.category === "fans") {
      galleryImages.push("/fan1.png", "/fan2.png");
    } else if (product.category === "irons") {
      galleryImages.push(
        "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=400",
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=400"
      );
    } else if (product.category === "water-heaters") {
      galleryImages.push(
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=400",
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=400"
      );
    } else {
      galleryImages.push(
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400"
      );
    }
  }

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-sky-950">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-40 px-6 text-center space-y-6">
          <h1 className="text-3xl font-black text-sky-950">Product Not Found</h1>
          <p className="text-sm font-bold text-sky-850 max-w-md">
            The product with ID "{productId}" could not be located in our catalog.
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

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-sky-950">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Back Navigation Link */}
          <div>
            <Link
              href={category ? `/category/${category.slug}` : "/#categories"}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {category ? category.label : "Collections"}</span>
            </Link>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Product Showcase Multi-Image Frame */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Main Image Box */}
              <div className="relative bg-white border border-sky-100/80 rounded-[40px] p-12 shadow-md flex items-center justify-center min-h-[400px] overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute w-48 h-48 rounded-full bg-orange-500/5 blur-2xl pointer-events-none"></div>

                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-72 flex items-center justify-center"
                >
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={product.name}
                    width={260}
                    height={260}
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-4 justify-start pl-2">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-white border-2 rounded-2xl flex items-center justify-center p-3 overflow-hidden shadow-sm transition-all duration-300 ${
                      selectedImage === index
                        ? "border-orange-500 ring-4 ring-orange-500/10 scale-95"
                        : "border-sky-100 hover:border-sky-300"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} Preview ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-contain max-h-full max-w-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Specifications & Purchasing Panel */}
            <div className="lg:col-span-6 space-y-8 text-left">
              
              {/* Category Tag & Product Name */}
              <div className="space-y-3">
                {category && (
                  <Link
                    href={`/category/${category.slug}`}
                    className="inline-block px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    {category.label}
                  </Link>
                )}
                <h1 className="text-3xl md:text-4xl font-black text-sky-950 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="text-sm font-black text-sky-950 mt-0.5">
                    {product.rating} (Verified Buyer Reviews)
                  </span>
                </div>
              </div>

              {/* Price & Guarantee Banner */}
              <div className="p-6 bg-white border border-sky-100 rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-sky-400 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-3xl font-black text-sky-950">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-wide">
                  Free Shipping in India
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm font-bold text-sky-850 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              {product.specs && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-sky-600">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sky-50/25 border border-sky-100/50 rounded-3xl p-6">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="border-b border-sky-100/40 pb-2 flex justify-between gap-4 text-xs">
                        <span className="text-sky-850 font-bold">{spec.label}</span>
                        <span className="text-sky-950 font-black text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchasing Trigger Button */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                    added
                      ? "bg-emerald-600 text-white shadow-emerald-600/10"
                      : "bg-sky-950 hover:bg-orange-500 text-white shadow-sky-950/10 hover:shadow-orange-500/15"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Added to Shopping Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                      <span>Add Product to Cart</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Highlight Icons Footer */}
              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white border border-sky-100/50 shadow-sm space-y-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-tight text-sky-950">Safety Certified</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white border border-sky-100/50 shadow-sm space-y-2">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-tight text-sky-950">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white border border-sky-100/50 shadow-sm space-y-2">
                  <RotateCcw className="w-5 h-5 text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-tight text-sky-950">10-Day Returns</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
