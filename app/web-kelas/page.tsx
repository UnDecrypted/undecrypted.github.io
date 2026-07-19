"use client";

import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

// ============================================================
// DATA
// ============================================================
const students = [
  { name: "Ahmad Dhani", nim: "01", initials: "AD", quote: "Semoga kita tetap bersama meski jalannya berbeda." },
  { name: "Bella Sari", nim: "02", initials: "BS", quote: "Terima kasih sudah jadi teman terbaikku." },
  { name: "Citra Rani", nim: "03", initials: "CR", quote: "Kenangan kelas ini akan selalu di hati." },
  { name: "Dafa Fauzan", nim: "04", initials: "DF", quote: "Dari nol sampai di sini, bareng kalian semua." },
  { name: "Elsa Lestari", nim: "05", initials: "EL", quote: "Jangan lupa makan siang bareng di kantin ya!" },
  { name: "Fajar Adi", nim: "06", initials: "FA", quote: "Fisika sulit, tapi persahabatan lebih mudah." },
  { name: "Gita Wulandari", nim: "07", initials: "GW", quote: "Terima kasih atas tawa dan tangis bersama." },
  { name: "Hendra Rizky", nim: "08", initials: "HR", quote: "Semoga sukses semua, teman-temanku!" },
  { name: "Indah Permata", nim: "09", initials: "IP", quote: "Kelas ini adalah rumah kedua bagiku." },
  { name: "Joko Santoso", nim: "10", initials: "JS", quote: "Bersama kalian, setiap hari adalah petualangan." },
  { name: "Kirana Dewi", nim: "11", initials: "KD", quote: "Terima kasih sudah menerima aku apa adanya." },
  { name: "Lukman Hakim", nim: "12", initials: "LH", quote: "Dari tugas kelompok sampai curhat malam, semuanya berharga." },
  { name: "Made Wirawan", nim: "13", initials: "MW", quote: "Bali boleh jauh, kita tetap dekat di hati." },
  { name: "Nadia Putri", nim: "14", initials: "NP", quote: "Terima kasih buat semua tawa receh kita." },
  { name: "Oscar Pratama", nim: "15", initials: "OP", quote: "Grup chat kita gak pernah sepi, ya kan?" },
  { name: "Putri Ayu", nim: "16", initials: "PA", quote: "Semoga next reunian rame kayak dulu." },
  { name: "Qori Ramadhan", nim: "17", initials: "QR", quote: "Makasih udah anter aku pas motor mogok." },
  { name: "Rani Puspita", nim: "18", initials: "RP", quote: "Kelas ini juara piknik dadakan sedunia." },
  { name: "Satria Nugraha", nim: "19", initials: "SN", quote: "Titip kelas ini ya buat adik kelas nanti." },
  { name: "Tania Salsabila", nim: "20", initials: "TS", quote: "Terima kasih sudah selalu dengerin curhatanku." },
  { name: "Umar Faisal", nim: "21", initials: "UF", quote: "Semangat UTBK buat kita semua!" },
  { name: "Vina Marlina", nim: "22", initials: "VM", quote: "Kalian rumah paling nyaman selama ini." },
  { name: "Wahyu Setiawan", nim: "23", initials: "WS", quote: "Sukses buat kita semua, di mana pun nanti." },
  { name: "Yuni Kartika", nim: "24", initials: "YK", quote: "Terima kasih sudah jadi bagian ceritaku." },
  { name: "Zaki Firmansyah", nim: "25", initials: "ZF", quote: "Jangan lupain aku walau udah pisah kelas." },
  { name: "Aditya Nugroho", nim: "26", initials: "AN", quote: "Kenangan kita bakal aku simpan rapi-rapi." },
  { name: "Bunga Larasati", nim: "27", initials: "BL", quote: "See you on top, guys!" },
  { name: "Cahyo Prasetyo", nim: "28", initials: "CP", quote: "Makasih buat semua drama receh kita." },
  { name: "Dinda Ayunda", nim: "29", initials: "DA", quote: "Semoga kita semua sukses ke depannya." },
  { name: "Eka Saputra", nim: "30", initials: "ES", quote: "Kelas ini bukan cuma angkatan, tapi keluarga." },
  { name: "Farah Anindya", nim: "31", initials: "FA", quote: "Terima kasih sudah menemani sampai akhir." },
  { name: "Galih Prakoso", nim: "32", initials: "GP", quote: "Sampai ketemu di angkatan sukses, teman-teman!" },
];

