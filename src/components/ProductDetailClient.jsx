"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
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
  ChevronUp, 
  ChevronDown, 
  Info,
  Sparkles,
  Zap,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

// Helper: Intelligent category/product description fallback
function getProductDescription(product, category) {
  if (product?.description && product.description.trim().length > 20) {
    return product.description.trim();
  }
  const name = (product?.name || "").toLowerCase();
  const cat = (product?.category || category?.label || "").toLowerCase();

  if (cat.includes("fan") || name.includes("fan")) {
    if (name.includes("table") || name.includes("tiktik")) {
      return "The Zigma TIKTIK Quiet Portable Table Fan (300 mm) delivers concentrated, whisper-quiet personal cooling with aerodynamically contoured blades, a 100% pure copper induction motor, and smooth 90° oscillation for instant, draft-free room comfort.";
    }
    if (name.includes("bldc") || name.includes("ceiling")) {
      return "The Zigma 5-Star BLDC Ceiling Fan combines ultra-energy-saving brushless DC motor technology with whisper-quiet operation and aerodynamically balanced blades, saving up to 65% on electricity bills.";
    }
    if (name.includes("wall")) {
      return "The Zigma AeroWave High-Speed Wall Fan provides heavy-duty, space-saving wall-mounted cooling. Equipped with 100% copper winding, wide horizontal sweep, and convenient pull-cord speed control.";
    }
    return "Engineered with a high-durability 100% pure copper motor and aerodynamically contoured blades for powerful air circulation, silent operation, and long-lasting energy efficiency.";
  }

  if (cat.includes("pump")) {
    return "High-performance domestic and agricultural water pump designed for high discharge, sustained pressure, and continuous duty cycles. Features a 100% copper wound motor with thermal overload protection and anti-rust coated impeller.";
  }

  if (cat.includes("heater") || cat.includes("geyser")) {
    return "Engineered for rapid water heating and maximum heat retention, featuring a heavy-gauge corrosion-resistant inner tank, high-efficiency Incoloy heating element, and multi-tier safety thermal cutouts.";
  }

  if (cat.includes("iron")) {
    return "Equipped with a scratch-resistant non-stick soleplate and uniform thermal distribution for effortless crease removal, smooth gliding, and fabric-safe temperature regulation.";
  }

  if (cat.includes("mixer") || cat.includes("blender")) {
    return "High-torque mixer grinder powered by a heavy-duty copper motor and razor-sharp stainless steel blades, ideal for fine dry grinding, wet chutney making, and effortless blending.";
  }

  if (cat.includes("kettle")) {
    return "Modern electric kettle with rapid boiling technology, 304 food-grade stainless steel interior, automatic shut-off, and boil-dry protection for daily convenience.";
  }

  if (cat.includes("hot-plate") || cat.includes("plate") || cat.includes("cooker")) {
    return "Advanced flameless cooking plate featuring precision temperature control, uniform thermal distribution, and durable scratch-resistant crystal glass.";
  }

  if (cat.includes("motor")) {
    return "Heavy-duty industrial electric motor with 100% electrolytic copper winding, Class F insulation, high starting torque, and continuous duty reliability.";
  }

  return `Official genuine ${product?.name || "Zigma appliance"} by Zigma Appliances. Built with high-grade components, verified energy efficiency, and a 1-year brand warranty.`;
}

