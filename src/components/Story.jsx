"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Target, Palette, ShieldCheck, ChevronRight } from "lucide-react";

export default function Story() {
  const journeyText = {
    title: "Zigma's Pioneering Heritage",
    badge: "Since 1990",
    paragraphs: [
      "Since 1990, Indian brand Zigma has captivated the most demanding consumers with high-quality products that guarantee perfect results. Zigma offers a wide range of products that combine unrivalled technological performance, refined design, and a high level of user-friendliness.",
      "Our Mission is to ensure the day-to-day well being of its users, thanks to intelligent solutions for Fans, Room Heaters, Irons, Geysers & Immersion Rods.",
      "As a pioneer, Zigma has worked for more than 10 years on developing eco-intelligent products. Faithful to its own values, the Zigma brand has placed eco-design and top-notch engineering at the forefront of its innovation process."
    ],
    leftImage: "/zigma.avif",
  };

  const initialCards = [
    {
      id: "goal",
      title: "Our Goal",
      description:
        "We're driven by innovation, quality, and sustainability. Our goal is simple: to exceed expectations globally while making a positive impact on society. Join us as we lead the way in technological advancement and eco-friendly practices.",
      icon: Target,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
      accentBorder: "border-orange-500/20",
    },
    {
      id: "design",
      title: "Modern Design",
      description:
        "Our sleek, contemporary products blend innovation with aesthetics to elevate any space. From switches to lighting solutions, each item is crafted for both style and functionality. Redefine your space with Zigma Electricals modern designs.",
      icon: Palette,
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-600",
      accentBorder: "border-sky-500/20",
    },
    {
      id: "safety",
      title: "Enhanced Safety",
      description:
        "Our products come equipped with cutting-edge protective features, including surge protection, ensuring a secure environment for your home or workplace. Count on Zigma Electricals for top-notch safety solutions tailored to your needs.",
      icon: ShieldCheck,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      accentBorder: "border-emerald-500/20",
    },
  ];

  // Keep track of the active order of cards
  const [cards, setCards] = useState(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);

  const cycleStack = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Slide out the top card, then place it at the back of the queue
    setTimeout(() => {
      setCards((prev) => {
        const updated = [...prev];
        const first = updated.shift();
        updated.push(first);
        return updated;
      });
      setIsAnimating(false);
    }, 400); // matches the slide-out animation duration
  };

  return (
    <section id="story" className="py-24 bg-white overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Journey Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-orange-500"></div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-500">
                  {journeyText.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-sky-950 leading-tight">
                {journeyText.title}
              </h2>
            </div>

            <div className="space-y-6 text-base text-sky-900/80 leading-relaxed font-bold">
              {journeyText.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Overlapping small image frame on left */}
            <div className="relative w-full h-[140px] rounded-2xl shadow-md overflow-hidden sm:block">
              <Image
                src={journeyText.leftImage}
                alt="Workshop Details"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column - Swappable Card Stack */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-8 min-h-[420px] relative">
            
            {/* The Stack Container */}
            <div className="relative w-full max-w-md h-[280px]">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                
                // Card positions:
                // idx = 0 is the TOP card (front)
                // idx = 1 is the MIDDLE card
                // idx = 2 is the BOTTOM card (back)
                
                const isTop = idx === 0;
                const scale = 1 - idx * 0.05;
                const translateY = idx * 16;
                const zIndex = 30 - idx * 10;
                const opacity = 1 - idx * 0.25;

                return (
                  <motion.div
                    key={card.id}
                    style={{ zIndex }}
                    animate={{
                      scale,
                      y: translateY,
                      opacity: isAnimating && isTop ? 0 : opacity,
                      x: isAnimating && isTop ? 320 : 0,
                      rotate: isAnimating && isTop ? 12 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    onClick={isTop ? cycleStack : undefined}
                    className={`absolute inset-0 w-full h-full bg-white border ${isTop ? 'border-sky-100 shadow-xl cursor-pointer hover:border-orange-500/25' : 'border-sky-100/50 shadow-md'} rounded-3xl p-8 flex flex-col justify-between group transition-colors duration-300`}
                  >
                    <div className="space-y-4">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${card.bgColor} flex items-center justify-center border border-sky-100/50 flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${card.iconColor}`} />
                        </div>
                        <h3 className="text-2xl font-black text-sky-950">
                          {card.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm font-bold text-sky-850 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {isTop && (
                      <div className="flex items-center justify-end text-xs font-black uppercase tracking-wider text-orange-500 gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Click to Swipe</span>
                        <ChevronRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Clickable Controller Buttons */}
            <div className="flex items-center gap-4 relative z-40">
              <button
                onClick={cycleStack}
                disabled={isAnimating}
                className="px-6 py-2.5 bg-sky-50 hover:bg-orange-500 text-sky-950 hover:text-white border border-sky-100/80 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                Next Feature
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
