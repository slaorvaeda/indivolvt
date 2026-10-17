"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, ChevronDown, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "@/utils/api";
import { categories as fallbackCategories } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = mounted ? getTotalItems() : 0;

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

  const [dbCategories, setDbCategories] = useState(() =>
    fallbackCategories.map((cat) => ({
      name: cat.label || cat.name,
      href: `/category/${(cat.slug || cat.label || cat.name).toLowerCase().replace(/ /g, "-")}`,
      image: cat.image || cat.imageUrl,
    }))
  );

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const cats = await getCategories();
        if (Array.isArray(cats) && cats.length > 0 && isMounted) {
          const mapped = cats.map((cat) => ({
            name: cat.name || cat.label,
            href: `/category/${(cat.slug || cat.name || cat.label).toLowerCase().replace(/ /g, "-")}`,
            image: cat.imageUrl || cat.image,
          }));
          setDbCategories(mapped);
        }
      } catch (err) {
        console.warn("Failed to load categories in Navbar:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

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
              sizes="80px"
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
            onClick={() => setCartOpen(true)}
            className="p-2 text-sky-900 hover:text-orange-500 transition-colors duration-200 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
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
            onClick={() => setCartOpen(true)}
            className="p-2 text-sky-900 hover:text-orange-500 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-orange-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
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
                  Zigma Appliances
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
                {dbCategories.map((cat) => (
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
              © {new Date().getFullYear()} Indivolt Appliances
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-100 bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-sky-950" />
                  <h2 className="text-lg font-black text-sky-950">Your Cart</h2>
                  {totalItems > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-950 text-[10px] font-black">
                      {totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-sky-950">Your cart is empty</p>
                      <p className="text-xs font-medium text-slate-450">Add products to get started</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                      <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-0.5">
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-sky-950 line-clamp-1 leading-tight">{item.name}</h4>
                          <span className="text-[10px] font-black text-slate-450 leading-none">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-slate-200/80 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-[11px] font-black text-sky-950 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Subtotal</span>
                    <span className="text-xl font-black text-sky-950">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to clear your cart?")) {
                          clearCart();
                        }
                      }}
                      className="py-3 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        alert("Checkout functionality is coming soon! Thank you for shopping with Indivolt.");
                        clearCart();
                        setCartOpen(false);
                      }}
                      className="py-3 bg-sky-950 hover:bg-orange-500 text-white rounded-xl text-xs font-black shadow-md shadow-sky-950/10 hover:shadow-orange-500/10 transition-all"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
