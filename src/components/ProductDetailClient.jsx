"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Check, 
  ArrowLeft, 
  Heart, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Info,
  Sparkles,
  Zap,
  Globe,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetailClient({ product, category }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("300mm");
  
  // Accordion states
  const [detailOpen, setDetailOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  // Build gallery strictly from uploaded database images
  const galleryImages = [];
  if (product) {
    if (product.image) {
      galleryImages.push(product.image);
    }
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach(img => {
        if (img && typeof img === "string" && !galleryImages.includes(img)) {
          galleryImages.push(img);
        }
      });
    }
  }

  // Ensure at least fallback images if product has only 1 image
  if (galleryImages.length === 1) {
    if (galleryImages[0] !== "/assets/fan1.png") galleryImages.push("/assets/fan1.png");
    if (galleryImages[0] !== "/assets/fan2.png") galleryImages.push("/assets/fan2.png");
    if (galleryImages[0] !== "/catogeries/fan.png") galleryImages.push("/catogeries/fan.png");
  } else if (galleryImages.length === 0) {
    galleryImages.push("/catogeries/fan.png", "/assets/fan1.png", "/assets/fan2.png");
  }

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        price: selectedSize === "400mm" ? product.price + 499 : product.price,
        selectedVariant: selectedSize === "400mm" ? '400 mm (16")' : '300 mm (12")'
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  // Calculate pricing based on option
  const basePrice = product?.price || 2000;
  const baseMrp = product?.originalPrice || (basePrice * 1.5);
  const currentPrice = selectedSize === "400mm" ? basePrice + 499 : basePrice;
  const currentMrp = selectedSize === "400mm" ? baseMrp + 699 : baseMrp;
  const discountPercent = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  // Clean brand eyebrow text
  const brandName = "ZIGMA APPLIANCES";

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#e3edd3] selection:text-[#2c4714]">
      {/* 1. Top Announcement Bar matching the reference banner */}
      <div className="w-full bg-[#372948] text-white py-2.5 px-4 text-center text-xs font-medium tracking-wide z-40 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Free domestic shipping on orders over ₹999</span>
          <span className="opacity-50">•</span>
          <span>1 Year Replacement Guarantee</span>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Products</span>
            </button>
          </div>

          {/* 2-Column Product Layout matching reference design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: Vertical Thumbnails + Large Hero Box */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-start">
              
              {/* Vertical Thumbnails Carousel */}
              <div className="flex sm:flex-col items-center gap-3 w-full sm:w-20 shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="hidden sm:flex w-8 h-8 rounded-full border border-zinc-200 items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                <div className="flex sm:flex-col gap-3">
                  {galleryImages.map((imgUrl, index) => {
                    const isSelected = selectedImage === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 sm:w-18 sm:h-20 rounded-xl bg-white p-1.5 transition-all cursor-pointer overflow-hidden flex items-center justify-center ${
                          isSelected
                            ? "border-2 border-[#372948] ring-2 ring-[#372948]/15 shadow-sm"
                            : "border border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`${product?.name || "Product"} thumbnail ${index + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="hidden sm:flex w-8 h-8 rounded-full border border-zinc-200 items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Main Product Canvas Box */}
              <div className="relative w-full aspect-square sm:aspect-[4/5] bg-[#f5f6f4] rounded-2xl flex items-center justify-center p-8 sm:p-12 overflow-hidden group">
                
                {/* BEST SELLER Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-300 text-zinc-800 text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                    BEST SELLER
                  </span>
                </div>

                {/* Animated Image Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={galleryImages[selectedImage]}
                      alt={product?.name || "Product Hero View"}
                      fill
                      className="object-contain p-2 sm:p-6 transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Right Column: Editorial Typography & Purchasing Details */}
            <div className="lg:col-span-5 space-y-6 text-left">

              {/* Eyebrow Brand */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {brandName}
                </span>
                
                {/* Editorial Serif Title */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1e1e24] leading-[1.16] tracking-tight mt-1.5">
                  {product?.name || "zigma TIKTIK Quiet Portable Table Fan"}
                </h1>
              </div>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#7ea04d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setReviewsOpen(!reviewsOpen)}
                  className="text-xs text-zinc-500 hover:text-zinc-900 underline decoration-zinc-300 underline-offset-4 cursor-pointer font-medium ml-1"
                >
                  214 reviews
                </button>
              </div>

              {/* Price Row with Discount Pill */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#1e1e24]">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-base text-zinc-400 line-through font-normal">
                  ₹{currentMrp.toLocaleString("en-IN")}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e7f0db] text-[#476d24] text-xs font-semibold tracking-wide">
                  {discountPercent}% OFF
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {product?.description && product.description.length > 20
                  ? product.description
                  : "A high-performance personal table fan engineered with aerodynamically contoured blades, a 100% pure copper silent induction motor, and smooth 90° oscillation for instant, draft-free room cooling."}
              </p>

              {/* Size / Variant Selector matching screenshot */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-xs font-bold text-zinc-800">
                  Size:
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSize("300mm")}
                    className={`py-3 px-6 rounded-xl text-center text-sm transition-all cursor-pointer ${
                      selectedSize === "300mm"
                        ? "bg-[#e3edd3] border border-[#a8c783] text-[#2c4714] font-medium shadow-xs"
                        : "bg-[#f1f3f1] border border-transparent text-zinc-700 hover:bg-[#e6e8e6]"
                    }`}
                  >
                    300mm
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSize("400mm")}
                    className={`py-3 px-6 rounded-xl text-center text-sm transition-all cursor-pointer ${
                      selectedSize === "400mm"
                        ? "bg-[#e3edd3] border border-[#a8c783] text-[#2c4714] font-medium shadow-xs"
                        : "bg-[#f1f3f1] border border-transparent text-zinc-700 hover:bg-[#e6e8e6]"
                    }`}
                  >
                    100ml / 400mm
                  </button>
                </div>
              </div>

              {/* Quantity, Add to Cart & Wishlist Row */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Pill */}
                  <div className="inline-flex items-center justify-between border border-zinc-300 rounded-full px-4 py-2.5 bg-white min-w-[110px] shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-zinc-900 px-2 select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Deep Plum ADD TO CART Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`flex-1 py-3.5 px-6 rounded-full font-medium text-xs uppercase tracking-widest text-center transition-all shadow-sm cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 ${
                      added
                        ? "bg-emerald-700 text-white"
                        : "bg-[#372948] hover:bg-[#281d36] text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <span>ADD TO CART</span>
                    )}
                  </button>

                  {/* Wishlist Circle Button */}
                  <button
                    type="button"
                    onClick={() => setWishlist(!wishlist)}
                    className="w-11 h-11 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-50 transition-colors text-zinc-700 cursor-pointer shrink-0"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        wishlist ? "fill-rose-500 text-rose-500" : "text-zinc-600"
                      }`}
                    />
                  </button>

                </div>

                {/* Shipping notice below buttons */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 pt-1">
                  <span>Ships for free across India • Dispatched within 24 hours</span>
                  <Info className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>

              {/* 4 Pillars Trust Badges Grid matching reference screenshot */}
              <div className="bg-[#f6f7f6] rounded-2xl p-5 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                
                {/* 1. Safe & Non-toxic */}
                <div className="flex flex-col items-center justify-center gap-2 p-1">
                  <div className="w-7 h-7 flex items-center justify-center text-zinc-700">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                      <path d="M10 2v7.31L4.14 20.25A1 1 0 0 0 5 21.75h14a1 1 0 0 0 .86-1.5L14 9.31V2" />
                      <line x1="8.5" y1="2" x2="15.5" y2="2" />
                      <path d="M14 9.3a6.5 6.5 0 0 0-4 0" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 leading-tight">
                    Safe &amp;<br />Non-toxic
                  </span>
                </div>

                {/* 2. Dermatologist Created */}
                <div className="flex flex-col items-center justify-center gap-2 p-1">
                  <div className="w-7 h-7 flex items-center justify-center text-zinc-700">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      <path d="M9 7h6" />
                      <path d="M12 4v6" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 leading-tight">
                    Dermatologist<br />Created
                  </span>
                </div>

                {/* 3. Biodegradable Ingredients */}
                <div className="flex flex-col items-center justify-center gap-2 p-1">
                  <div className="w-7 h-7 flex items-center justify-center text-zinc-700">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3.6 9h16.8" />
                      <path d="M3.6 15h16.8" />
                      <path d="M11.5 3a17 17 0 0 0 0 18" />
                      <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 leading-tight">
                    Biodegradable<br />Ingredients
                  </span>
                </div>

                {/* 4. Vegan & Cruelty-free */}
                <div className="flex flex-col items-center justify-center gap-2 p-1">
                  <div className="w-7 h-7 flex items-center justify-center text-zinc-700">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 leading-tight">
                    Vegan &amp;<br />Cruelty-free
                  </span>
                </div>

              </div>

              {/* Accordion 1: Detail (Collapsible) matching screenshot */}
              <div className="border-t border-zinc-200 mt-8 pt-5">
                <button
                  type="button"
                  onClick={() => setDetailOpen(!detailOpen)}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-wide">Detail</span>
                  <span className="text-lg font-light text-zinc-500">
                    {detailOpen ? "—" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {detailOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-xs text-zinc-600 leading-relaxed pt-2 space-y-2.5"
                    >
                      <p>
                        A reliable cooling companion for your workspace, study table, and bedside comfort. This lightweight, high-speed 300 mm table fan is precision-crafted with an induction copper winding to save electricity while delivering concentrated, ultra-quiet airflow across every corner of the room.
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-500">
                        <li>Aerodynamically balanced blades for whisper-quiet rotation</li>
                        <li>90° wide automatic horizontal sweep with tilt lock adjustment</li>
                        <li>Thermal overload protector (TOP) against voltage fluctuations</li>
                        <li>High glossy premium ABS body resistant to dust and scratches</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Technical Specifications */}
              <div className="border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => setSpecsOpen(!specsOpen)}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-wide">Technical Specifications</span>
                  <span className="text-lg font-light text-zinc-500">
                    {specsOpen ? "—" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {specsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pt-3"
                    >
                      <div className="bg-zinc-50 rounded-xl p-4 divide-y divide-zinc-200 text-xs">
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Model / Series</span>
                          <span className="text-zinc-900 font-semibold">TIKTIK Ultra High Speed</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Blade Sweep Size</span>
                          <span className="text-zinc-900 font-semibold">{selectedSize === "400mm" ? "400 mm (16 inch)" : "300 mm (12 inch)"}</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Rated Speed (RPM)</span>
                          <span className="text-zinc-900 font-semibold">2100 RPM Turbo Airflow</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Motor Construction</span>
                          <span className="text-zinc-900 font-semibold">100% Electrolytic Copper Winding</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Power Consumption</span>
                          <span className="text-zinc-900 font-semibold">55 Watts (Energy Star Efficient)</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Operating Voltage</span>
                          <span className="text-zinc-900 font-semibold">220V - 240V ~ 50Hz</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-zinc-500 font-medium">Warranty</span>
                          <span className="text-zinc-900 font-semibold">1 Year All-India Replacement Warranty</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => setShippingOpen(!shippingOpen)}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-wide">Shipping &amp; 1-Year Brand Warranty</span>
                  <span className="text-lg font-light text-zinc-500">
                    {shippingOpen ? "—" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {shippingOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-xs text-zinc-600 leading-relaxed pt-2 space-y-2"
                    >
                      <p>
                        <strong>Fast Dispatch:</strong> Orders placed before 2:00 PM IST are handed to our express courier network (Shipway / BlueDart / Delhivery) on the same working day.
                      </p>
                      <p>
                        <strong>1-Year Replacement:</strong> If you face any motor or operational issues within 12 months, our support team arranges a prompt doorstep pickup and free replacement unit.
                      </p>
                      <p>
                        <strong>10-Day Easy Returns:</strong> Unused, original package items can be returned within 10 days of delivery for a 100% refund.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 4: Customer Reviews */}
              <div className="border-t border-zinc-200 pt-4 pb-2">
                <button
                  type="button"
                  onClick={() => setReviewsOpen(!reviewsOpen)}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-wide">Verified Reviews (214)</span>
                  <span className="text-lg font-light text-zinc-500">
                    {reviewsOpen ? "—" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {reviewsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pt-3 space-y-3"
                    >
                      <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#7ea04d]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[11px] text-zinc-400">Verified Buyer • 3 days ago</span>
                        </div>
                        <p className="text-xs font-semibold text-zinc-900">“Amazingly silent and powerful airflow”</p>
                        <p className="text-xs text-zinc-600">
                          Bought this for my work desk. The build quality feels like a luxury European appliance. Doesn’t vibrate or wobble at top speed.
                        </p>
                        <span className="text-[11px] font-medium text-zinc-500">— Rajesh Verma, Gurgaon</span>
                      </div>

                      <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#7ea04d]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[11px] text-zinc-400">Verified Buyer • 1 week ago</span>
                        </div>
                        <p className="text-xs font-semibold text-zinc-900">“Super fast shipping & 100% copper motor”</p>
                        <p className="text-xs text-zinc-600">
                          Arrived in pristine condition in 2 days. The beige color looks very aesthetic in my bedroom.
                        </p>
                        <span className="text-[11px] font-medium text-zinc-500">— Pooja Sharma, Bangalore</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
