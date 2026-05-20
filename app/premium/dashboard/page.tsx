"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Key,
  Plus,
  Trash2,
  RefreshCw,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Hash,
  User,
  Shield,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
  BarChart3,
  Zap,
  Terminal,
  AlertTriangle,
  X
} from "lucide-react";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [plan, setPlan] = useState<7 | 30 | 90>(30);
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({});
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    totalUsage: 0
  });

  // Auto fetch keys if secret exists
  useEffect(() => {
    const savedSecret = localStorage.getItem('admin_secret');
    if (savedSecret) {
      setSecret(savedSecret);
      authenticate(savedSecret);
    }
  }, []);

  const authenticate = async (adminSecret: string) => {
    try {
      const res = await fetch(`/api/key?action=list`, {
        headers: { "x-admin-key": adminSecret },
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_secret', adminSecret);
        fetchKeys(adminSecret);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async () => {
    if (!secret) return;
    await authenticate(secret);
  };

  const fetchKeys = async (adminSecret?: string) => {
    const secretKey = adminSecret || secret;
    if (!secretKey) return;

    const res = await fetch(`/api/key?action=list`, {
      headers: { "x-admin-key": secretKey },
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("API ERROR:", data);
      alert(data.error || "Failed to load keys");
      return;
    }

    setKeys(data);

    // Update stats
    const active = data.filter(k => k.is_active && k.days_left > 0).length;
    const expired = data.filter(k => !k.is_active || k.days_left <= 0).length;
    const totalUsage = data.reduce((sum, k) => sum + (k.usage || 0), 0);

    setStats({
      total: data.length,
      active,
      expired,
      totalUsage
    });
  };

  const createKey = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/key?action=create&plan=premium&days=${plan}`, {
        headers: { "x-admin-key": secret },
      });
      const data = await res.json();
      if (data.key) {
        await fetchKeys();
      } else {
        alert(data.error || "Failed to create key");
      }
    } catch (err) {
      alert("Error creating key");
    } finally {
      setLoading(false);
    }
  };

  const deleteKey = async (k: string) => {
    if (!confirm("Yakin ingin menghapus key ini? Key yang dihapus tidak bisa digunakan lagi!")) return;

    await fetch(`/api/key?action=delete&key=${k}`, {
      headers: { "x-admin-key": secret },
    });
    await fetchKeys();
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleShowKey = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('id-ID');
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        {/* Scanline overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
          }}
        />

        <header className="border-b-4 border-black bg-yellow-400">
          <div className="max-w-md mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black group-hover:bg-red-500 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black uppercase tracking-tighter">AKM.SCRIPT</span>
            </Link>
          </div>
        </header>

        <main className="flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="border-4 border-black">
              <div className="border-b-4 border-black bg-black text-white p-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-black uppercase tracking-wider border-2 border-white mb-2">
                  <Shield className="w-3 h-3" />
                  RESTRICTED ACCESS
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">ADMIN LOGIN</h1>
              </div>

              <div className="p-6 bg-gray-100">
                <div className="mb-6">
                  <label className="block text-sm font-black uppercase tracking-wider mb-2">
                    ADMIN SECRET KEY
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan admin secret"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-3 bg-white border-4 border-black text-black font-mono font-bold focus:outline-none focus:bg-yellow-50 transition-colors"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-4 bg-black text-white font-black uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  LOGIN AS ADMIN
                </button>

                <p className="text-xs font-bold text-gray-500 mt-4 text-center uppercase tracking-wider">
                  ⚠ UNAUTHORIZED ACCESS WILL BE LOGGED
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
        }}
      />

      {/* Header */}
      <header className="border-b-4 border-black bg-black text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-white text-black flex items-center justify-center border-2 border-white group-hover:bg-yellow-400 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5" />
                <div>
                  <h1 className="text-lg font-black uppercase tracking-tighter">ADMIN DASHBOARD</h1>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">MANAGE API KEYS</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-400 border-2 border-white flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-black">ADMIN</p>
                  <p className="text-xs font-bold text-gray-400 uppercase">SUPER USER</p>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem('admin_secret');
                  setIsAuthenticated(false);
                  setSecret("");
                }}
                className="p-2 bg-red-500 text-white border-2 border-white hover:bg-white hover:text-red-500 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "TOTAL KEYS", value: stats.total, sub: "ALL TIME", icon: Key, color: "bg-purple-500" },
            { label: "ACTIVE", value: stats.active, sub: `${stats.active} AKTIF`, icon: CheckCircle, color: "bg-green-500" },
            { label: "EXPIRED", value: stats.expired, sub: "KADALUARSA", icon: XCircle, color: "bg-red-500" },
            { label: "TOTAL USAGE", value: stats.totalUsage.toLocaleString(), sub: "REQUESTS", icon: Activity, color: "bg-blue-500" }
          ].map((stat, idx) => (
            <div key={idx} className="border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-500">{stat.label}</span>
                <div className={`w-6 h-6 ${stat.color} border-2 border-black flex items-center justify-center`}>
                  <stat.icon className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-xs font-bold text-gray-500 uppercase mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Create Key Section */}
        <div className="border-4 border-black mb-8">
          <div className="border-b-4 border-black bg-black text-white p-4 flex items-center gap-3">
            <Plus className="w-5 h-5" />
            <h2 className="font-black uppercase tracking-wider">GENERATE PREMIUM KEY</h2>
          </div>

          <div className="p-6 bg-gray-100">
            <div className="flex flex-wrap gap-3 mb-4">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setPlan(d as any)}
                  className={`px-6 py-3 font-black uppercase tracking-wider border-4 border-black transition-all duration-200 ${
                    plan === d
                      ? "bg-black text-white translate-x-1 translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                  }`}
                >
                  {d} HARI
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={createKey}
                disabled={loading}
                className={`flex-1 py-4 font-black uppercase tracking-wider border-4 border-black transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {loading ? "GENERATING..." : "GENERATE KEY"}
              </button>

              <button
                onClick={() => fetchKeys()}
                className="px-6 py-4 bg-white text-black font-black uppercase tracking-wider border-4 border-black hover:bg-black hover:text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                REFRESH
              </button>
            </div>
          </div>
        </div>

        {/* Keys List */}
        <div className="border-4 border-black">
          <div className="border-b-4 border-black bg-black text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-black uppercase tracking-wider">DAFTAR API KEYS</h2>
              <p className="text-xs font-bold text-gray-400 uppercase">SEMUA PREMIUM KEYS</p>
            </div>
            <div className="px-3 py-1 bg-white text-black text-xs font-black uppercase border-2 border-white">
              TOTAL: {keys.length}
            </div>
          </div>

          <div>
            {keys.length === 0 ? (
              <div className="p-8 text-center border-b-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-200 border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-gray-500" />
                </div>
                <p className="font-black text-lg mb-2">BELUM ADA API KEY</p>
                <p className="text-sm font-bold text-gray-500">Generate key premium pertama Anda</p>
              </div>
            ) : (
              keys.map((k, idx) => {
                const isExpired = !k.is_active || k.days_left <= 0;
                const usagePercent = (k.usage / k.limit) * 100;

                return (
                  <div key={k.key} className={`p-4 border-b-2 border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    {/* Status Bar */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 border-2 border-black ${isExpired ? 'bg-red-500' : 'bg-green-500'}`} />
                        <span className={`text-xs px-2 py-1 font-black uppercase border-2 border-black ${
                          isExpired ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {isExpired ? 'EXPIRED' : 'ACTIVE'}
                        </span>
                        {k.is_premium && (
                          <span className="text-xs px-2 py-1 font-black uppercase border-2 border-black bg-yellow-400 text-black">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => deleteKey(k.key)}
                        className="p-2 bg-red-500 text-white border-2 border-black hover:bg-white hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Key Display */}
                    <div className="flex items-center gap-2 mb-4">
                      <code className="flex-1 text-sm font-mono font-bold bg-gray-200 border-2 border-black p-3 break-all">
                        {showKey[k.key] ? k.key : "•".repeat(40)}
                      </code>
                      <button
                        onClick={() => toggleShowKey(k.key)}
                        className="p-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all"
                        title={showKey[k.key] ? "Hide" : "Show"}
                      >
                        {showKey[k.key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => handleCopyKey(k.key)}
                        className="p-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all"
                        title="Copy"
                      >
                        {copiedKey === k.key ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="border-2 border-black p-2">
                        <p className="text-xs font-black uppercase text-gray-500 mb-1">USAGE</p>
                        <p className="font-bold text-sm">
                          {k.usage?.toLocaleString() || 0} / {k.limit?.toLocaleString() || 0}
                        </p>
                        <div className="w-full bg-gray-300 h-2 mt-1 border border-black">
                          <div
                            className={`h-full border-r-2 border-black ${usagePercent > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="border-2 border-black p-2">
                        <p className="text-xs font-black uppercase text-gray-500 mb-1">DAILY</p>
                        <p className="font-bold text-sm">
                          {k.daily_usage || 0} / 1000
                        </p>
                      </div>

                      <div className="border-2 border-black p-2">
                        <p className="text-xs font-black uppercase text-gray-500 mb-1">REMAINING</p>
                        <p className="font-bold text-sm">
                          {k.remaining?.toLocaleString() || 0}
                        </p>
                      </div>

                      <div className="border-2 border-black p-2">
                        <p className="text-xs font-black uppercase text-gray-500 mb-1">DAYS LEFT</p>
                        <p className={`font-black text-sm ${
                          k.days_left <= 3 && k.days_left > 0
                            ? 'text-amber-600'
                            : k.days_left <= 0
                              ? 'text-red-600'
                              : 'text-green-600'
                        }`}>
                          {k.days_left > 0 ? `${k.days_left} HARI` : 'EXPIRED'}
                        </p>
                      </div>

                      <div className="border-2 border-black p-2">
                        <p className="text-xs font-black uppercase text-gray-500 mb-1">LAST USED</p>
                        <p className="font-bold text-xs">
                          {k.last_used_date
                            ? new Date(k.last_used_date).toLocaleDateString("id-ID")
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              icon: Zap, 
              title: "PREMIUM FEATURES", 
              items: ["Unlimited key generation", "Custom duration (7/30/90 days)", "High request limits", "Priority support"],
              color: "bg-yellow-400"
            },
            { 
              icon: Shield, 
              title: "SECURITY NOTES", 
              items: ["Admin secret required", "All keys are tracked", "Usage logs available", "Instant key revocation"],
              color: "bg-blue-500"
            },
            { 
              icon: BarChart3, 
              title: "TIPS", 
              items: ["Monitor key usage regularly", "Delete unused keys", "Refresh to see latest stats", "Keep admin secret safe"],
              color: "bg-green-500"
            }
          ].map((section, idx) => (
            <div key={idx} className="border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 ${section.color} border-2 border-black flex items-center justify-center`}>
                  <section.icon className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-black uppercase tracking-wider text-sm">{section.title}</h3>
              </div>
              <ul className="text-sm font-bold text-gray-600 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500">
            © 2026 AKM SCRIPT — ADMIN CONSOLE
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 border-2 border-white" />
            <span className="text-xs font-black uppercase">SYSTEM OK</span>
          </div>
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