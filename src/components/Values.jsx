"use client";

import { motion } from "framer-motion";
import { Target, Palette, ShieldCheck } from "lucide-react";

export default function Values() {
  const pillars = [
    {
      number: "01",
      title: "Our Goal",
      description:
        "We're driven by innovation, quality, and sustainability. Our goal is simple: to exceed expectations globally while making a positive impact on society. Join us as we lead the way in technological advancement and eco-friendly practices.",
      icon: Target,
      color: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-500",
      borderColor: "group-hover:border-orange-500",
      shadowColor: "group-hover:shadow-orange-500/5",
    },
    {
      number: "02",
      title: "Modern Design",
      description:
        "Our sleek, contemporary products blend innovation with aesthetics to elevate any space. From switches to lighting solutions, each item is crafted for both style and functionality. Redefine your space with Zigma Electricals modern designs.",
      icon: Palette,
      color: "from-sky-500/10 to-sky-500/5",
      iconColor: "text-sky-600",
      borderColor: "group-hover:border-sky-500",
      shadowColor: "group-hover:shadow-sky-500/5",
    },
    {
      number: "03",
      title: "Enhanced Safety",
      description:
        "Our products come equipped with cutting-edge protective features, including surge protection, ensuring a secure environment for your home or workplace. Count on Zigma Electricals for top-notch safety solutions tailored to your needs.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-600",
      borderColor: "group-hover:border-emerald-500",
      shadowColor: "group-hover:shadow-emerald-500/5",
    },
  ];

  return (
    <section id="values" className="py-24 bg-sky-50/25 overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-sky-600"></div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600">
              Our Core Pillars
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-sky-950 leading-tight">
            Why Zigma Electricals
          </h2>
          <p className="text-base text-sky-850 font-bold max-w-xl">
            Engineered to empower modern living, our brand principles dictate every wire we wind and every contour we design.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative bg-white border border-sky-100/60 rounded-[32px] p-8 flex flex-col justify-between shadow-md transition-all duration-300 ${pillar.borderColor} ${pillar.shadowColor} hover:-translate-y-1 overflow-hidden`}
              >
                {/* Large Background Number */}
                <div className="absolute -top-4 -right-2 text-8xl font-black text-sky-100/30 select-none group-hover:text-sky-200/20 transition-colors duration-300">
                  {pillar.number}
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center border border-sky-100/50`}>
                    <IconComponent className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-sky-950">
                      {pillar.title}
                    </h3>
                    <p className="text-sm font-bold text-sky-850 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
