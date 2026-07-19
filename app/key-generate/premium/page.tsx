"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  MessageCircle, 
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Copy,
  AlertCircle,
  TrendingUp,
  Gift,
  X,
  ArrowRight,
  Terminal,
  AlertTriangle,
  Wallet
} from "lucide-react";

export default function PremiumBuyPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const paymentMethods = [
    {
      id: "dana",
      name: "DANA",
      icon: "D",
      color: "bg-blue-500",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "ovo",
      name: "OVO",
      icon: "O",
      color: "bg-purple-500",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "gopay",
      name: "GOPAY",
      icon: "G",
      color: "bg-green-500",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "qris",
      name: "QRIS",
      icon: "QR",
      color: "bg-indigo-500",
      number: "Scan QR Code",
      owner: "Semua E-Wallet"
    }
  ];

  const prices = [
    { 
      days: 7, 
      price: 10000, 
      popular: false, 
      savings: 0,
      pricePerDay: "1.428",
      bonus: null
    },
    { 
      days: 30, 
      price: 35000, 
      popular: true, 
      savings: 12.5,
      pricePerDay: "1.166",
      bonus: "+1 HARI"
    },
    { 
      days: 90, 
      price: 90000, 
      popular: false, 
      savings: 30,
      pricePerDay: "1.000",
      bonus: "+2 HARI"
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(prices[1]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
        }}
      />

      {/* Header */}
      <header className="border-b-4 border-black bg-yellow-400">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/key-generate" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black group-hover:bg-red-500 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter hidden sm:block">
              AKM.SCRIPT
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black">
              PREMIUM
            </div>
            <div className="w-3 h-3 bg-green-400 border-2 border-black" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Warning Banner */}
        <div className="mb-8 border-4 border-black bg-amber-400 p-4 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-black uppercase tracking-wider text-sm">PREMIUM ACCESS — NO BULLSHIT</p>
            <p className="font-bold mt-1">
              1.000 REQUESTS/DAY. NO SOCIAL REQUIREMENTS. INSTANT ACTIVATION.
            </p>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
            UPGRADE TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">PREMIUM</span>
          </h1>
          <p className="text-lg font-bold text-gray-600 max-w-2xl">
            Dapatkan akses penuh dengan 1.000 Request/hari dan fitur eksklusif lainnya.
            Bayar sekali, akses penuh.
          </p>
        </div>

        {/* Package Selection */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              PILIH PAKET
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prices.map((pkg) => (
              <button
                key={pkg.days}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative border-4 border-black p-6 text-left transition-all duration-200 ${
                  selectedPackage.days === pkg.days
                    ? "bg-black text-white translate-x-1 translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-black uppercase border-2 border-black">
                      BEST VALUE
                    </span>
                  </div>
                )}

                {pkg.savings > 0 && (
                  <div className="absolute -top-3 right-4">
                    <span className="px-2 py-1 bg-green-400 text-black text-xs font-black uppercase border-2 border-black">
                      -{pkg.savings}%
                    </span>
                  </div>
                )}

                <div className="text-3xl font-black mb-2">
                  {pkg.days} HARI
                </div>
                <div className="text-4xl font-black mb-1">
                  Rp{pkg.price.toLocaleString()}
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Rp{pkg.pricePerDay}/HARI
                </div>
                {pkg.bonus && (
                  <div className="inline-block px-2 py-1 bg-yellow-400 text-black text-xs font-black uppercase border-2 border-black">
                    {pkg.bonus}
                  </div>
                )}
                {pkg.days > 7 && (
                  <div className="text-xs font-bold text-green-600 mt-2 uppercase">
                    HEMAT Rp{((pkg.days / 7 * 10000) - pkg.price).toLocaleString()}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              METODE PEMBAYARAN
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setShowInstructions(true);
                }}
                className={`border-4 border-black p-4 transition-all duration-200 text-left ${
                  selectedMethod === method.id
                    ? `${method.color} text-white translate-x-1 translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                    : "bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                }`}
              >
                <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-sm mb-2">
                  {method.icon}
                </div>
                <div className="font-black uppercase tracking-wider">{method.name}</div>
                <div className="text-xs font-bold opacity-70 mt-1">
                  Click to pay
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions Panel */}
        {showInstructions && selectedMethod && (
          <div className="max-w-2xl mx-auto mb-12 border-4 border-black">
            <div className="border-b-4 border-black bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-black uppercase tracking-wider">PANDUAN PEMBAYARAN</h3>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-gray-100">
              {selectedMethod === "qris" ? (
                <div className="text-center">
                  <div className="border-4 border-black bg-white p-4 inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 border-2 border-black flex items-center justify-center">
                      <span className="font-black text-gray-500 text-sm uppercase">QR CODE</span>
                    </div>
                  </div>
                  <p className="font-bold text-gray-700">
                    Scan QR Code menggunakan DANA, OVO, atau GoPay
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-4 border-black bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      NOMOR PEMBAYARAN
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xl font-mono font-black">
                        {paymentMethods.find(m => m.id === selectedMethod)?.number}
                      </code>
                      <button
                        onClick={() => copyToClipboard(
                          paymentMethods.find(m => m.id === selectedMethod)?.number || ""
                        )}
                        className="p-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all"
                      >
                        {copied ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="border-4 border-black bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      NAMA PENERIMA
                    </div>
                    <div className="font-black text-lg">
                      {paymentMethods.find(m => m.id === selectedMethod)?.owner}
                    </div>
                  </div>

                  <div className="border-4 border-black bg-amber-400 p-4">
                    <div className="font-black uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      INFORMASI PENTING
                    </div>
                    <ul className="space-y-2 text-sm font-bold">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-black">1.</span>
                        <span>Transfer sesuai nominal: <strong className="border-b-2 border-black">Rp{selectedPackage.price.toLocaleString()}</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-black">2.</span>
                        <span>Sertakan 3 digit terakhir nomor WhatsApp di keterangan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-black">3.</span>
                        <span>Kirim bukti transfer ke WhatsApp</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open("https://wa.me/6289525032522", "_blank")}
                      className="flex-1 py-4 bg-green-500 text-white font-black uppercase tracking-wider border-4 border-black hover:bg-white hover:text-green-500 transition-all flex items-center justify-center gap-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      <MessageCircle className="w-5 h-5" />
                      KONFIRMASI WA
                    </button>
                    <button
                      onClick={() => {
                        alert(`Konfirmasi pembayaran Rp${selectedPackage.price.toLocaleString()} via WhatsApp\n\nSertakan bukti transfer dan 3 digit terakhir nomor WhatsApp.`);
                      }}
                      className="flex-1 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider border-4 border-black hover:bg-black hover:text-yellow-400 transition-all flex items-center justify-center gap-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      SUDAH TRANSFER
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              PERBANDINGAN FITUR
            </h2>
          </div>

          <div className="border-4 border-black">
            <div className="border-b-4 border-black bg-black text-white p-4">
              <h3 className="font-black uppercase tracking-wider text-center">
                FREE VS PREMIUM
              </h3>
            </div>
            <div>
              {[
                { feature: "Masa Aktif", free: "1 JAM", premium: `${selectedPackage.days} HARI`, highlight: false },
                { feature: "Limit Request", free: "50/KEY", premium: "1.000/HARI", highlight: true },
                { feature: "Total Request", free: "50", premium: `${selectedPackage.days * 1000}/PAKET`, highlight: false },
                { feature: "Follow Sosial Media", free: "REQUIRED", premium: "NO ✓", highlight: false },
                { feature: "Priority Support", free: "✕", premium: "24/7 ✓", highlight: false },
                { feature: "API Key Lifetime", free: "✕", premium: "✓", highlight: false },
                { feature: "Custom Endpoint", free: "✕", premium: "✓", highlight: false },
                { feature: "Auto Renewal", free: "✕", premium: "✓", highlight: false }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 flex justify-between items-center border-b-2 border-gray-200 ${
                    item.highlight ? 'bg-yellow-400' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <span className="font-bold text-sm uppercase tracking-wider">{item.feature}</span>
                  <div className="flex gap-8">
                    <span className="w-24 text-center text-sm font-bold text-gray-500">{item.free}</span>
                    <span className="w-24 text-center text-sm font-black text-black">{item.premium}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Premium */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              KENAPA PREMIUM?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "1.000 REQUEST/HARI", desc: "Cukup untuk project skala kecil hingga menengah", color: "bg-blue-500" },
              { icon: Clock, title: "AKSES PENUH 24/7", desc: "Tanpa batasan waktu dan sosial media", color: "bg-purple-500" },
              { icon: Shield, title: "GARANSI UANG KEMBALI", desc: "7 hari garansi jika tidak puas", color: "bg-green-500" }
            ].map((item, idx) => (
              <div key={idx} className="border-4 border-black p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 bg-white">
                <div className={`w-12 h-12 ${item.color} border-2 border-black flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-black uppercase tracking-tighter mb-2">{item.title}</h4>
                <p className="text-sm font-bold text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-4 border-black bg-gray-100 p-6">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, text: "Secure Payment" },
              { icon: Zap, text: "Instant Activation" },
              { icon: MessageCircle, text: "24/7 Support" },
              { icon: TrendingUp, text: "1.000 Req/hari" }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <badge.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-black uppercase tracking-wider">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">
            © 2026 AKM SCRIPT — PREMIUM TIER
          </p>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
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
        ::selection {
          background: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
}