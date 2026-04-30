"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  MessageCircle, 
  Wallet, 
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Copy,
  ExternalLink,
  AlertCircle,
  TrendingUp,
  Gift
} from "lucide-react";

export default function PremiumBuyPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const paymentMethods = [
    {
      id: "dana",
      name: "DANA",
      icon: "💙",
      color: "from-blue-500 to-blue-600",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "ovo",
      name: "OVO",
      icon: "💜",
      color: "from-purple-500 to-purple-600",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: "💚",
      color: "from-green-500 to-green-600",
      number: "089525032522",
      owner: "Muhammad Raihan Ali"
    },
    {
      id: "qris",
      name: "QRIS",
      icon: "📱",
      color: "from-indigo-500 to-indigo-600",
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
      bonus: "+1 Hari Gratis"
    },
    { 
      days: 90, 
      price: 90000, 
      popular: false, 
      savings: 30,
      pricePerDay: "1.000",
      bonus: "+2 Hari Gratis"
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(prices[1]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4 animate-pulse">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">PREMIUM ACCESS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dapatkan akses penuh dengan <span className="text-amber-400 font-semibold">1.000 Request/hari</span> dan fitur eksklusif lainnya
          </p>
        </div>

        {/* Package Selection */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Pilih Masa Aktif
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {prices.map((pkg) => (
              <button
                key={pkg.days}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedPackage.days === pkg.days
                    ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500 shadow-lg shadow-amber-500/20"
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                      🔥 BEST VALUE
                    </span>
                  </div>
                )}

                {pkg.savings > 0 && (
                  <div className="absolute -top-3 -right-0">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white">
                      {pkg.savings}%
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {pkg.days} Days
                  </div>
                  <div className="text-3xl font-bold text-amber-400 mb-1">
                    Rp{pkg.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Rp{pkg.pricePerDay}/hari
                  </div>
                  {pkg.bonus && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-xs text-pink-400 mt-2">
                      <Gift className="w-3 h-3" />
                      {pkg.bonus}
                    </div>
                  )}
                  {pkg.days > 7 && (
                    <div className="text-xs text-green-400 mt-2">
                      💰 Hemat Rp{((pkg.days / 7 * 10000) - pkg.price).toLocaleString()}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Metode Pembayaran
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setShowInstructions(true);
                }}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedMethod === method.id
                    ? `bg-gradient-to-br ${method.color} shadow-lg`
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <div className="font-semibold text-white">{method.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Click to pay
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && selectedMethod && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  Panduan Pembayaran
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {selectedMethod === "qris" ? (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl inline-block mb-4">
                    {/* Placeholder for QR Code - Replace with actual QR code image */}
                    <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">QR Code</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Scan QR Code di atas menggunakan aplikasi DANA, OVO, atau GoPay
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Nomor Pembayaran</div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-lg font-mono text-white">
                        {paymentMethods.find(m => m.id === selectedMethod)?.number}
                      </code>
                      <button
                        onClick={() => copyToClipboard(
                          paymentMethods.find(m => m.id === selectedMethod)?.number || ""
                        )}
                        className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                      >
                        {copied ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Nama Penerima</div>
                    <div className="text-white font-medium">
                      {paymentMethods.find(m => m.id === selectedMethod)?.owner}
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Informasi Penting
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">1.</span>
                        <span>Transfer sesuai dengan nominal paket yang dipilih: <strong className="text-white">Rp{selectedPackage.price.toLocaleString()}</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">2.</span>
                        <span>Sertakan 3 digit terakhir nomor WhatsApp di keterangan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">3.</span>
                        <span>Kirim bukti transfer ke WhatsApp di bawah</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open("https://wa.me/6289525032522", "_blank")}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition transform hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Konfirmasi via WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        alert(`Silahkan konfirmasi pembayaran Rp${selectedPackage.price.toLocaleString()} via WhatsApp\n\nSertakan bukti transfer dan 3 digit terakhir nomor WhatsApp Anda.`);
                      }}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-600 transition transform hover:scale-105"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Sudah Transfer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="mt-16">
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white text-center flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                Perbandingan Fitur
              </h3>
            </div>
            <div className="divide-y divide-gray-700">
              {[
                { feature: "Masa Aktif", free: "1 Jam", premium: `${selectedPackage.days} Hari`, premiumHighlight: false },
                { feature: "Limit Request", free: "50/key", premium: "1.000/hari", premiumHighlight: true },
                { feature: "Total Request", free: "50", premium: `${selectedPackage.days * 1000}/paket`, premiumHighlight: false },
                { feature: "Follow Sosial Media", free: "Required", premium: "No Required ✓", premiumHighlight: false },
                { feature: "Priority Support", free: "✕", premium: "✓ 24/7", premiumHighlight: false },
                { feature: "API Key Lifetime", free: "✕", premium: "✓", premiumHighlight: false },
                { feature: "Custom Endpoint", free: "✕", premium: "✓", premiumHighlight: false },
                { feature: "Auto Renewal", free: "✕", premium: "✓", premiumHighlight: false }
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-800/30 transition-colors">
                  <span className="text-gray-400 text-sm">{item.feature}</span>
                  <div className="flex gap-8">
                    <span className="text-gray-500 w-24 text-center text-sm">{item.free}</span>
                    <span className={`w-24 text-center text-sm font-semibold ${item.premiumHighlight ? 'text-amber-400' : 'text-amber-400'}`}>
                      {item.premium}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Premium Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">1.000 Request/hari</h4>
            <p className="text-xs text-gray-400">Cukup untuk project skala kecil hingga menengah</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Akses Penuh 24/7</h4>
            <p className="text-xs text-gray-400">Tanpa batasan waktu dan sosial media</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Garansi Uang Kembali</h4>
            <p className="text-xs text-gray-400">7 hari garansi jika tidak puas</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Instant Activation</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">1.000 Req/hari</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}