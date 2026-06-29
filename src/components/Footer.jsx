"use client";

import Link from "next/link";
import { ArrowRight, Mail, Cpu, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-sky-50 text-sky-900 overflow-hidden pt-24 pb-12 border-t border-sky-100">
      {/* Huge Brand Text Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center">
        <span className="text-[12vw] sm:text-[15vw] font-black tracking-widest text-sky-500/5 uppercase leading-none block">
          ZIGMA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column - Subscription */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-sky-950 tracking-tight">
              Subscribe to our power grid
            </h3>
            <p className="text-sm text-sky-700/80 max-w-sm leading-relaxed font-semibold">
              Get updates on new appliance releases, energy saving advice, and exclusive early access deals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-sm flex items-center shadow-lg shadow-sky-100 rounded-full">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-sky-200 text-sky-950 placeholder-sky-450 rounded-full py-4 pl-6 pr-14 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-bold"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange-500 text-white hover:bg-sky-600 flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none"
              aria-label="Submit Email"
            >
              {subscribed ? (
                <span className="text-[10px] font-bold text-white">✓</span>
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-emerald-600 font-extrabold">
              Thank you! You have successfully joined our list.
            </p>
          )}
        </div>

        {/* Right Columns - Link Lists */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
          
          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-sky-950 border-b border-sky-100 pb-2">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {[
                { name: "Smart Kitchen", href: "#categories" },
                { name: "Climate Control", href: "#categories" },
                { name: "Power & Switches", href: "#categories" },
                { name: "Home Utility", href: "#categories" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sky-700 hover:text-orange-500 transition-colors duration-250">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-sky-950 border-b border-sky-100 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {[
                { name: "About Story", href: "#story" },
                { name: "Laboratories", href: "#story" },
                { name: "Careers", href: "#" },
                { name: "Press Room", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sky-700 hover:text-orange-500 transition-colors duration-250">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-sky-950 border-b border-sky-100 pb-2">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {[
                { name: "Service Center", href: "#" },
                { name: "Energy Guide", href: "#" },
                { name: "Matter Setup", href: "#" },
                { name: "User Manuals", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sky-700 hover:text-orange-500 transition-colors duration-250">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-sky-950 border-b border-sky-100 pb-2">
              Social
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {[
                { name: "Instagram", href: "#" },
                { name: "X (Twitter)", href: "#" },
                { name: "LinkedIn", href: "#" },
                { name: "YouTube", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sky-700 hover:text-orange-500 transition-colors duration-250">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-700/80 font-bold">
        <p>© {new Date().getFullYear()} Zigma Electricals. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed by <span className="text-orange-500 font-extrabold hover:text-sky-600 cursor-pointer">slaorvaeda</span>
        </p>
      </div>
    </footer>
  );
}
