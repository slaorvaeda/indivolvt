"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wind, ShieldCheck, Zap, ArrowRight, ShieldAlert, Cpu } from "lucide-react";

export default function FeaturedFan() {
  const [selectedFan, setSelectedFan] = useState(1);

  const fans = {
    1: {
      name: "SilentFlow V1",
      tagline: "Ultra-Efficient Comfort",
      description: "Our signature model built for silence and continuous operation. Fusing classical aeronautic blade sweep with standard low-volt micro-controllers.",
      price: "₹189.59",
      rating: "4.8/5 Rating",
      specs: [
        { label: "Motor", value: "32W Brushless DC (BLDC)" },
        { label: "Noise Level", value: "Less than 28 dB (Whisper Silent)" },
        { label: "Efficiency", value: "Save 42% on annual cooling costs" },
        { label: "Control", value: "6-Speed Smart Remote & Phone Control" },
      ],
      image: "/fan1.png",
      colorTag: "Electric Blue Accents",
    },
    2: {
      name: "SilentFlow V2 Pro",
      tagline: "Industrial Power, Home Whisper",
      description: "A wider sweep version designed for large spaces. V2 Pro features smart thermal sensors that regulate speed based on ambient room temperature.",
      price: "₹249.00",
      rating: "4.9/5 Rating",
      specs: [
        { label: "Motor", value: "45W Turbo BLDC Motor" },
        { label: "Noise Level", value: "Less than 31 dB (Deep Silence)" },
        { label: "Efficiency", value: "5-Star Energy Star Certified" },
        { label: "Control", value: "Matter Hub Compatibility & Smart Control" },
      ],
      image: "/fan2.png",
      colorTag: "Vibrant Orange Accents",
    },
  };

  const currentFan = fans[selectedFan];

  return (
    <section className="py-28 bg-gradient-to-b from-white to-sky-50/30 border-b border-sky-100 relative">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-sky-600"></div>
              <span className="text-xs font-black uppercase tracking-widest text-sky-600">
                Product Spotlight
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950">
              The Aerodynamics of Silence
            </h2>
          </div>

          {/* Model Selector Toggle */}
          <div className="flex bg-sky-100/60 p-1.5 rounded-2xl border border-sky-100">
            <button
              onClick={() => setSelectedFan(1)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFan === 1
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-sky-900 hover:text-sky-600"
              }`}
            >
              Model V1
            </button>
            <button
              onClick={() => setSelectedFan(2)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFan === 2
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-sky-900 hover:text-sky-600"
              }`}
            >
              Model V2 Pro
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Product Name & Branding */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFan}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200/50 px-3 py-1 rounded-full">
                  {currentFan.rating}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-black text-sky-950 leading-tight">
                  {currentFan.name}
                </h3>
                
                <p className="text-lg font-bold text-sky-600">
                  {currentFan.tagline}
                </p>
                
                <p className="text-sm text-sky-850 font-bold leading-relaxed">
                  {currentFan.description}
                </p>

                <div className="flex items-center gap-3 pt-4">
                  <span className="text-3xl font-black text-sky-950">{currentFan.price}</span>
                  <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">
                    {currentFan.colorTag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Fan Image (with rotate animation) */}
          <div className="lg:col-span-4 flex justify-center relative py-8">
            {/* Circular shadow and glow background */}
            <div className="absolute inset-0 m-auto w-64 h-64 bg-sky-200/20 rounded-full blur-xl border border-sky-100/50"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFan}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative w-80 h-80 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                >
                  <Image
                    src={currentFan.image}
                    alt={currentFan.name}
                    width={320}
                    height={320}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Product Details & Specs */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFan}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h4 className="text-xs font-black uppercase tracking-widest text-sky-950 border-b border-sky-100 pb-2">
                  Technical Specifications
                </h4>

                <div className="space-y-4">
                  {currentFan.specs.map((spec, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                      <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-sm font-bold text-sky-950">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-sky-100 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-4.5 rounded-full text-xs font-black text-center text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-orange-500 hover:to-orange-600 shadow-md transition-all duration-300">
                    Add to Cart
                  </button>
                  <button className="px-6 py-4.5 rounded-full text-xs font-black text-center text-sky-900 border-2 border-sky-200 hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Manual
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
