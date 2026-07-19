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
  Terminal,
  AlertTriangle,
  X,
  ArrowRight
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
    { name: "instagram", label: "INSTAGRAM", icon: "IG", color: "bg-pink-500", url: "https://instagram.com/muraaldb_" },
    { name: "tiktok", label: "TIKTOK", icon: "TT", color: "bg-black", url: "https://www.tiktok.com/@muraaldb" },
    { name: "youtube", label: "YOUTUBE", icon: "YT", color: "bg-red-500", url: "https://www.youtube.com/@AKM_86" },
    { name: "whatsapp", label: "WHATSAPP", icon: "WA", color: "bg-green-500", url: "https://wa.me/6289525032522" }
  ];

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
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/key-generate" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black group-hover:bg-red-500 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter hidden sm:block">
              AKM.SCRIPT
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 border-2 border-black" />
            <span className="text-xs font-black uppercase tracking-wider">SYSTEM OK</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Warning Banner */}
        <div className="mb-6 border-4 border-black bg-red-500 text-white p-4 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-black uppercase tracking-wider text-sm">FREE TIER LIMITATIONS</p>
            <p className="text-sm font-bold mt-1 opacity-90">
              1 HOUR ACCESS. 50 REQUESTS. 1 HOUR COOLDOWN. NO EXCEPTIONS.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="border-4 border-black bg-white">
          {/* Card Header */}
          <div className="border-b-4 border-black bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6" />
              <h1 className="text-xl font-black uppercase tracking-tighter">FREE KEY GENERATOR</h1>
            </div>
            <div className="px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase border-2 border-white">
              V1.0
            </div>
          </div>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border-4 border-black p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">KEY EXPIRES</span>
                </div>
                <div className="text-2xl font-black">
                  {key && timeLeft ? formatTime(timeLeft) : "1 JAM"}
                </div>
              </div>
              <div className="border-4 border-black p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">REQUEST LIMIT</span>
                </div>
                <div className="text-2xl font-black">50 / KEY</div>
              </div>
            </div>

            {/* Cooldown Warning */}
            {!canGenerate && cooldownTime && (
              <div className="mb-6 border-4 border-black bg-amber-400 p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-black uppercase text-sm">COOLDOWN ACTIVE</p>
                  <p className="font-bold mt-1">
                    Tunggu {formatTime(cooldownTime)} sebelum generate key baru.
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                <span>VERIFIKASI PROGRESS</span>
                <span>{visitedCount}/4 SOCIAL</span>
              </div>
              <div className="w-full h-6 border-4 border-black bg-gray-200">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-bold mt-2 uppercase">
                {canCreate ? (
                  <span className="text-green-600">✓ READY TO GENERATE</span>
                ) : !canGenerate ? (
                  <span className="text-amber-600">⏱ COOLDOWN AKTIF</span>
                ) : (
                  <span className="text-red-600">✕ KUNJUNGI MINIMAL 1 SOCIAL MEDIA</span>
                )}
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 mb-6">
              {socialButtons.map((social) => {
                const isVisited = visited[social.name as keyof typeof visited];

                return (
                  <button
                    key={social.name}
                    onClick={() => handleVisit(social.name as keyof typeof visited, social.url)}
                    disabled={isVisited}
                    className={`w-full flex items-center justify-between px-4 py-4 border-4 border-black transition-all duration-200 ${
                      isVisited 
                        ? 'bg-gray-100 cursor-default opacity-60'
                        : `${social.color} hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-sm">
                        {social.icon}
                      </div>
                      <span className={`font-black uppercase tracking-wider ${isVisited ? 'text-gray-500' : 'text-white'}`}>
                        {social.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isVisited ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-black uppercase text-green-600">DONE</span>
                        </>
                      ) : (
                        <span className="text-xs font-black uppercase text-white">VISIT →</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Generate Button */}
            <button
              onClick={createKey}
              disabled={!canCreate || loading}
              className={`w-full py-4 border-4 border-black font-black uppercase tracking-wider text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                canCreate && !loading
                  ? 'bg-black text-white hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>GENERATING...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>GENERATE API KEY</span>
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="mt-4 border-4 border-black bg-red-500 text-white p-4 flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="font-bold">{error}</p>
              </div>
            )}

            {/* Key Display */}
            {key && (
              <div className="mt-6 border-4 border-black bg-gray-100">
                <div className="border-b-4 border-black bg-black text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider">YOUR API KEY</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Clock className="w-3 h-3" />
                    <span>EXP: {timeLeft && timeLeft > 0 ? formatTime(timeLeft) : 'EXPIRED'}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 border-4 border-black bg-white p-3">
                    <code className="text-sm font-mono break-all flex-1 text-black">
                      {key}
                    </code>

                    <button
                      onClick={copyKey}
                      className="p-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all flex-shrink-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-wider text-center">
                    ⚠ SIMPAN KEY INI. AKAN HILANG SAAT EXPIRED.
                  </p>
                </div>
              </div>
            )}

            {/* Upgrade CTA */}
            <div className="mt-6 border-t-4 border-black pt-4 text-center">
              <p className="text-sm font-bold text-gray-600">
                BUTUH LEBIH BANYAK REQUEST?
              </p>
              <Link href="/key-generate/premium" className="inline-flex items-center gap-2 mt-2 px-6 py-2 bg-yellow-400 text-black font-black uppercase tracking-wider border-4 border-black hover:bg-black hover:text-yellow-400 transition-all">
                <span>UPGRADE PREMIUM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border-4 border-black p-4 bg-cyan-400">
            <div className="text-xs font-black uppercase tracking-wider mb-1">COOLDOWN</div>
            <div className="text-2xl font-black">1 JAM</div>
          </div>
          <div className="border-4 border-black p-4 bg-green-400">
            <div className="text-xs font-black uppercase tracking-wider mb-1">AUTO RESET</div>
            <div className="text-2xl font-black">SETIAP 1 JAM</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-6 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">
            © 2026 AKM SCRIPT — FREE TIER
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
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