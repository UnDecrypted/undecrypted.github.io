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
  Users,
  CreditCard,
  Zap
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-400">ADMIN ACCESS</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-400 mt-2">
                  Masukkan kunci admin untuk mengelola API keys
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Secret Key
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan admin secret"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                
                <button
                  onClick={handleLogin}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Login as Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">Back to Home</span>
                </button>
              </Link>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500">Manage API Keys</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">Super User</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  localStorage.removeItem('admin_secret');
                  setIsAuthenticated(false);
                  setSecret("");
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Total Keys</div>
              <Key className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-500">All time</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Active Keys</div>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.active}</div>
            <div className="text-xs text-green-400">{stats.active} aktif</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Expired</div>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.expired}</div>
            <div className="text-xs text-red-400">Kadaluarsa</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Total Usage</div>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalUsage.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Requests</div>
          </div>
        </div>
        
        {/* Create Key Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" />
            Generate Premium Key
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setPlan(d as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  plan === d 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {d} Hari
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={createKey}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {loading ? "Generating..." : "Generate Premium Key"}
            </button>
            
            <button
              onClick={() => fetchKeys()}
              className="px-6 py-3 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Keys List */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">Daftar API Keys</h2>
              <p className="text-sm text-gray-400">Semua premium keys yang telah dibuat</p>
            </div>
            <div className="text-sm text-gray-500">
              Total: {keys.length} keys
            </div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {keys.length === 0 ? (
              <div className="p-8 text-center">
                <Key className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Belum ada API key</p>
                <p className="text-sm text-gray-500">Generate key premium pertama Anda</p>
              </div>
            ) : (
              keys.map((k, idx) => {
                const isExpired = !k.is_active || k.days_left <= 0;
                const usagePercent = (k.usage / k.limit) * 100;
                
                return (
                  <div key={k.key} className="p-4 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isExpired ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {isExpired ? 'Expired' : 'Active'}
                        </span>
                        {k.is_premium && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            Premium
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => deleteKey(k.key)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Key Display */}
                    <div className="flex items-center gap-2 mb-3">
                      <code className="flex-1 text-sm font-mono bg-gray-900 p-2 rounded-lg text-cyan-400">
                        {showKey[k.key] ? k.key : "•".repeat(40)}
                      </code>
                      <button
                        onClick={() => toggleShowKey(k.key)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        title={showKey[k.key] ? "Hide" : "Show"}
                      >
                        {showKey[k.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleCopyKey(k.key)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        title="Copy"
                      >
                        {copiedKey === k.key ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Hash className="w-3 h-3" /> Usage
                        </p>
                        <p className="text-gray-300">{k.usage?.toLocaleString() || 0} / {k.limit?.toLocaleString() || 0}</p>
                        <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                          <div 
                            className={`rounded-full h-1 ${usagePercent > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Activity className="w-3 h-3" /> Remaining
                        </p>
                        <p className="text-gray-300">{k.remaining?.toLocaleString() || 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Days Left
                        </p>
                        <p className={`font-semibold ${k.days_left <= 3 && k.days_left > 0 ? 'text-orange-400' : k.days_left <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {k.days_left > 0 ? `${k.days_left} hari` : 'Expired'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Expired At
                        </p>
                        <p className="text-gray-300 text-xs">{formatDate(k.expires_at)}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Quick Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white">Premium Features</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Unlimited key generation</li>
              <li>• Custom duration (7/30/90 days)</li>
              <li>• High request limits</li>
              <li>• Priority support</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-white">Security Notes</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Admin secret required for access</li>
              <li>• All keys are tracked</li>
              <li>• Usage logs available</li>
              <li>• Instant key revocation</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <h3 className="font-semibold text-white">Tips</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Monitor key usage regularly</li>
              <li>• Delete unused keys</li>
              <li>• Refresh to see latest stats</li>
              <li>• Keep admin secret safe</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Missing LogOut icon import
function LogOut(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}