const photos = [
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", label: "Hari Pertama Sekolah" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80", label: "Foto Bersama Wali Kelas", tall: true },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", label: "Belajar Bareng di Perpustakaan" },
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80", label: "Acara Kelas" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80", label: "Momen Perpisahan", wide: true },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80", label: "Senang-senang Bareng" },
];

const timelineEvents = [
  { date: "Juli 2025", title: "Pertemuan Pertama", desc: "Hari pertama masuk kelas XI-1 IPA. Masih canggung, masih saling lirik-lirikan. Siapa sangka kita bakal sedekat ini?" },
  { date: "Agustus 2025", title: "MOS & Adaptasi", desc: "Masa orientasi yang penuh tantangan. Tapi justru di sinilah kita mulai saling kenal dan saling bantu." },
  { date: "Desember 2025", title: "Ujian Semester 1", desc: "Belajar bareng sampai larut malam, ngopi bareng, nangis bareng karena PR numpuk. Tapi kita lewatin semua." },
  { date: "Februari 2026", title: "Study Tour", desc: "Perjalanan yang paling ditunggu. Banyak tawa, banyak foto, dan banyak cerita yang gak bakal terlupakan." },
  { date: "Juni 2026", title: "Menuju Ujian", desc: "Semakin dekat ujian, semakin dekat juga perpisahan. Tapi kita janji, ini bukan akhir." },
];

const messages = [
  {
    text: "Kelas XI-1 IPA bukan cuma ruang belajar. Ini adalah tempat di mana aku menemukan diriku sendiri, menemukan teman-teman yang bakal jadi saudara, dan menemukan kenangan yang bakal jadi bagian dari hidupku selamanya.",
    name: "Andi Rahman", role: "Ketua Kelas", initials: "AR",
  },
  {
    text: "Terima kasih sudah jadi kelas yang paling berisik tapi paling hangat. Terima kasih sudah nemenin aku di hari-hari terberat. Kalian adalah alasan kenapa aku semangat datang ke sekolah setiap pagi.",
    name: "Sinta Ningrum", role: "Sekretaris Kelas", initials: "SN",
  },
  {
    text: "Dari yang gak kenal sama sekali, sampai sekarang udah kayak keluarga sendiri. Semoga setelah lulus nanti, kita tetap saling ingat dan saling doakan. XI-1 IPA selamanya di hati!",
    name: "Rio Bagas", role: "Bendahara Kelas", initials: "RB",
  },
];

// Fixed per-card jitter so re-renders don't reshuffle the "handmade" feel
const jitter = (i: number, amp: number = 3): string => {
  const seedVals = [-1, 1, -0.6, 0.8, -0.3, 1.2, -1.4, 0.5, -0.9, 1.6, -0.4, 0.9];
  return (seedVals[i % seedVals.length] * amp).toFixed(2);
};
const tapeColors = ["var(--tape-teal)", "var(--tape-mustard)", "var(--rose)"];

