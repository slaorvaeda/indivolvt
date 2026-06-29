"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Wind, Sparkles } from "lucide-react";

export default function Team() {
  const innovators = [
    {
      name: "Dr. Marcus Vance",
      role: "Chief Electrical Architect",
      desc: "Former grid infrastructure engineer. Marcus oversees coil winding and circuit safety protocols.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
      icon: Cpu,
    },
    {
      name: "Isla Sterling",
      role: "Thermal & Eco Architect",
      desc: "Specialist in fluid dynamics. Isla directs low-volt consumption tuning and silent motor designs.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
      icon: Wind,
    },
    {
      name: "Aria Chen",
      role: "Smart Interface Designer",
      desc: "Focused on human-appliance systems. Aria designs our smart control dials and phone app widgets.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 bg-sky-50/20 overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-sky-600"></div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600">
              Why Indivolt
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-sky-950 leading-tight">
            We believe in appliances that power your home, silently and efficiently.
          </h2>
          <p className="text-base text-sky-850 font-bold">
            Every electrical board we solder and fan blade we balance is meticulously tuned to make modern homes safer, quieter, and deeply integrated. Meet the innovators making it possible.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {innovators.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white border border-sky-100 rounded-[32px] overflow-hidden p-6 hover:shadow-xl hover:border-sky-500/20 transition-all duration-300 group flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                {/* Image frame - rounded top */}
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-sky-50">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 to-transparent"></div>
                  
                  {/* Floating role icon */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/95 shadow-md flex items-center justify-center text-sky-600">
                    <member.icon className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-sky-950 group-hover:text-sky-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-black tracking-widest uppercase text-orange-500">
                    {member.role}
                  </p>
                  <p className="text-sm text-sky-900/80 leading-relaxed font-bold">
                    {member.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