// Helper: Category-specific feature bullets
function getProductBullets(product, category) {
  const cat = (product?.category || category?.label || "").toLowerCase();
  const name = (product?.name || "").toLowerCase();

  if (cat.includes("fan") || name.includes("fan")) {
    return [
      "100% electrolytic pure copper winding motor for extended operational life",
      "Aerodynamically balanced blades engineered for whisper-quiet high-velocity airflow",
      "Smooth 90° automatic horizontal oscillation with adjustable tilt head mechanism",
      "Thermal overload protector (TOP) protects the motor against voltage fluctuations",
      "High-gloss premium impact-resistant ABS body resistant to dust and scratches",
    ];
  }

  if (cat.includes("pump")) {
    return [
      "High-discharge, high-head impeller design for uniform water pressure across multiple floors",
      "100% copper wound induction motor with thermal overload protector (TOP)",
      "Corrosion-resistant heavy-duty housing for long outdoor operational lifespan",
      "Energy-saving class-F insulation for reliable performance during voltage fluctuations",
    ];
  }

  if (cat.includes("heater") || cat.includes("geyser")) {
    return [
      "Heavy-gauge titanium enamel / glass-lined inner tank resistant to corrosion and hard water",
      "High-efficiency Incoloy heating element for rapid and sustained hot water supply",
      "Multi-tier safety protection: capillary thermostat, thermal cutout, and pressure release valve",
      "High-density CFC-free PUF insulation for maximum heat retention and minimal electricity use",
    ];
  }

  if (cat.includes("iron")) {
    return [
      "Non-stick scratch-resistant ceramic soleplate for smooth, snag-free fabric gliding",
      "Precision adjustable temperature dial calibrated for cotton, silk, wool, and synthetics",
      "Thermal fuse safety shutoff protects against electrical overheating",
      "Ergonomic lightweight design with 360° flexible swivel power cord",
    ];
  }

  if (cat.includes("mixer") || cat.includes("blender")) {
    return [
      "Heavy-duty pure copper high-torque motor for tough spices, batter, and blending",
      "Razor-sharp 304 food-grade stainless steel blades for fine, consistent texture",
      "Overload protection breaker prevents motor burnout under heavy loads",
      "Anti-skid rubber suction feet provide vibration-free countertop stability",
    ];
  }

  if (cat.includes("kettle")) {
    return [
      "Food-grade 304 stainless steel heating plate with fast rapid-boil performance",
      "Auto shut-off sensor with boil-dry safety protection",
      "Cool-touch ergonomic handle with 360° cordless swivel base",
      "Concealed heating element prevents limescale buildup for easy cleaning",
    ];
  }

  return [
    "100% copper wiring and commercial-grade durable internal components",
    "Energy-efficient design engineered for daily domestic and commercial use",
    "Overload and voltage fluctuation protection for long equipment lifespan",
    "Backed by 1-Year All-India Brand Replacement Warranty",
  ];
}

// Helper: Technical specs parser & generator
function getProductSpecs(product, category) {
  if (Array.isArray(product?.specs) && product.specs.length > 0) {
    return product.specs;
  }

  const specs = [];
  const name = product?.name || "";
  const cat = (product?.category || category?.label || "").toLowerCase();

  specs.push({ label: "Brand", value: "Zigma Appliances" });

  if (cat.includes("fan") || name.toLowerCase().includes("fan")) {
    const sweep = name.match(/(\d{3,4}\s*mm)/i);
    const color = name.match(/(Beige|Pure White|White|Brown|Ivory|Black|Silver)/i);
    const pack = name.match(/(Pack of \d+)/i);
    const isTable = name.toLowerCase().includes("table");
    const isWall = name.toLowerCase().includes("wall");
    const isPedestal = name.toLowerCase().includes("pedestal");
    const isBldc = name.toLowerCase().includes("bldc");

    specs.push({
      label: "Product Type",
      value: isTable ? "Table Fan (Portable)" : isWall ? "Wall Fan (Oscillating)" : isPedestal ? "Pedestal Fan" : isBldc ? "BLDC Ceiling Fan" : "Ceiling Fan"
    });
    if (sweep) {
      const mm = parseInt(sweep[1]);
      const inches = Math.round(mm / 25.4);
      specs.push({ label: "Blade Sweep Size", value: `${sweep[1]} (${inches} inch)` });
    }
    if (color) {
      specs.push({ label: "Color / Finish", value: color[1] });
    }
    if (pack) {
      specs.push({ label: "Package Contents", value: pack[1] });
    }
    specs.push({ label: "Motor Construction", value: "100% Pure Copper Induction Motor" });
    specs.push({ label: "Rated Speed (RPM)", value: isWall || isTable ? "2100 RPM Ultra High Speed" : "380 RPM High Air Delivery" });
    specs.push({ label: "Power Consumption", value: isBldc ? "32 Watts (5-Star BLDC)" : "55 Watts (Energy Efficient)" });
    specs.push({ label: "Operating Voltage", value: "220V - 240V ~ 50Hz" });
    specs.push({ label: "Warranty", value: "1 Year All-India Replacement Warranty" });
  } else if (cat.includes("pump")) {
    specs.push({ label: "Product Type", value: "Water Pump" });
    specs.push({ label: "Motor Construction", value: "100% Copper Winding Induction Motor" });
    specs.push({ label: "Protection", value: "Thermal Overload Protector (TOP)" });
    specs.push({ label: "Operating Voltage", value: "220V - 240V ~ 50Hz" });
    specs.push({ label: "Warranty", value: "1 Year All-India Replacement Warranty" });
  } else if (cat.includes("heater") || cat.includes("geyser")) {
    const cap = name.match(/(\d+\s*L)/i);
    specs.push({ label: "Product Type", value: "Water Heater / Geyser" });
    if (cap) specs.push({ label: "Tank Capacity", value: cap[1] });
    specs.push({ label: "Heating Element", value: "High Grade Incoloy Element" });
    specs.push({ label: "Operating Voltage", value: "220V - 240V ~ 50Hz" });
    specs.push({ label: "Warranty", value: "1 Year All-India Replacement Warranty" });
  } else if (cat.includes("iron")) {
    specs.push({ label: "Product Type", value: name.toLowerCase().includes("steam") ? "Steam Iron" : "Dry Iron" });
    specs.push({ label: "Soleplate", value: "Non-Stick Coated Soleplate" });
    specs.push({ label: "Operating Voltage", value: "220V - 240V ~ 50Hz" });
    specs.push({ label: "Warranty", value: "1 Year All-India Replacement Warranty" });
  } else {
    specs.push({ label: "Category", value: category?.label || product?.category || "Home Appliances" });
    specs.push({ label: "Build Quality", value: "Commercial Grade 100% Copper / Heavy Duty" });
    specs.push({ label: "Operating Voltage", value: "220V - 240V ~ 50Hz" });
    specs.push({ label: "Warranty", value: "1 Year All-India Replacement Warranty" });
  }

  return specs;
}

