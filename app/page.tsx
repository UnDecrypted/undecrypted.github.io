"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Rocket
} from "lucide-react";

export default function Home() {
  const [isHoveredFree, setIsHoveredFree] = useState(false);
  const [isHoveredPremium, setIsHoveredPremium] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      
      {/* Animated Background dengan warna lebih kalem */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-8 animate-fade-in">
          <Rocket className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium text-gray-300">Powerful & Reliable</span>
        </div>

        {/* Main Title */}
        <div className="text-center animate-slide-up">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            AKM SCRIPT
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <p className="text-gray-400 text-lg max-w-md">
              API Key Generator Terpercaya
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-gray-400 text-center max-w-md leading-relaxed animate-fade-in-up">
          Generate API Key dengan mudah dan cepat. 
          Pilih versi yang sesuai dengan kebutuhan project Anda.
        </p>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* FREE CARD - Color Palette: Blue/Cyan */}
          <div 
            className="group relative"
            onMouseEnter={() => setIsHoveredFree(true)}
            onMouseLeave={() => setIsHoveredFree(false)}
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500 ${isHoveredFree ? 'opacity-50' : ''}`}></div>
            
            <div className="relative p-8 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400">FREE TIER</span>
              </div>

              <h2 className="text-3xl font-bold mb-2 text-white">Free Plan</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">Rp0</span>
                <span className="text-gray-500"> / selamanya</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  { icon: Clock, text: "1 Jam Akses penuh", color: "text-cyan-400" },
                  { icon: Hash, text: "50 Request / key", color: "text-cyan-400" },
                  { icon: Share2, text: "Follow sosial media", color: "text-emerald-400" },
                  { icon: Shield, text: "Cocok untuk testing", color: "text-gray-500" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link href="/free">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group">
                  <span>Get Free Key</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* PREMIUM CARD - Color Palette: Amber/Orange */}
          <div 
            className="group relative"
            onMouseEnter={() => setIsHoveredPremium(true)}
            onMouseLeave={() => setIsHoveredPremium(false)}
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 ${isHoveredPremium ? 'opacity-100' : ''}`}></div>
            
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 transition-all duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-3 right-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-lg">
                  <Star className="w-3 h-3 fill-current text-yellow-300" />
                  MOST POPULAR
                  <Flame className="w-3 h-3 text-orange-300" />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">PREMIUM</span>
              </div>

              <h2 className="text-3xl font-bold mb-2 text-amber-400">Premium Plan</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Rp10.000</span>
                <span className="text-gray-400"> / 7 Hari</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  { icon: Infinity, text: "7 Hari Akses penuh", color: "text-amber-400", highlight: true },
                  { icon: Zap, text: "1.000 Request / hari", color: "text-amber-400", highlight: true },
                  { icon: CheckCircle2, text: "Tanpa batasan sosial media", color: "text-emerald-400" },
                  { icon: Trophy, text: "Prioritas support 24/7", color: "text-amber-400" }
                ].map((item, idx) => (
                  <li key={idx} className={`flex items-center gap-3 ${item.highlight ? 'text-white font-medium' : 'text-gray-300'}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span>{item.text}</span>
                    {item.highlight && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">✓</span>
                    )}
                  </li>
                ))}
              </ul>

              <Link href="/premium">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 group shadow-lg">
                  <span>Buy Premium</span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 w-full max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Zap, text: "Fast Response", subtext: "< 100ms latency", color: "text-cyan-400" },
              { icon: Shield, text: "99.9% Uptime", subtext: "Reliable service", color: "text-emerald-400" },
              { icon: Trophy, text: "24/7 Support", subtext: "Fast response", color: "text-amber-400" },
              { icon: Rocket, text: "Auto Update", subtext: "Latest features", color: "text-blue-400" }
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <p className="font-semibold text-sm text-gray-200">{feature.text}</p>
                <p className="text-xs text-gray-500">{feature.subtext}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial / Trust Badge */}
        <div className="mt-12 flex items-center gap-4 text-center">
          <div className="flex -space-x-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Dipercaya oleh <span className="text-cyan-400 font-semibold">500+</span> developer
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">
            Mulai gratis, upgrade kapan saja kalau butuh lebih. 
            <br className="block sm:hidden" />
            <span className="text-cyan-600">✨ No commitment required ✨</span>
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}