"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Banknote, 
  Sparkles, 
  Loader2, 
  MessageCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, createOrder } from "@/utils/api";
import { categories as fallbackCategories } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

const emptySubscribe = () => () => {};

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Cart & Order State from useCartStore
  const cart = useCartStore((state) => state.cart);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const checkoutStep = useCartStore((state) => state.checkoutStep);
  const setCheckoutStep = useCartStore((state) => state.setCheckoutStep);
  const lastOrder = useCartStore((state) => state.lastOrder);
  const setLastOrder = useCartStore((state) => state.setLastOrder);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = mounted ? getTotalItems() : 0;
  const totalPrice = mounted ? getTotalPrice() : 0;

  // Checkout Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Delhi",
    pincode: "",
    paymentMethod: "cod",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errors.address = "Please enter your full street/house address";
    }
    if (!formData.city.trim()) {
      errors.city = "Please enter your city";
    }
    if (!formData.state.trim()) {
      errors.state = "Please select or enter your state";
    }
    const cleanPin = formData.pincode.replace(/\D/g, "");
    if (!cleanPin || cleanPin.length !== 6) {
      errors.pincode = "Please enter a valid 6-digit PIN code";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const orderPayload = {
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        shippingAddress: {
          street: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim() || (formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online / UPI Payment'),
        items: cart.map((item) => ({
          productId: Number(item.id) || item.id,
          name: item.name + (item.selectedVariant ? ` (${item.selectedVariant})` : ""),
          price: Number(item.price) || 0,
          quantity: item.quantity || 1,
        })),
      };

      const response = await createOrder(orderPayload);
      if (response && response.success && response.data?.order) {
        setLastOrder(response.data.order);
        clearCart();
        setCheckoutStep("success");
      } else {
        throw new Error(response?.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Order placement failed:", err);
      setSubmitError(
        err.response?.data?.message ||
        err.message ||
        "Could not process your order right now. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, Math.round((totalPrice / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-sky-100 py-3 shadow-md shadow-sky-500/5"
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

        {/* Desktop CTA / Cart Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#products"
            className="p-2 text-sky-900 hover:text-orange-500 transition-colors duration-200 relative"
            aria-label="Search Products"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </Link>

          <button
            onClick={openCart}
            className="p-2 text-sky-900 hover:text-orange-500 transition-colors duration-200 relative cursor-pointer"
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

        {/* Mobile Menu & Cart Buttons */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={openCart}
            className="p-2 text-sky-900 hover:text-orange-500 relative cursor-pointer"
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
              {/* Left Column: Summary */}
              <div className="col-span-4 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-500">
                  Zigma Appliances
                </h4>
                <p className="text-xs font-bold text-sky-850 leading-relaxed">
                  Explore products engineered with silent BLDC technology, smart controls, and high-performance safety standards.
                </p>
                <Link
                  href="/#products"
                  onClick={() => setDropdownOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-orange-500 transition-colors"
                >
                  <span>View All Products</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Right Column: 9 Categories in 3 Columns */}
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
                        src={cat.image || "/catogeries/fan.png"}
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
        className={`fixed inset-y-0 right-0 z-45 w-full max-w-sm bg-white shadow-2xl border-l border-sky-100 p-8 transform transition-transform duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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

      {/* ============================================================ */}
      {/* COMPLETE CART & ORDER SIDEBAR DRAWER                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden"
            >
              {/* ========================================== */}
              {/* VIEW 1: CART ITEMS VIEW                   */}
              {/* ========================================== */}
              {checkoutStep === "cart" && (
                <>
                  {/* Header */}
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-950">
                        <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <h2 className="text-base font-black text-sky-950">Your Cart</h2>
                      {totalItems > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-950 text-[11px] font-black">
                          {totalItems}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={closeCart}
                      className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                      aria-label="Close cart"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Free Delivery Goal Tracker */}
                  {cart.length > 0 && (
                    <div className="px-5 py-3 bg-[#f8fafc] border-b border-slate-100 shrink-0">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        {amountToFreeShipping > 0 ? (
                          <span className="text-slate-600 font-semibold text-[11px]">
                            Add <strong className="text-sky-950 font-black">₹{amountToFreeShipping.toLocaleString("en-IN")}</strong> more for <span className="text-orange-600 font-bold">FREE Pan-India Delivery</span>!
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Congratulations! You unlocked FREE Pan-India Shipping!</span>
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-slate-400">{freeShippingProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            freeShippingProgress >= 100 ? "bg-emerald-500" : "bg-gradient-to-r from-sky-500 to-orange-500"
                          }`}
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Scrollable Items List */}
                  <div className="flex-grow overflow-y-auto p-5 space-y-3.5">
                    {cart.length === 0 ? (
                      <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center text-sky-900">
                          <ShoppingBag className="w-8 h-8 opacity-60" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-black text-sky-950">Your cart is empty</p>
                          <p className="text-xs text-slate-400 max-w-[240px]">
                            Explore high-efficiency BLDC fans, water pumps, irons, and home appliances.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            closeCart();
                            if (typeof window !== "undefined") {
                              const el = document.getElementById("products");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="px-6 py-2.5 rounded-full bg-sky-950 hover:bg-orange-500 text-white text-xs font-black transition-all shadow-md cursor-pointer"
                        >
                          Browse Products
                        </button>
                      </div>
                    ) : (
                      cart.map((item) => {
                        const itemKey = item.cartItemId || item.id;
                        return (
                          <div
                            key={itemKey}
                            className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all"
                          >
                            {/* Product Thumbnail */}
                            <div className="relative w-16 h-16 bg-[#f5f6f4] border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                              <Image
                                src={item.image || item.imageUrl || "/catogeries/fan.png"}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-grow flex flex-col justify-between py-0.5 min-w-0">
                              <div>
                                <Link
                                  href={`/product/${item.id}`}
                                  onClick={closeCart}
                                  className="text-xs font-black text-sky-950 hover:text-orange-500 transition-colors line-clamp-1 leading-tight"
                                >
                                  {item.name}
                                </Link>
                                {item.selectedVariant && (
                                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-sky-50 text-sky-900 text-[10px] font-bold border border-sky-100/80">
                                    {item.selectedVariant}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between gap-2 mt-2">
                                <span className="text-xs font-black text-sky-950">
                                  ₹{(Number(item.price) || 0).toLocaleString("en-IN")}
                                </span>

                                <div className="flex items-center gap-3">
                                  {/* Quantity selector */}
                                  <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                      className="px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-2 text-[11px] font-black text-sky-950 min-w-[20px] text-center select-none">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                      className="px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Remove */}
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(itemKey)}
                                    className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Cart Footer / Checkout Trigger */}
                  {cart.length > 0 && (
                    <div className="p-5 border-t border-slate-100 bg-[#f8fafc] space-y-3 shrink-0">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Subtotal</span>
                          <span className="font-bold text-slate-800">₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Pan-India Shipping</span>
                          <span className="font-bold text-emerald-700">FREE</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-sm font-black text-sky-950">Total Amount</span>
                          <span className="text-lg font-black text-sky-950">
                            ₹{totalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Clear all items from your cart?")) {
                              clearCart();
                            }
                          }}
                          className="py-3 px-4 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-500 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep("checkout")}
                          className="flex-1 py-3.5 px-6 bg-sky-950 hover:bg-orange-500 text-white rounded-xl text-xs font-black shadow-md shadow-sky-950/10 hover:shadow-orange-500/15 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                        >
                          <span>Proceed to Checkout</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ========================================== */}
              {/* VIEW 2: CHECKOUT & DELIVERY FORM          */}
              {/* ========================================== */}
              {checkoutStep === "checkout" && (
                <div className="h-full flex flex-col justify-between overflow-hidden">
                  {/* Top Bar with Back button */}
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("cart")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-900 hover:text-orange-500 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Cart</span>
                    </button>
                    <h2 className="text-sm font-black text-sky-950 uppercase tracking-wider">Order Checkout</h2>
                    <button
                      onClick={closeCart}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Form */}
                  <form
                    id="checkout-form"
                    onSubmit={handlePlaceOrder}
                    className="flex-grow overflow-y-auto p-5 space-y-4 text-left"
                  >
                    {/* Order summary mini strip */}
                    <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-sky-950">
                        {totalItems} item{totalItems > 1 ? "s" : ""} in cart
                      </span>
                      <span className="font-black text-sky-950 text-sm">
                        Total: ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                        {submitError}
                      </div>
                    )}

                    {/* Contact Details */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        1. Contact Information
                      </span>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                            formErrors.name ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                          }`}
                        />
                        {formErrors.name && (
                          <span className="text-[10px] font-semibold text-rose-600 mt-0.5 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Mobile (10 digits) *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            placeholder="9876543210"
                            maxLength={10}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                              formErrors.phone ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                            }`}
                          />
                          {formErrors.phone && (
                            <span className="text-[10px] font-semibold text-rose-600 mt-0.5 block">{formErrors.phone}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="ramesh@gmail.com"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                              formErrors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                            }`}
                          />
                          {formErrors.email && (
                            <span className="text-[10px] font-semibold text-rose-600 mt-0.5 block">{formErrors.email}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        2. Shipping Address
                      </span>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Street / Flat / House / Landmark *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          placeholder="Flat 402, Sunshine Heights, Near City Mall"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                            formErrors.address ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                          }`}
                        />
                        {formErrors.address && (
                          <span className="text-[10px] font-semibold text-rose-600 mt-0.5 block">{formErrors.address}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleFormChange}
                            placeholder="e.g. Delhi"
                            className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                              formErrors.city ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            State *
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleFormChange}
                            className="w-full px-2 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-sky-600 bg-white"
                          >
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleFormChange}
                            placeholder="110001"
                            maxLength={6}
                            className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all ${
                              formErrors.pincode ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        3. Payment Method
                      </span>

                      <div className="grid grid-cols-1 gap-2">
                        <label
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            formData.paymentMethod === "cod"
                              ? "border-sky-600 bg-sky-50/40 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleFormChange}
                            className="mt-0.5 text-sky-600 focus:ring-sky-500"
                          />
                          <div>
                            <span className="block text-xs font-black text-sky-950 flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-sky-700" />
                              <span>Cash on Delivery (Pay at Doorstep)</span>
                            </span>
                            <span className="block text-[10px] text-slate-500 font-medium mt-0.5">
                              Pay securely in cash or UPI when the courier delivers your package.
                            </span>
                          </div>
                        </label>

                        <label
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            formData.paymentMethod === "upi"
                              ? "border-sky-600 bg-sky-50/40 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === "upi"}
                            onChange={handleFormChange}
                            className="mt-0.5 text-sky-600 focus:ring-sky-500"
                          />
                          <div>
                            <span className="block text-xs font-black text-sky-950 flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 text-orange-600" />
                              <span>Online Payment / UPI</span>
                            </span>
                            <span className="block text-[10px] text-slate-500 font-medium mt-0.5">
                              Google Pay, PhonePe, Paytm, Debit/Credit Card or Net Banking.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Trust Guarantees */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        1-Year Replacement
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-sky-600" />
                        Express Courier
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                        100% Genuine
                      </span>
                    </div>
                  </form>

                  {/* Fixed Bottom Action for Checkout */}
                  <div className="p-5 border-t border-slate-100 bg-[#f8fafc] shrink-0">
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Placing Your Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order • ₹{totalPrice.toLocaleString("en-IN")}</span>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW 3: ORDER SUCCESS SCREEN              */}
              {/* ========================================== */}
              {checkoutStep === "success" && (
                <div className="h-full flex flex-col justify-between p-6 text-center overflow-y-auto">
                  <div className="pt-4 space-y-4">
                    {/* Animated Checkmark Circle */}
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <div className="space-y-1">
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider border border-emerald-200/60">
                        Order Confirmed
                      </span>
                      <h2 className="text-xl font-black text-sky-950">Thank you for your order!</h2>
                      <p className="text-xs text-slate-500 max-w-[280px] mx-auto">
                        Your appliance order has been received and scheduled for express dispatch.
                      </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-left space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="font-bold text-slate-500">Order Reference</span>
                        <span className="font-black text-sky-950">#IND-{lastOrder?.id || "NEW"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-500">Recipient</span>
                        <span className="font-bold text-slate-800">{lastOrder?.customerName || formData.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-500">Phone</span>
                        <span className="font-bold text-slate-800">{lastOrder?.customerPhone || formData.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-500">Payment</span>
                        <span className="font-bold text-slate-800 uppercase">
                          {lastOrder?.paymentMethod === "cod" ? "Cash on Delivery" : "Online / UPI"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="font-black text-sky-950">Total Amount</span>
                        <span className="font-black text-sky-950 text-sm">
                          ₹{Number(lastOrder?.totalAmount || totalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Shipping Notice */}
                    <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-left flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-sky-950 font-medium leading-relaxed">
                        Our warehouse in Chandu Gurugram is preparing your items. You will receive tracking details via SMS/WhatsApp within 24 hours.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 space-y-2.5">
                    <a
                      href={`https://wa.me/919999999999?text=Hi%20Indivolt%20Appliances,%20I%20have%20an%20inquiry%20regarding%20my%20Order%20%23IND-${lastOrder?.id || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="w-full py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sky-950 text-xs font-black transition-colors cursor-pointer"
                    >
                      Continue Shopping
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
