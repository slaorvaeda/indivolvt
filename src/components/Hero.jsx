"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, ChevronRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoSources = ["/family.mp4", "/fan.mp4"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 9000); // Transitions video and image every 9000ms
    return () => clearInterval(interval);
  }, []);

  const cardImages = ["/fan1.png", "/fan2.png"];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-white">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideoIndex}
          src={videoSources[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-1"></div>
        {/* Soft color blobs to represent electricity glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">



          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-sky-950 leading-[1.1]">
              Appliances with a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-orange-500">
                soul, engineered
              </span>{" "}
              <br />
              for generations.
            </h1>
            <p className="max-w-xl text-base md:text-lg text-sky-900/80 leading-relaxed font-bold">
              Experience the harmony of intelligent control and high-performance design. Indivolt fuses smart eco-efficiency with unmatched home appliance reliability.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 w-full"
          >
            <Link
              href="#products"
              className="px-8 py-4.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-sky-600/10 hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
            >
              Shop Collection
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#story"
              className="flex items-center gap-3 text-sky-900 hover:text-orange-500 transition-colors font-black text-sm group"
            >
              <span className="w-12 h-12 rounded-full border-2 border-sky-200 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50/5 transition-all">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              Watch Our Story
            </Link>
          </motion.div>
        </div>

        {/* Right Column - Sliding Images Only */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md h-[650px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideoIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.0 }} // Slower transition duration
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={cardImages[currentVideoIndex]}
                  alt="Indivolt Featured Fan"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