export default function ProductDetailClient({ product, category }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Parse actual product variants (if any exist)
  const rawVariants = Array.isArray(product?.variants) && product.variants.length > 0
    ? product.variants
    : Array.isArray(product?.options) && product.options.length > 0
    ? product.options
    : [];

  const [selectedVariant, setSelectedVariant] = useState(rawVariants.length > 0 ? rawVariants[0] : null);
  
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
  if (product?.image && typeof product.image === "string") {
    galleryImages.push(product.image);
  }
  if (Array.isArray(product?.images)) {
    product.images.forEach(img => {
      if (img && typeof img === "string" && !galleryImages.includes(img)) {
        galleryImages.push(img);
      }
    });
  }
  if (galleryImages.length === 0) {
    galleryImages.push(category?.image || "/catogeries/fan.png");
  }

  const addToCart = useCartStore((state) => state.addToCart);

  // Accurate pricing calculation
  const basePrice = Number(product?.price) || 0;
  const baseMrp = Number(product?.originalPrice) || (basePrice > 0 ? Math.round(basePrice * 1.5) : 0);
  const currentPrice = selectedVariant?.price ? Number(selectedVariant.price) : basePrice;
  const currentMrp = selectedVariant?.mrp
    ? Number(selectedVariant.mrp)
    : selectedVariant?.originalPrice
    ? Number(selectedVariant.originalPrice)
    : baseMrp;
  const discountPercent = currentMrp > currentPrice && currentMrp > 0
    ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        image: galleryImages[0] || product.image || product.imageUrl,
        price: currentPrice,
        originalPrice: currentMrp,
        selectedVariant: selectedVariant
          ? (typeof selectedVariant === "string" ? selectedVariant : selectedVariant.name || selectedVariant.title || selectedVariant.label)
          : undefined,
      },
      quantity,
      true
    );
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

  // Clean brand eyebrow text
  const brandName = category?.label?.toUpperCase() || product?.category?.toUpperCase() || "INDIVOLT APPLIANCES";

  const descriptionText = getProductDescription(product, category);
  const featureBullets = getProductBullets(product, category);
  const productSpecs = getProductSpecs(product, category);

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#e3edd3] selection:text-[#2c4714]">
      {/* Main Navbar */}
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Breadcrumb / Simple Back button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
          </div>

          {/* 2-Column Product Layout matching reference design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: Vertical Thumbnails + Large Hero Box */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-start">
              
              {/* Vertical Thumbnails Carousel (only shown if multiple images exist) */}
              {galleryImages.length > 1 && (
                <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-20 shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="hidden sm:flex w-7 h-7 rounded-full border border-zinc-200 items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex sm:flex-col gap-2.5">
                    {galleryImages.map((imgUrl, index) => {
                      const isSelected = selectedImage === index;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-lg p-1.5 transition-all cursor-pointer overflow-hidden flex items-center justify-center ${
                            isSelected
                              ? "border border-zinc-900 bg-white shadow-xs"
                              : "border border-transparent bg-[#f5f6f4] hover:border-zinc-300 opacity-80 hover:opacity-100"
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
                    className="hidden sm:flex w-7 h-7 rounded-full border border-zinc-200 items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Main Product Canvas Box */}
              <div className="relative w-full aspect-square bg-[#f5f6f4] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2 sm:p-3 overflow-hidden group border border-zinc-200/70 shadow-xs">
                
                {/* BEST SELLER Badge */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white/95 border border-zinc-300/80 text-zinc-800 text-[10px] font-semibold tracking-widest uppercase shadow-xs">
                    {product?.badge || "BEST SELLER"}
                  </span>
                </div>

                {/* Animated Image Transition with minimal padding & rounded corners */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-xs"
                  >
                    <Image
                      src={galleryImages[selectedImage] || "/catogeries/fan.png"}
                      alt={product?.name || "Product Hero View"}
                      fill
                      className="object-contain rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 transition-transform duration-500 group-hover:scale-105"
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
                
                {/* Product Title with original brand font */}
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-sky-950 leading-[1.2] tracking-tight mt-1.5">
                  {product?.name || "Zigma Home Appliance"}
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
                {currentMrp > currentPrice && (
                  <span className="text-base text-zinc-400 line-through font-normal">
                    ₹{currentMrp.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e7f0db] text-[#476d24] text-xs font-semibold tracking-wide">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {descriptionText}
              </p>

              {/* Variants Selector (ONLY shown if the product has actual variants/options) */}
              {rawVariants.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <label className="block text-xs font-bold text-zinc-800">
                    Option / Variant:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {rawVariants.map((variant, idx) => {
                      const vKey = typeof variant === "string" ? variant : variant.id || variant.name || idx;
                      const vLabel = typeof variant === "string" ? variant : variant.name || variant.title || variant.label;
                      const isSelected = selectedVariant === variant || (typeof selectedVariant === "object" && selectedVariant?.id === variant?.id);
                      return (
                        <button
                          key={vKey}
                          type="button"
                          onClick={() => setSelectedVariant(variant)}
                          className={`py-2 px-5 rounded-full text-center text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#e3edd3] border border-[#a8c783] text-[#2c4714] shadow-xs"
                              : "bg-[#f0f2ee] border border-transparent text-zinc-700 hover:bg-[#e6e8e4]"
                          }`}
                        >
                          {vLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity, Add to Cart & Wishlist Row */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Pill */}
                  <div className="inline-flex items-center justify-between border border-zinc-300 rounded-full px-4 h-12 bg-white min-w-[110px] shrink-0">
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
                    className={`flex-1 h-12 px-8 rounded-full font-medium text-xs uppercase tracking-widest text-center transition-all shadow-sm cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 ${
                      added
                        ? "bg-emerald-700 text-white"
                        : "bg-[#392742] hover:bg-[#2b1c33] text-white"
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
                    className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-50 hover:border-zinc-400 transition-colors text-zinc-700 cursor-pointer shrink-0"
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

              {/* Authentic Appliance Trust Badges Grid */}
              <div className="bg-[#f6f7f6] rounded-2xl p-4 sm:p-5 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                
                {/* 1. 100% Copper Winding Motor */}
                <div className="flex flex-col items-center justify-center gap-1.5 p-1">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                    <Zap className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight">
                    100% Copper<br />Motor Core
                  </span>
                </div>

                {/* 2. 1-Year Brand Warranty */}
                <div className="flex flex-col items-center justify-center gap-1.5 p-1">
                  <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-700">
                    <Award className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight">
                    1-Year Brand<br />Warranty
                  </span>
                </div>

                {/* 3. 5-Star Energy Efficiency */}
                <div className="flex flex-col items-center justify-center gap-1.5 p-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight">
                    5-Star Energy<br />Efficiency
                  </span>
                </div>

                {/* 4. Pan-India Delivery */}
                <div className="flex flex-col items-center justify-center gap-1.5 p-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700">
                    <Truck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight">
                    Fast Pan-India<br />Free Shipping
                  </span>
                </div>

              </div>

              {/* Accordion 1: Detail (Collapsible) */}
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
                        {descriptionText}
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-500">
                        {featureBullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
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
                        {productSpecs.map((spec, idx) => (
                          <div key={idx} className="py-2 flex justify-between">
                            <span className="text-zinc-500 font-medium">{spec.label}</span>
                            <span className="text-zinc-900 font-semibold">{spec.value}</span>
                          </div>
                        ))}
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
                        <p className="text-xs font-semibold text-zinc-900">“Outstanding build quality and reliable performance”</p>
                        <p className="text-xs text-zinc-600">
                          Received this {product?.name ? product.name.split("|")[0].trim() : "appliance"} in 2 days. The motor runs exceptionally smooth, vibration-free, and stays cool even after hours of continuous use. Highly recommended!
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
                        <p className="text-xs font-semibold text-zinc-900">“Super fast shipping & 100% genuine copper product”</p>
                        <p className="text-xs text-zinc-600">
                          Packaging was premium and completely secure. It is clearly built with heavy-duty materials and authentic 100% copper components. Excellent customer service from Indivolt.
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