// ============================================================
// STYLES — Scrapbook / corkboard yearbook
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --paper: #F6F0E2;
    --paper-deep: #ECE2CB;
    --cork: #A9835C;
    --cork-deep: #8E6A47;
    --ink: #2A2420;
    --ink-soft: #675C4E;
    --stamp: #B5473E;
    --tape-teal: #5C8C82;
    --tape-mustard: #E0A93C;
    --rose: #C97B86;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--cork-deep) var(--paper-deep);
  }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: var(--paper-deep); }
  ::-webkit-scrollbar-thumb {
    background: var(--cork-deep);
    border-radius: 999px;
    border: 2px solid var(--paper-deep);
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--stamp); }

  body {
    font-family: Georgia, serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.55;
    overflow-x: hidden;
  }

  .display {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-weight: 400;
  }

  .hand {
    font-family: 'Caveat', cursive;
    font-weight: 600;
  }

  .mono {
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.06em;
  }

  a, button { font-family: inherit; }

  /* paper grain, everywhere */
  .grain {
    position: relative;
  }
  .grain::after {
    content: "";
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(42,36,32,0.05) 1px, transparent 1px);
    background-size: 3px 3px;
    mix-blend-mode: multiply;
  }

  .cork-bg {
    background-color: var(--cork);
    background-image:
      radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px),
      radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 9px 9px, 5px 5px;
    background-position: 0 0, 3px 3px;
  }

  /* torn paper edges between sections */
  .torn-bottom { position: relative; }
  .torn-bottom::after {
    content: "";
    position: absolute; left: 0; right: 0; bottom: -1px; height: 14px;
    background:
      linear-gradient(135deg, var(--paper) 50%, transparent 50%),
      linear-gradient(-135deg, var(--paper) 50%, transparent 50%);
    background-size: 22px 22px;
    background-position: 0 0, 11px 0;
    background-repeat: repeat-x;
  }
  .torn-bottom-deep::after { background-image:
      linear-gradient(135deg, var(--paper-deep) 50%, transparent 50%),
      linear-gradient(-135deg, var(--paper-deep) 50%, transparent 50%); }

  .pin {
    position: absolute; width: 15px; height: 15px; border-radius: 50%;
    box-shadow: 0 2px 3px rgba(0,0,0,0.4), inset 0 -2px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.4);
    border: 1px solid rgba(0,0,0,0.25);
    z-index: 3;
  }

  .tape {
    position: absolute;
    width: 62px; height: 22px;
    opacity: 0.85;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    border: 1px solid rgba(255,255,255,0.35);
    z-index: 2;
  }

  .index-card {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 10px 22px rgba(42,36,32,0.14), 0 2px 5px rgba(42,36,32,0.08);
  }

  .polaroid {
    background: #fff;
    padding: 12px 12px 0;
    border-radius: 2px;
    box-shadow: 0 10px 20px rgba(42,36,32,0.16), 0 2px 4px rgba(42,36,32,0.1);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
    position: relative;
  }
  .polaroid:hover {
    transform: translateY(-6px) rotate(0deg) scale(1.02) !important;
    box-shadow: 0 20px 32px rgba(42,36,32,0.22), 0 6px 10px rgba(42,36,32,0.14);
    z-index: 5;
  }

  .underline-dash {
    border-top: 1.5px dashed rgba(42,36,32,0.3);
  }

  /* horizontal scroll strip for the class roster */
  .students-scroll {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;      /* Firefox */
    -ms-overflow-style: none;   /* old Edge/IE */
  }
  .students-scroll::-webkit-scrollbar { display: none; } /* Chrome/Safari */

  .reveal {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0) scale(1); }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .polaroid:hover { transform: none !important; }
  }

  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--stamp);
    outline-offset: 3px;
  }

  .cta-btn {
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 18px rgba(0,0,0,0.28); }

  @media (max-width: 860px) {
    .gallery-item.tall, .gallery-item.wide { grid-row: auto !important; grid-column: auto !important; }
    .hero-title { font-size: 4.2rem !important; }
    .timeline-wrap { padding-left: 2rem !important; }
  }
  @media (max-width: 520px) {
    .hero-title { font-size: 3.1rem !important; }
  }
