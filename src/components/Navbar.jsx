"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleHomeClick = (e) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.history.pushState({}, document.title, window.location.pathname + window.location.search);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/#categories", hasDropdown: true },
    { name: "Our Story", href: "/#story" },
    { name: "Products", href: "/#products" },
  ];

  const dropdownCategories = [
    { name: "Irons", href: "/category/irons", image: "/catogeries/irons.png" },
    { name: "Fans", href: "/category/fans", image: "/catogeries/fan.png" },
    { name: "Water Heaters", href: "/category/water-heaters", image: "/catogeries/waterheeter.avif" },
    { name: "Kettles", href: "/category/kettles", image: "/catogeries/Kettles.png" },
    { name: "Room Heaters", href: "/category/room-heaters", image: "/catogeries/Room Heaters.png" },
    { name: "Industrial Motors", href: "/category/motors", image: "/catogeries/Industrial Motors.png" },
    { name: "Mixers", href: "/category/mixers", image: "/catogeries/Mixers.png" },
    { name: "Hot Plate", href: "/category/hot-plate", image: "/catogeries/Hot Plate.png" },
    { name: "Water Pump", href: "/category/water-pump", image: "/catogeries/pump.png" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/90 backdrop-blur-md border-b border-sky-100 py-3 shadow-md shadow-sky-500/5"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-20 h-14 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo2.png"
              alt="Indivolt Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="py-4"
                >
                  <Link
                    href={link.href}
                    className="text-sm font-extrabold text-sky-905 hover:text-orange-500 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.name === "Home" ? handleHomeClick : undefined}
                className="text-sm font-extrabold text-sky-905 hover:text-orange-500 transition-colors duration-200 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className="p-2 text-sky-900 hover:text-orange-500 transition-colors duration-200 relative"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            className="p-2 text-sky-900 hover:text-orange-500 transition-colors duration-200 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          <Link
            href="/#products"
            className="px-6 py-3 rounded-full text-xs font-black text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-orange-500 hover:to-orange-600 shadow-md shadow-sky-600/10 hover:shadow-orange-500/15 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Store
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            className="p-2 text-sky-900 hover:text-orange-500"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-sky-900 hover:text-orange-500"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Full-Width Categories Mega-Menu Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-b border-sky-100 shadow-xl overflow-hidden z-40 hidden lg:block"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-12 gap-8 text-sky-950">
              
              {/* Left Column: Rebranding Summary */}
              <div className="col-span-4 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-500">
                  Zigma Collection
                </h4>
                <p className="text-xs font-bold text-sky-850 leading-relaxed">
                  Explore products engineered with silent BLDC technology, smart controls, and high-performance safety standards.
                </p>
                <Link
                  href="#products"
                  onClick={() => setDropdownOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-orange-500 transition-colors"
                >
                  <span>View All Products</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Right Column: The 9 Category Links in 3 Columns */}
              <div className="col-span-8 grid grid-cols-3 gap-y-4 gap-x-8">
                {dropdownCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-2xl hover:bg-sky-50/50 group transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center border border-orange-500/20 overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={22}
                        height={22}
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-xs font-black text-sky-950 group-hover:text-orange-500 transition-colors tracking-tight">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-45 w-full max-w-sm bg-white shadow-2xl border-l border-sky-100 p-8 transform transition-transform duration-500 ease-in-out lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full justify-between pt-16">
          <div className="space-y-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.name === "Home") {
                    handleHomeClick(e);
                  }
                }}
                className="block text-xl font-black text-sky-900 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-orange-500 hover:to-orange-600 text-white font-black shadow-md"
            >
              Explore Products
            </Link>
            <div className="text-center text-xs font-bold text-sky-650">
              © {new Date().getFullYear()} Zigma Electricals
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
