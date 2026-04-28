"use client";

import { useState } from "react";

export default function Home() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [visited, setVisited] = useState({
    instagram: false,
    tiktok: false,
    youtube: false,
  });

  const visitedCount = Object.values(visited).filter(Boolean).length;
  const progress = (visitedCount / 3) * 100;
  const canCreate = visitedCount >= 1;

  const createKey = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/key?action=create`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data: { key: string } = await res.json();
      setKey(data.key);
    } catch (err) {
      console.error(err);
      setError("Failed to create key");
    } finally {
      setLoading(false);
    }
  };

  const handleVisit = (platform: keyof typeof visited, url: string) => {
    setVisited((prev) => ({ ...prev, [platform]: true }));
    window.open(url, "_blank");
  };

  const copyKey = async () => {
    if (!key) return;
    await navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialBtn = (
    name: keyof typeof visited,
    label: string,
    color: string,
    url: string
  ) => (
    <button
      onClick={() => handleVisit(name, url)}
      className={`flex items-center justify-between px-4 py-2 rounded-lg text-white ${color} hover:scale-[1.02] active:scale-[0.98] transition`}
    >
      <span>{label}</span>
      <span className="text-xs">
        {visited[name] ? "✓ Done" : "Open"}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-900 dark:to-black px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          AKM KEY GENERATOR
        </h1>

        <p className="text-sm text-center text-gray-500 mt-1">
          Kunjungi salah satu sosial media kami untuk mendapatkan akses API Key.
        </p>

        {/* Progress */}
        <div className="mt-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Social */}
        <div className="mt-5 flex flex-col gap-3">
          {socialBtn("instagram", "Instagram", "bg-pink-500", "https://instagram.com/muraaldb_")}
          {socialBtn("tiktok", "TikTok", "bg-black", "https://www.tiktok.com/@muraaldb")}
          {socialBtn("youtube", "YouTube", "bg-red-600", "https://www.youtube.com/@AKM_86")}
        </div>

        {/* Create */}
        <button
          onClick={createKey}
          disabled={!canCreate || loading}
          className="mt-6 w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Generate Key"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-3 text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* Result */}
        {key && (
          <div className="mt-5 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-500 mb-1">Your API Key</p>

            <div className="flex items-center gap-2">
              <code className="text-sm break-all flex-1 text-gray-800 dark:text-gray-200">
                {key}
              </code>

              <button
                onClick={copyKey}
                className="text-xs px-2 py-1 bg-zinc-300 dark:bg-zinc-700 rounded hover:opacity-80"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}