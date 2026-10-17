"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Why should I upgrade to a Zigma BLDC Ceiling Fan?",
      answer: "Zigma BLDC ceiling fans feature advanced Brushless DC motors that use only 28W to 32W of electricity, cutting cooling costs by up to 65% compared to conventional 75W fans. They offer whisper-silent operation at 28 dB, 6-speed smart remote controls, sleep timers, and uninterrupted runtime even on home inverters.",
    },
    {
      question: "What are the features of Zigma high-speed wall fans (wallfan)?",
      answer: "Zigma wall fans are engineered for maximum air delivery in compact spaces like kitchens, restaurants, and living rooms. Powered by a 100% pure copper high-speed motor producing up to 2100 RPM, they feature 90° motorized oscillation and dual pull-cord controls for easy speed and swing adjustment.",
    },
    {
      question: "How does the Zigma digital air fryer (airfryer) work?",
      answer: "The Zigma digital air fryer uses 360° rapid cyclonic air circulation technology to fry, bake, grill, and roast with up to 85% less oil than conventional deep frying. It comes with 8 one-touch digital preset menus, a non-stick dishwasher-safe basket, and precise temperature regulation.",
    },
    {
      question: "What makes Indivolt appliances more energy-efficient?",
      answer: "Indivolt uses custom copper-wound brushless DC (BLDC) motors paired with intelligent micro-controllers. Instead of drawing maximum current continuously, our devices scale power draw dynamically based on usage context, reducing consumption by up to 65% compared to typical appliances.",
    },
    {
      question: "How do I claim warranty for Zigma products on Indivolt?",
      answer: "All Zigma products purchased through Indivolt carry an official manufacturer warranty (from 1 to 10 years depending on the model). For service, simply reach out to Indivolt customer support with your digital invoice for quick doorstep service and genuine part replacement across India.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Copy and Image */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-orange-500"></div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-500">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-sky-950">
                Frequently Asked Questions
              </h2>
            </div>
            
            <p className="text-base text-sky-850 font-bold leading-relaxed">
              From power efficiency metrics to warranty logistics and smart smart-home setup, here is a quick guide to help you understand the Indivolt engineering ecosystem.
            </p>

            {/* Overlapping Image */}
            <div className="relative w-full h-64 rounded-[32px] overflow-hidden shadow-xl border border-sky-100 hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600"
                alt="Sleek electrical switch board"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-sky-100 pb-4 transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                  >
                    <span className="text-base md:text-lg font-black text-sky-950 group-hover:text-orange-500 transition-colors">
                      {faq.question}
                    </span>
                    <span className="ml-4 w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-sky-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm md:text-base text-sky-850 leading-relaxed font-bold pt-2 pb-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
