"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const cases = [
    {
      id: "c1",
      space: "WeWork Co-Working Hub",
      text: "Indivolt's silent-induction ceiling systems transformed our common areas. The silent operation keeps our members focused, while the automated energy-saving cycles lowered our utility bill by 32%.",
      reviewer: "Sarah Jenkins",
      role: "Operations Manager, WeWork",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
      logo: "wework",
    },
    {
      id: "c2",
      space: "Casa Green Eco-Resort",
      text: "Our guests expect clean air and zero distraction. The Aura Purifier operates so quietly that guests think it is off, yet the air purity metrics are pristine. It perfectly complements our eco-residency philosophy.",
      reviewer: "Javier Mendez",
      role: "Founder, Casa Green Resort",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
      logo: "casagreen",
    },
    {
      id: "c3",
      space: "Linea Smart Residences",
      text: "We integrated Indivolt induction hubs into all 120 luxury studio apartments. The child safety locks, fast boil speeds, and flush glass designs were massive selling points for our design-savvy tenants.",
      reviewer: "Katarina Kova",
      role: "Chief Architect, Linea Living",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      logo: "linealiving",
    },
  ];

  const partners = [
    { name: "WeWork", logoText: "WeWork" },
    { name: "Airbnb", logoText: "airbnb" },
    { name: "Ace Hotel", logoText: "ACE HOTEL" },
    { name: "Marriott", logoText: "Marriott" },
    { name: "Hilton", logoText: "Hilton" },
  ];

  return (
    <section className="py-24 bg-sky-50/20 overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-sky-600"></div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600">
              Spaces & Projects
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-sky-950 leading-tight">
            Chosen by design-first spaces and modern residences.
          </h2>
          <p className="text-base text-sky-850 font-bold">
            From eco-conscious resorts to premium urban apartments, Indivolt appliances are selected by designers and architects who prioritize quiet power, smart control, and clean aesthetics.
          </p>
        </div>

        {/* Masonry-like Grid for Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative w-full h-48 bg-sky-50">
                <Image
                  src={item.image}
                  alt={item.space}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/30 to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white text-xs font-black bg-sky-600 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {item.space}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4 relative">
                  <Quote className="w-8 h-8 text-sky-600/10 absolute -top-4 -left-2 fill-current" />
                  <p className="text-sm text-sky-900 leading-relaxed font-bold italic relative z-10">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-sky-50">
                  <div>
                    <h4 className="text-sm font-black text-sky-950">
                      {item.reviewer}
                    </h4>
                    <p className="text-xs text-sky-650 font-bold">
                      {item.role}
                    </p>
                  </div>
                  
                  {/* Styled Mock Logo */}
                  <div className="text-[10px] font-black tracking-widest text-sky-600 border border-sky-200 px-3 py-1.5 rounded uppercase">
                    {item.logo}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners Banner */}
        <div className="border-t border-sky-100 pt-12 text-center space-y-6">
          <p className="text-xs font-black text-sky-600 uppercase tracking-widest">
            Trusted by over 200 developers and interior groups worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 hover:opacity-75 transition-opacity duration-300">
            {partners.map((partner) => (
              <span
                key={partner.name}
                className="text-lg md:text-2xl font-black tracking-widest text-sky-900 font-serif uppercase"
              >
                {partner.logoText}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
