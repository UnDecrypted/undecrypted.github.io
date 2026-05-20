"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Terminal,
  ArrowLeft,
  Home,
  AlertTriangle,
  RefreshCw,
  Search,
  X,
  Diamond,
  ArrowRight
} from "lucide-react";

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("404");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Glitch effect on 404
  useEffect(() => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    let interval: NodeJS.Timeout;

    const startGlitch = () => {
      let iterations = 0;
      interval = setInterval(() => {
        setGlitchText(
          "404"
            .split("")
            .map((char, idx) => {
              if (idx < iterations) return "404"[idx];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iterations += 1 / 3;
        if (iterations >= 3) {
          clearInterval(interval);
          setGlitchText("404");
        }
      }, 50);
    };

    startGlitch();
    const loop = setInterval(startGlitch, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(loop);
    };
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const suggestedLinks = [
    { label: "HOME", href: "/", desc: "Back to safety" },
    { label: "WORK", href: "/#work", desc: "See projects" },
    { label: "CONTACT", href: "/#contact", desc: "Get in touch" }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)'
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating glitch elements */}
      <div 
        className="absolute text-6xl font-black text-white/5 select-none hidden lg:block"
        style={{
          transform: `translate(${coords.x * 0.02}px, ${coords.y * 0.02}px)`,
          top: '10%',
          right: '15%',
          transition: 'transform 0.3s ease-out'
        }}
      >
        404
      </div>
      <div 
        className="absolute text-8xl font-black text-white/5 select-none hidden lg:block"
        style={{
          transform: `translate(${-coords.x * 0.015}px, ${-coords.y * 0.015}px)`,
          bottom: '15%',
          left: '10%',
          transition: 'transform 0.3s ease-out'
        }}
      >
        ???
      </div>

      {/* Header */}
      <header className="border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center border-4 border-white group-hover:bg-black group-hover:text-white transition-colors">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">MRA.DEV</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 border-2 border-white animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">ERROR</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">

        {/* Error Code */}
        <div className="relative mb-8">
          {/* Glitch layers */}
          <h1 
            className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black tracking-tighter leading-none relative"
            style={{ 
              textShadow: '-4px 0 #ff0000, 4px 0 #00ffff',
              fontFamily: 'monospace'
            }}
          >
            {glitchText}
          </h1>
          {/* Secondary glitch text */}
          <div 
            className="absolute top-0 left-0 w-full text-[12rem] sm:text-[16rem] md:text-[20rem] font-black tracking-tighter leading-none text-red-500/30 -translate-x-2"
            style={{ clipPath: 'inset(0 0 50% 0)' }}
          >
            {glitchText}
          </div>
          <div 
            className="absolute top-0 left-0 w-full text-[12rem] sm:text-[16rem] md:text-[20rem] font-black tracking-tighter leading-none text-cyan-500/30 translate-x-2"
            style={{ clipPath: 'inset(50% 0 0 0)' }}
          >
            {glitchText}
          </div>
        </div>

        {/* Warning Banner */}
        <div className="border-4 border-white bg-red-500 p-4 max-w-2xl w-full mb-8 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
          <div>
            <p className="font-black uppercase tracking-wider text-lg mb-1">PAGE NOT FOUND</p>
            <p className="font-bold text-sm">
              The page you are looking for does not exist or has been moved. 
              This is not a bug — it's a feature you haven't unlocked yet.
            </p>
          </div>
        </div>

        {/* Error Details */}
        <div className="border-4 border-white bg-black p-4 max-w-2xl w-full mb-8">
          <div className="flex items-center justify-between border-b-2 border-gray-800 pb-2 mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">Error Log</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 border border-white" />
              <div className="w-3 h-3 bg-yellow-400 border border-white" />
              <div className="w-3 h-3 bg-green-500 border border-white" />
            </div>
          </div>
          <code className="text-sm font-mono text-gray-300 block space-y-1">
            <span className="text-red-400">[ERROR]</span> Route not found: <span className="text-white">/unknown-path</span>
            <br />
            <span className="text-yellow-400">[WARN]</span>  User attempted to access restricted area
            <br />
            <span className="text-cyan-400">[INFO]</span>  Suggested action: Return to safety
            <br />
            <span className="text-gray-500">[DEBUG]</span> Status: 404 | Time: {new Date().toLocaleTimeString()}
          </code>
        </div>

        {/* Suggested Links */}
        <div className="max-w-2xl w-full mb-8">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4">Suggested Actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestedLinks.map((link, idx) => (
              <Link 
                key={idx}
                href={link.href}
                className="group border-4 border-white p-4 hover:bg-white hover:text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black uppercase tracking-wider">{link.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-black uppercase tracking-wider border-4 border-white hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            RELOAD
          </button>
          <Link 
            href="/"
            className="px-6 py-3 bg-black text-white font-black uppercase tracking-wider border-4 border-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            GO HOME
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-8 w-16 h-16 border-l-4 border-t-4 border-white opacity-20 hidden lg:block" />
        <div className="absolute bottom-1/4 right-8 w-16 h-16 border-r-4 border-b-4 border-white opacity-20 hidden lg:block" />
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-white bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-black uppercase tracking-wider">MRA.DEV</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">
            ERROR 404 — MUHAMMAD RAIHAN ALI
          </p>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-500" />
            <span className="text-xs font-black uppercase">PAGE NOT FOUND</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 16px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
          border-left: 4px solid #fff;
        }
        ::-webkit-scrollbar-thumb {
          background: #fff;
          border: 2px solid #000;
        }
        ::selection {
          background: #fff;
          color: #000;
        }
      `}</style>
    </div>
  );
}