`;

// ============================================================
// SMALL REUSABLE PIECES (the page's signature motif)
// ============================================================
function Pin({ color = "var(--stamp)", style }: { color?: string; style?: CSSProperties }) {
  return <span className="pin" style={{ background: color, ...style }} />;
}

function Tape({ i = 0, rotate = -4, style }: { i?: number; rotate?: number; style?: CSSProperties }) {
  return <span className="tape" style={{ background: tapeColors[i % tapeColors.length], transform: `rotate(${rotate}deg)`, ...style }} />;
}

function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="mono"
      style={{
        display: "inline-block",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "var(--stamp)",
        border: "1.5px solid var(--stamp)",
        borderRadius: "999px",
        padding: "0.3rem 0.9rem",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="display"
      style={{
        fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
        color: "var(--ink)",
        marginTop: "0.6rem",
      }}
    >
      {children}
    </h2>
  );
}

// ============================================================
// SECTIONS
// ============================================================

function Hero() {
  return (
    <section
      className="cork-bg grain"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", marginBottom: "1.6rem" }}>
        <Eyebrow style={{ background: "var(--paper)" }}>Buku Kenangan &middot; 2025 / 2026</Eyebrow>
      </div>

      <div
        className="index-card grain reveal visible"
        style={{
          position: "relative",
          background: "var(--paper)",
          padding: "3rem 3.5rem 2.5rem",
          transform: "rotate(-1.2deg)",
          maxWidth: "780px",
        }}
      >
        <Pin style={{ top: "-8px", left: "50%", transform: "translateX(-50%)" }} />
        <h1
          className="display hero-title"
          style={{
            fontSize: "clamp(4.2rem, 11vw, 7.2rem)",
            lineHeight: 0.95,
            color: "var(--ink)",
          }}
        >
          XI&ndash;1 IPA
        </h1>
        <p
          className="hand"
          style={{
            fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
            color: "var(--stamp)",
            marginTop: "0.75rem",
          }}
        >
          Satu kelas, satu cerita, satu kenangan.
        </p>
      </div>

      <button
        className="cta-btn mono"
        onClick={() => document.getElementById("walikelas")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          marginTop: "3rem",
          background: "var(--ink)",
          color: "var(--paper)",
          border: "none",
          borderRadius: "999px",
          padding: "0.85rem 1.8rem",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
        }}
      >
        Buka Halaman &darr;
      </button>
    </section>
  );
}

function Walikelas() {
  return (
    <section id="walikelas" className="torn-bottom" style={{ padding: "6rem 1.5rem", background: "var(--paper)" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <Eyebrow>Wali Kelas</Eyebrow>
        <SectionTitle>Ibu yang paling sabar</SectionTitle>
      </div>

      <div
        className="index-card grain reveal"
        style={{
          maxWidth: "640px",
          margin: "3rem auto 0",
          padding: "2.75rem 2.5rem",
          position: "relative",
          transform: "rotate(0.6deg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4rem",
          textAlign: "center",
        }}
      >
        <Pin color="var(--tape-teal)" style={{ top: "-8px", left: "36px" }} />
        <div
          style={{
            width: "108px",
            height: "108px",
            borderRadius: "50%",
            background: "var(--paper-deep)",
            border: "3px solid var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "2.6rem",
            color: "var(--ink)",
          }}
        >
          BW
        </div>
        <div>
          <h3 className="display" style={{ fontSize: "2rem", color: "var(--ink)" }}>
            Bu Wati
          </h3>
          <div className="mono" style={{ fontSize: "0.7rem", color: "var(--ink-soft)", letterSpacing: "0.1em", marginTop: "0.2rem" }}>
            WALI KELAS &middot; XI&ndash;1 IPA
          </div>
        </div>
        <p className="hand" style={{ fontSize: "1.5rem", color: "var(--ink)", maxWidth: "460px" }}>
          &ldquo;Terima kasih atas kesabaran, bimbingan, dan kasih sayang yang tak pernah habis. Kami beruntung punya wali kelas seperti Ibu.&rdquo;
        </p>
      </div>
    </section>
  );
}

function Students() {
  return (
    <section id="siswa" className="cork-bg grain torn-bottom-deep" style={{ padding: "6rem 1.5rem 7rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <Eyebrow style={{ background: "var(--paper)" }}>{students.length} Anak Kelas</Eyebrow>
        <h2 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", color: "var(--paper)", marginTop: "0.6rem" }}>
          Papan wajah kami
        </h2>
        <p className="mono" style={{ fontSize: "0.7rem", color: "var(--paper)", opacity: 0.75, letterSpacing: "0.1em", marginTop: "0.6rem" }}>
          &larr; GESER UNTUK LIHAT SEMUA &rarr;
        </p>
      </div>

      <div style={{ position: "relative" }}>
        {/* edge fades hinting there's more to scroll */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "60px",
            background: "linear-gradient(90deg, var(--cork), transparent)",
            zIndex: 4, pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "60px",
            background: "linear-gradient(-90deg, var(--cork), transparent)",
            zIndex: 4, pointerEvents: "none",
          }}
        />

        <div
          className="students-scroll"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            gap: "1.8rem",
            overflowX: "auto",
            overflowY: "visible",
            scrollSnapType: "x proximity",
            padding: "1.6rem 2.5rem 2.2rem",
          }}
        >
          {students.map((s, i) => {
            const rotate = jitter(i, 3.5);
            const photoBg = i % 3 === 0 ? "var(--tape-teal)" : i % 3 === 1 ? "var(--rose)" : "var(--tape-mustard)";
            return (
              <div
                key={s.nim}
                className="polaroid reveal"
                style={{
                  flex: "0 0 200px",
                  scrollSnapAlign: "center",
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                <Tape i={i} rotate={parseFloat(rotate) > 0 ? -8 : 8} style={{ top: "-10px", left: "50%", marginLeft: "-31px" }} />
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    background: photoBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "2.6rem",
                    color: "#fff",
                  }}
                >
                  {s.initials}
                </div>
                <div style={{ padding: "1rem 0.4rem 1.3rem", textAlign: "center" }}>
                  <h4 className="display" style={{ fontSize: "1.3rem", color: "var(--ink)" }}>{s.name}</h4>
                  <div className="mono" style={{ fontSize: "0.65rem", color: "var(--ink-soft)", letterSpacing: "0.1em", margin: "0.3rem 0 0.6rem" }}>
                    NO. {s.nim}
                  </div>
                  <p className="hand underline-dash" style={{ fontSize: "1.15rem", color: "var(--stamp)", paddingTop: "0.5rem" }}>
                    &ldquo;{s.quote}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeri" style={{ padding: "6rem 1.5rem", background: "var(--paper)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <Eyebrow>Album Foto</Eyebrow>
        <SectionTitle>Momen yang terekam</SectionTitle>
      </div>

      <div
        className="gallery-grid"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2rem 1.8rem",
        }}
      >
        {photos.map((p, i) => {
          const rotate = jitter(i, 2.5);
          return (
            <div
              key={i}
              className={`gallery-item polaroid reveal ${p.tall ? "tall" : ""} ${p.wide ? "wide" : ""}`}
              style={{
                gridRow: p.tall ? "span 2" : "auto",
                gridColumn: p.wide ? "span 2" : "auto",
                transform: `rotate(${rotate}deg)`,
              }}
            >
              <Tape i={i + 2} rotate={parseFloat(rotate) > 0 ? 7 : -7} style={{ top: "-10px", right: "18px" }} />
              <div style={{ overflow: "hidden", aspectRatio: p.tall ? "3 / 4" : p.wide ? "16 / 8" : "1 / 1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div className="hand" style={{ fontSize: "1.2rem", textAlign: "center", padding: "0.7rem 0 1rem", color: "var(--ink)" }}>
                {p.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="torn-bottom" style={{ padding: "6rem 1.5rem", background: "var(--paper-deep)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <Eyebrow>Perjalanan</Eyebrow>
        <SectionTitle>Setahun bersama</SectionTitle>
      </div>

      <div className="timeline-wrap" style={{ maxWidth: "720px", margin: "0 auto", position: "relative", paddingLeft: "2.8rem" }}>
        <div
          style={{
            position: "absolute",
            left: "9px",
            top: "6px",
            bottom: "6px",
            width: 0,
            borderLeft: "2.5px dashed rgba(42,36,32,0.35)",
          }}
        />
        {timelineEvents.map((e, i) => (
          <div key={i} className="index-card grain reveal" style={{ position: "relative", padding: "1.6rem 1.9rem", marginBottom: "1.8rem", transform: `rotate(${jitter(i, 0.8)}deg)` }}>
            <Pin color={i % 2 === 0 ? "var(--stamp)" : "var(--tape-teal)"} style={{ left: "-38px", top: "1.5rem" }} />
            <div className="mono" style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "var(--ink)", padding: "0.2rem 0.6rem", borderRadius: "999px", letterSpacing: "0.08em" }}>
              {e.date}
            </div>
            <h3 className="display" style={{ fontSize: "1.5rem", margin: "0.6rem 0 0.4rem", color: "var(--stamp)" }}>{e.title}</h3>
            <p style={{ fontSize: "1rem", color: "var(--ink-soft)" }}>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Messages() {
  return (
    <section id="pesan" style={{ padding: "6rem 1.5rem", background: "var(--paper)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <Eyebrow>Pesan &amp; Kesan</Eyebrow>
        <SectionTitle>Kata mereka soal kelas ini</SectionTitle>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.2rem" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            className="index-card grain reveal"
            style={{
              position: "relative",
              padding: "2.2rem 2.4rem",
              transform: `rotate(${jitter(i, 1.2)}deg)`,
              backgroundImage:
                "repeating-linear-gradient(rgba(42,36,32,0.06) 0px, rgba(42,36,32,0.06) 1px, transparent 1px, transparent 2.1rem)",
              backgroundPosition: "0 3.4rem",
            }}
          >
            <Tape i={i} rotate={parseFloat(jitter(i, 5))} style={{ top: "-10px", left: "2rem" }} />
            <p className="hand" style={{ fontSize: "1.5rem", color: "var(--ink)", marginBottom: "1.4rem" }}>
              &ldquo;{m.text}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <div
                style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "var(--stamp)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "1.2rem",
                }}
              >
                {m.initials}
              </div>
              <div>
                <div className="display" style={{ fontSize: "1.15rem", color: "var(--ink)" }}>{m.name}</div>
                <div className="mono" style={{ fontSize: "0.66rem", color: "var(--ink-soft)", letterSpacing: "0.08em" }}>{m.role.toUpperCase()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cork-bg grain" style={{ textAlign: "center", padding: "5rem 1.5rem", position: "relative" }}>
      <div
        className="index-card"
        style={{
          display: "inline-block",
          background: "var(--paper)",
          padding: "2.4rem 3rem",
          transform: "rotate(-1deg)",
          position: "relative",
          maxWidth: "540px",
        }}
      >
        <Pin style={{ top: "-8px", left: "50%", transform: "translateX(-50%)" }} />
        <h3 className="display" style={{ fontSize: "2.4rem", color: "var(--ink)" }}>XI&ndash;1 IPA, selamanya</h3>
        <p className="hand" style={{ fontSize: "1.35rem", color: "var(--stamp)", margin: "0.8rem 0 1.4rem" }}>
          Bukan soal seberapa lama kita bersama, tapi seberapa dalam kenangan yang kita ciptakan.
        </p>
        <div className="mono" style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--ink)", border: "1.5px solid var(--ink)", borderRadius: "999px", padding: "0.35rem 1rem" }}>
          TAHUN AJARAN 2025 / 2026
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN PAGE EXPORT
// ============================================================
export default function Home() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main style={{ overflowX: "hidden", background: "var(--paper)" }}>
      <Hero />
      <Walikelas />
      <Students />
      <Gallery />
      <Timeline />
      <Messages />
      <Footer />
    </main>
  );
}