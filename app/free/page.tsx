"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Copy,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Shield,
  Clock,
  Hash,
  Sparkles,
  Loader2,
  Tv,
  MessageCircle
} from "lucide-react";

export default function FreeKeyPage() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [canGenerate, setCanGenerate] = useState(true);
  const [cooldownTime, setCooldownTime] = useState<number | null>(null);

  const [visited, setVisited] = useState({
    instagram: false,
    tiktok: false,
    youtube: false,
    whatsapp: false
  });

  const visitedCount = Object.values(visited).filter(Boolean).length;
  const progress = (visitedCount / 4) * 100;
  const canCreate = visitedCount >= 1 && canGenerate;

  useEffect(() => {
    const lastGenerate = localStorage.getItem('lastGenerateTime');
    if (lastGenerate) {
      const timeSinceLast = Math.floor((Date.now() - parseInt(lastGenerate)) / 1000);
      if (timeSinceLast < 3600) {
        setCanGenerate(false);
        setCooldownTime(3600 - timeSinceLast);
      }
    }
  }, []);

  useEffect(() => {
    if (!canGenerate && cooldownTime && cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(prev => {
          if (prev && prev <= 1) {
            setCanGenerate(true);
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [canGenerate, cooldownTime]);

  useEffect(() => {
    if (key) {
      setTimeLeft(3600);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev > 0) return prev - 1;
          clearInterval(timer);
          if (prev === 1) {
            setKey(null);
          }
          return 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [key]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}j ${minutes}m ${secs}d`;
    }
    return `${minutes}m ${secs}d`;
  };

  const createKey = async () => {
    if (!canCreate) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/key?action=create&plan=free`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data: { key: string } = await res.json();
      setKey(data.key);
      
      setCanGenerate(false);
      setCooldownTime(3600);
      localStorage.setItem('lastGenerateTime', Date.now().toString());
      
    } catch (err) {
      console.error(err);
      setError("Failed to create key");
    } finally {
      setLoading(false);
    }
  };

  const handleVisit = (platform: keyof typeof visited, url: string) => {
    if (!visited[platform]) {
      setVisited((prev) => ({ ...prev, [platform]: true }));
      window.open(url, "_blank");
    }
  };

  const copyKey = async () => {
    if (!key) return;
    await navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialButtons = [
    { name: "instagram", label: "Instagram", icon: "📸", color: "from-pink-500 to-rose-500", url: "https://instagram.com/muraaldb_" },
    { name: "tiktok", label: "TikTok", icon: "🎵", color: "from-black to-gray-800", url: "https://www.tiktok.com/@muraaldb" },
    { name: "youtube", label: "YouTube", icon: "▶️", color: "from-red-600 to-red-700", url: "https://www.youtube.com/@AKM_86" },
    { name: "whatsapp", label: "WhatsApp", icon: "💬", color: "from-green-500 to-green-600", url: "https://wa.me/6289525032522" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      
      <div className="max-w-md mx-auto mb-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </button>
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20"></div>
          
          <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400">FREE TIER</span>
              </div>
              
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Free API Key Generator
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Kunjungi salah satu sosial media kami untuk mendapatkan akses
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-900/50 rounded-lg p-3 text-center border border-gray-700">
                <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs text-gray-500">Key Expired</div>
                <div className="text-sm font-semibold text-white">
                  {key && timeLeft ? formatTime(timeLeft) : "1 Jam"}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center border border-gray-700">
                <Hash className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs text-gray-500">Request Limit</div>
                <div className="text-sm font-semibold text-white">50 / Key</div>
              </div>
            </div>

            {!canGenerate && cooldownTime && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Cooldown: Tunggu {formatTime(cooldownTime)} sebelum generate key baru</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Progress Verifikasi</span>
                <span>{visitedCount}/4 Social Media</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {canCreate ? "✅ Siap generate key!" : !canGenerate ? "⏰ Cooldown aktif" : "⚠️ Kunjungi minimal 1 sosial media"}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {socialButtons.map((social) => {
                const isVisited = visited[social.name as keyof typeof visited];
                
                return (
                  <button
                    key={social.name}
                    onClick={() => handleVisit(social.name as keyof typeof visited, social.url)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      isVisited 
                        ? 'bg-gray-700/50 border border-green-500/50 cursor-default'
                        : `bg-gradient-to-r ${social.color} shadow-lg hover:shadow-xl`
                    }`}
                    disabled={isVisited}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{social.icon}</span>
                      <span className="text-white font-medium">{social.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isVisited ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-400">Verified</span>
                        </>
                      ) : (
                        <span className="text-xs text-white/70">Kunjungi →</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={createKey}
              disabled={!canCreate || loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                canCreate && !loading
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate API Key</span>
                </div>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {key && (
              <div className="mt-6 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-cyan-500/20 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    YOUR API KEY
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Expires: {timeLeft && timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3 border border-gray-700">
                  <code className="text-sm font-mono text-cyan-400 break-all flex-1">
                    {key}
                  </code>

                  <button
                    onClick={copyKey}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  🔒 Simpan kode ini dengan aman. Key akan expired dalam 1 jam.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-500">
                🚀 Butuh lebih banyak request? 
                <Link href="/premium" className="text-amber-400 hover:text-amber-300 ml-1">
                  Upgrade ke Premium
                </Link>
              </p>
            </div>

          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 text-center">
            <div className="text-xs text-gray-500">⏱️ Cooldown Generate</div>
            <div className="text-sm font-semibold text-amber-400">1 Jam</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 text-center">
            <div className="text-xs text-gray-500">🔄 Auto Reset</div>
            <div className="text-sm font-semibold text-cyan-400">Setiap 1 Jam</div>
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
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}