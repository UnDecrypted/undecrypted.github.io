"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Clock, 
  Hash, 
  Share2, 
  Trophy, 
  Infinity,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Flame,
  Shield,
  Rocket,
  X,
  Menu,
  ArrowUpRight,
  AlertTriangle,
  Terminal,
  Cpu,
  Lock,
  Eye,
  MousePointer
} from "lucide-react";

// Glitch text effect component
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100">
        {text}
      </span>
    </span>
  );
}

// Marquee component for brutalist feel
function Marquee({ items, direction = "left", speed = 20 }: { items: string[]; direction?: "left" | "right"; speed?: number }) {
  return (
    <div className="overflow-hidden border-y-2 border-black bg-yellow-400 py-2">
      <div 
        className={`flex whitespace-nowrap ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="mx-4 text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Scanline overlay
function Scanlines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
      }}
    />
  );
}

// Custom hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Navigation
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 border-b-4 border-black transition-all duration-200 ${
      scrolled ? "bg-white" : "bg-yellow-400"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black group-hover:bg-red-500 transition-colors">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">
              <GlitchText text="AKM.SCRIPT" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {["FEATURES", "PRICING", "DOCS", "STATUS"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all"
              >
                {item}
              </a>
            ))}
            <Link href="/free">
              <button className="ml-4 px-6 py-2 bg-black text-white font-bold uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all">
                GET KEY →
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-red-500 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-4 border-black">
          <div className="p-4 space-y-2">
            {["FEATURES", "PRICING", "DOCS", "STATUS"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-lg font-bold uppercase tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 bg-white overflow-hidden">
      {/* Brutalist grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating elements following mouse */}
      <div 
        className="absolute w-32 h-32 border-4 border-red-500 opacity-20 pointer-events-none hidden lg:block"
        style={{
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          top: '20%',
          right: '15%',
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-24 h-24 bg-cyan-400 opacity-20 pointer-events-none hidden lg:block"
        style={{
          transform: `translate(${-mousePos.x * 0.015}px, ${-mousePos.y * 0.015}px)`,
          bottom: '25%',
          left: '10%',
          transition: 'transform 0.3s ease-out'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Warning badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold text-xs uppercase tracking-widest border-2 border-black mb-8 rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
          <AlertTriangle className="w-4 h-4" />
          NOT FOR EVERYONE — POWER USERS ONLY
        </div>

        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
          <span className="block">GENERATE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-500">
            API KEYS
          </span>
          <span className="block">FAST.</span>
        </h1>

        {/* Subtitle with brutalist styling */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="border-l-4 border-black pl-6 text-left">
            <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed">
              No bullshit. No complex setup. Just reliable API key generation 
              for developers who value speed over fluff.
            </p>
          </div>
        </div>

        {/* CTA Buttons - Brutalist style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/free">
            <button className="group px-8 py-4 bg-black text-white font-black text-lg uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-3">
              <Zap className="w-5 h-5" />
              GET FREE KEY
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <a href="#pricing" className="px-8 py-4 bg-yellow-400 text-black font-black text-lg uppercase tracking-wider border-4 border-black hover:bg-black hover:text-yellow-400 transition-all duration-200 flex items-center gap-3">
            <Eye className="w-5 h-5" />
            SEE PRICING
          </a>
        </div>

        {/* Stats - Raw brutalist cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { num: "500+", label: "DEVS", color: "bg-cyan-400" },
            { num: "99.9%", label: "UPTIME", color: "bg-green-400" },
            { num: "<100ms", label: "SPEED", color: "bg-yellow-400" },
            { num: "24/7", label: "SUPPORT", color: "bg-red-400" },
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.color} border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}>
              <div className="text-3xl font-black">{stat.num}</div>
              <div className="text-xs font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-4 w-16 h-16 border-l-4 border-t-4 border-black opacity-30" />
      <div className="absolute bottom-8 right-4 w-16 h-16 border-r-4 border-b-4 border-black opacity-30" />
    </section>
  );
}

// Marquee Section
function MarqueeSection() {
  return (
    <Marquee 
      items={[
        "NO HIDDEN FEES",
        "INSTANT GENERATION", 
        "DEVELOPER FIRST",
        "RAW POWER",
        "NO BULLSHIT",
        "FAST SUPPORT",
        "SECURE BY DEFAULT",
        "SCALE ANYTIME"
      ]} 
      speed={25}
    />
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      num: "01",
      title: "RAW SPEED",
      desc: "Generate keys in under 100ms. Our infrastructure doesn't mess around.",
      icon: Zap,
      color: "bg-cyan-400"
    },
    {
      num: "02", 
      title: "FORT KNOX",
      desc: "AES-256 encryption. Your keys are safer than government secrets.",
      icon: Lock,
      color: "bg-red-400"
    },
    {
      num: "03",
      title: "INFINITE SCALE", 
      desc: "50 requests or 50 million. We handle it without breaking a sweat.",
      icon: Cpu,
      color: "bg-yellow-400"
    },
    {
      num: "04",
      title: "TOTAL CONTROL",
      desc: "Granular permissions. You decide who gets what. Period.",
      icon: MousePointer,
      color: "bg-green-400"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-100 border-y-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest mb-4">
            WHY US
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">
            BUILT DIFFERENT.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const { ref, isInView } = useInView(0.2);
            return (
              <div
                key={idx}
                ref={ref}
                className={`group relative bg-white border-4 border-black p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${feature.color} border-4 border-black flex items-center justify-center`}>
                    <feature.icon className="w-7 h-7 text-black" />
                  </div>
                  <span className="text-4xl font-black text-gray-200 group-hover:text-black transition-colors">
                    {feature.num}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const [billing, setBilling] = useState<"weekly" | "annual">("weekly");

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-black uppercase tracking-widest mb-4 border-2 border-black">
            PRICING
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
            PAY WHAT YOU NEED.
          </h2>
          <p className="text-lg font-bold text-gray-600 max-w-xl">
            No enterprise sales calls. No "contact us for pricing". Just honest numbers.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-0 mb-12 border-4 border-black">
          <button
            onClick={() => setBilling("weekly")}
            className={`px-6 py-3 font-black uppercase tracking-wider text-sm transition-all ${
              billing === "weekly" 
                ? "bg-black text-white" 
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            WEEKLY
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-6 py-3 font-black uppercase tracking-wider text-sm transition-all border-l-4 border-black ${
              billing === "annual" 
                ? "bg-black text-white" 
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            ANNUAL
            <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-black text-xs">-30%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FREE PLAN */}
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-400 border-4 border-black translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            <div className="relative bg-white border-4 border-black p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest">
                  FREE TIER
                </div>
                <Zap className="w-6 h-6" />
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">FREE</h3>
              <div className="mb-8">
                <span className="text-5xl font-black">Rp0</span>
                <span className="text-sm font-bold text-gray-500 uppercase"> / FOREVER</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { text: "1 Hour full access", ok: true },
                  { text: "50 Requests per key", ok: true },
                  { text: "Social follow required", ok: true, warn: true },
                  { text: "Basic support only", ok: true },
                  { text: "No rate limit control", ok: false },
                  { text: "No priority queue", ok: false },
                ].map((item, idx) => (
                  <li key={idx} className={`flex items-center gap-3 font-bold ${item.ok ? 'text-black' : 'text-gray-400 line-through'}`}>
                    <div className={`w-6 h-6 border-2 border-black flex items-center justify-center ${item.ok ? 'bg-black' : 'bg-gray-200'}`}>
                      {item.ok ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span>{item.text}</span>
                    {item.warn && (
                      <span className="ml-auto px-2 py-0.5 bg-yellow-400 text-xs font-black uppercase">REQ</span>
                    )}
                  </li>
                ))}
              </ul>

              <Link href="/free" className="block">
                <button className="w-full py-4 bg-black text-white font-black uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group/btn">
                  GET FREE KEY
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div className="relative group">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="px-4 py-2 bg-red-500 text-white font-black text-xs uppercase tracking-widest border-4 border-black whitespace-nowrap">
                MOST POPULAR ★
              </div>
            </div>
            <div className="absolute inset-0 bg-yellow-400 border-4 border-black translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            <div className="relative bg-white border-4 border-black p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase tracking-widest border-2 border-black">
                  PREMIUM
                </div>
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">PREMIUM</h3>
              <div className="mb-8">
                <span className="text-5xl font-black">
                  {billing === "weekly" ? "Rp10.000" : "Rp84.000"}
                </span>
                <span className="text-sm font-bold text-gray-500 uppercase">
                  {billing === "weekly" ? " / 7 DAYS" : " / YEAR"}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { text: "7 Days full access", ok: true, hot: true },
                  { text: "1,000 Requests/day", ok: true, hot: true },
                  { text: "No social requirements", ok: true },
                  { text: "24/7 Priority support", ok: true },
                  { text: "Advanced analytics", ok: true },
                  { text: "Custom integrations", ok: true },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-bold text-black">
                    <div className="w-6 h-6 border-2 border-black bg-black flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className={item.hot ? "text-lg" : ""}>{item.text}</span>
                    {item.hot && (
                      <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-black uppercase border-2 border-black">
                        HOT
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <Link href="/premium" className="block">
                <button className="w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-wider border-4 border-black hover:bg-black hover:text-yellow-400 transition-all flex items-center justify-center gap-2 group/btn">
                  BUY PREMIUM
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </Link>

              <p className="text-center text-xs font-bold text-gray-500 mt-4 uppercase tracking-wider">
                7-Day Money Back — No Questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function TestimonialsSection() {
  const testimonials = [
    {
      name: "ANDI W.",
      role: "FULL STACK DEV",
      content: "AKM Script doesn't fuck around. I got my API key in 2 seconds and was back to coding. No onboarding bullshit.",
      rating: 5
    },
    {
      name: "SITI R.",
      role: "LEAD ENGINEER",
      content: "Switched from a competitor that charged 10x more. Premium plan is a steal. Support actually knows what they're talking about.",
      rating: 5
    },
    {
      name: "BUDI S.",
      role: "INDIE HACKER",
      content: "Free tier for testing, premium for production. The pricing is so straightforward I didn't have to ask my boss for approval.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 bg-white text-black text-xs font-black uppercase tracking-widest mb-4">
            PROOF
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">
            REAL DEVS. REAL OPINIONS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => {
            const { ref, isInView } = useInView(0.2);
            return (
              <div
                key={idx}
                ref={ref}
                className={`border-4 border-white p-6 hover:bg-white hover:text-black transition-all duration-300 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-bold leading-relaxed mb-6">
                  "{t.content}"
                </p>
                <div className="border-t-2 border-current pt-4">
                  <div className="font-black uppercase tracking-wider">{t.name}</div>
                  <div className="text-sm font-bold opacity-70">{t.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-yellow-400 border-y-4 border-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6">
          STOP WAITING.
        </h2>
        <p className="text-xl font-bold text-black/80 mb-10 max-w-2xl mx-auto">
          Your API keys are waiting. Generate your first one in under 10 seconds. 
          No credit card. No bullshit.
        </p>

        <Link href="/free">
          <button className="group px-10 py-5 bg-black text-white font-black text-xl uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all flex items-center gap-3 mx-auto">
            <Rocket className="w-6 h-6" />
            GENERATE KEY NOW
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">AKM.SCRIPT</span>
            </div>
            <p className="font-bold text-gray-600 max-w-sm">
              Brutalist API key generation for developers who don't have time for fluff.
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wider mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Docs", "Status"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wider mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-black text-sm text-gray-500 uppercase tracking-wider">
            © 2026 AKM SCRIPT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 border-2 border-black" />
            <span className="font-bold text-sm">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Scanlines />
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        /* Brutalist scrollbar */
        ::-webkit-scrollbar {
          width: 16px;
        }
        ::-webkit-scrollbar-track {
          background: #fff;
          border-left: 4px solid #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #000;
          border: 2px solid #fff;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
