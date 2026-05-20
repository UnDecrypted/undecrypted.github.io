"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Globe,
  AtSign,
  MessageSquare,
  Menu,
  X,
  Terminal,
  MousePointer,
  Eye,
  Download,
  Hash,
  ChevronRight,
  CircleDot,
  Diamond,
  MapPin,
  Calendar,
  Briefcase,
  Code2,
  Layers,
  Box
} from "lucide-react";

// Scroll animation hook
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Marquee component
function Marquee({ items, speed = 25 }: { items: string[]; speed?: number }) {
  return (
    <div className="overflow-hidden border-y-4 border-black bg-black py-3">
      <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="mx-8 text-sm font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
            <Diamond className="w-3 h-3 fill-white" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Navigation
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 border-b-4 border-black transition-all duration-200 ${
      scrolled ? "bg-white" : "bg-black text-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 flex items-center justify-center border-4 border-black transition-colors ${
              scrolled ? "bg-black text-white group-hover:bg-white group-hover:text-black" : "bg-white text-black group-hover:bg-black group-hover:text-white"
            }`}>
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              MRA.DEV
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-black uppercase tracking-wider border-4 border-transparent transition-all ${
                  scrolled 
                    ? "hover:border-black hover:bg-black hover:text-white" 
                    : "hover:border-white hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact"
              className={`ml-4 px-6 py-2 font-black uppercase tracking-wider border-4 transition-all ${
                scrolled 
                  ? "bg-black text-white border-black hover:bg-white hover:text-black" 
                  : "bg-white text-black border-white hover:bg-black hover:text-white"
              }`}
            >
              HIRE ME →
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center border-4 transition-colors ${
              scrolled ? "bg-black text-white border-black" : "bg-white text-black border-white"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden border-t-4 border-black ${scrolled ? "bg-white" : "bg-black text-white"}`}>
          <div className="p-4 space-y-2">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block px-4 py-3 text-lg font-black uppercase tracking-wider border-4 transition-all ${
                  scrolled 
                    ? "border-black hover:bg-black hover:text-white" 
                    : "border-white hover:bg-white hover:text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section with Photo
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating shapes */}
      <div 
        className="absolute w-40 h-40 border-4 border-white opacity-10 hidden lg:block"
        style={{
          transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)`,
          top: '15%',
          right: '10%',
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-24 h-24 bg-white opacity-5 hidden lg:block"
        style={{
          transform: `translate(${-mousePos.x * 0.01}px, ${-mousePos.y * 0.01}px)`,
          bottom: '20%',
          left: '8%',
          transition: 'transform 0.3s ease-out'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-white mb-8 rotate-[-1deg]">
              <CircleDot className="w-3 h-3 text-white" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Available for work</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-2">
              <span className="block">MUHAMMAD</span>
              <span className="block">RAIHAN</span>
              <span className="block text-transparent bg-clip-text" 
                style={{ WebkitTextStroke: '2px white' }}>
                ALI
              </span>
            </h1>

            {/* Role */}
            <div className="border-l-4 border-white pl-4 mb-8 inline-block">
              <p className="text-lg sm:text-xl font-bold uppercase tracking-wider">
                Full Stack Developer
              </p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">
                & UI Designer
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base font-bold text-gray-300 max-w-md mb-8 leading-relaxed">
              I build digital experiences that don't follow trends. 
              Raw, functional, and built to last.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a href="#work" className="group px-8 py-4 bg-white text-black font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-black hover:text-white transition-all flex items-center gap-3">
                <Eye className="w-5 h-5" />
                VIEW WORK
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-8 py-4 bg-black text-white font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-white hover:text-black transition-all flex items-center gap-3">
                <Mail className="w-5 h-5" />
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="relative">
            <div className="absolute -inset-4 border-4 border-white opacity-20 translate-x-4 translate-y-4" />
            <div className="relative border-4 border-white bg-gray-900 overflow-hidden">
              <img 
                src="/profile.jpg"
                alt="Muhammad Raihan Ali - Developer"
                className="w-full h-[500px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t-4 border-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">Developer</p>
                    <p className="text-sm font-black">Muhammad Raihan Ali</p>
                  </div>
                  <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xs border-2 border-white">
                    MRA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
          {[
            { num: "2+", label: "YEARS EXP" },
            { num: "1+", label: "PROJECTS" },
            { num: "3+", label: "CLIENTS" },
            { num: "100%", label: "COMMITMENT" },
          ].map((stat, idx) => (
            <div key={idx} className="border-4 border-white p-4 hover:bg-white hover:text-black transition-all text-center">
              <div className="text-3xl font-black">{stat.num}</div>
              <div className="text-xs font-black uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-4 w-20 h-20 border-l-4 border-t-4 border-white opacity-20" />
      <div className="absolute bottom-8 right-4 w-20 h-20 border-r-4 border-b-4 border-white opacity-20" />
    </section>
  );
}

// Marquee Section
function MarqueeSection() {
  return (
    <Marquee 
      items={[
        "REACT",
        "NEXT.JS", 
        "TYPESCRIPT",
        "NODE.JS",
        "TAILWIND",
        "FIGMA",
        "BRUTALISM",
        "RAW DESIGN"
      ]} 
      speed={20}
    />
  );
}

// Work Section with Photos
function WorkSection() {
  const projects = [
    {
      num: "01",
      title: "AKM SCRIPT",
      desc: "API Key Generator platform with brutalist design. Built for developers who value speed.",
      tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND"],
      year: "2026",
      image: "https://kimi-web-img.moonshot.cn/img/lovable.dev/8e1dc4c880aa7bcdd1583f2f43d046bb81c53f17.webp",
      link: "#"
    }
  ];

  return (
    <section id="work" className="py-24 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Selected Work</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
            PROJECTS.
          </h2>
        </div>

        <div className="space-y-0">
          {projects.map((project, idx) => {
            const { ref, isInView } = useInView(0.15);
            return (
              <div
                key={idx}
                ref={ref}
                className={`group border-4 border-black border-b-0 last:border-b-4 hover:bg-black hover:text-white transition-all duration-300 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Photo */}
                  <div className="relative lg:col-span-1 border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase border-2 border-white">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl font-black text-gray-300 group-hover:text-white transition-colors">
                        {project.num}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 group-hover:underline decoration-4 underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-600 group-hover:text-gray-300 max-w-xl mb-4 transition-colors">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tidx) => (
                        <span key={tidx} className="px-3 py-1 text-xs font-black uppercase border-2 border-black group-hover:border-white transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-black uppercase tracking-wider border-4 border-black group-hover:bg-white group-hover:text-black transition-all"
                    >
                      VIEW PROJECT
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// About Section with Photo
function AboutSection() {
  const skills = [
    "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "NODE.JS",
    "TAILWIND", "POSTGRES", "DOCKER", "AWS", "FIGMA"
  ];

  return (
    <section id="about" className="py-24 bg-gray-100 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Bio with Photo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">About Me</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-8">
              I BUILD THINGS<br />THAT WORK.
            </h2>

            {/* Photo Card */}
            <div className="border-4 border-black mb-8 relative group">
              <div className="absolute -inset-2 border-4 border-black opacity-10 translate-x-2 translate-y-2" />
              <div className="relative overflow-hidden">
                <img 
                  src="https://kimi-web-img.moonshot.cn/img/www.makerstations.io/661d8b25cde0d229a1ff79acc64a1a0303bbafef.jpeg"
                  alt="Workspace"
                  className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t-4 border-white p-3">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">My Workspace</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-lg font-bold text-gray-700">
              <p>
                I'm Muhammad Raihan Ali — a full-stack developer with a design background. 
                I don't do trends, I do functional, lasting work.
              </p>
              <p>
                Specialized in React ecosystems, brutalist UI, and high-performance 
                web applications. Every pixel serves a purpose.
              </p>
              <p>
                Based in Indonesia. Working globally with clients who value raw, 
                honest design over decorative fluff.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="px-6 py-3 bg-black text-white font-black uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" />
                CONTACT
              </a>
              <button className="px-6 py-3 bg-white text-black font-black uppercase tracking-wider border-4 border-black hover:bg-black hover:text-white transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                RESUME
              </button>
            </div>
          </div>

          {/* Right: Skills & Info */}
          <div className="space-y-8">
            {/* Profile Quick Info */}
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4">QUICK INFO</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Location</p>
                    <p className="font-bold">Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Experience</p>
                    <p className="font-bold">1+ Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Role</p>
                    <p className="font-bold">Full Stack Dev</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Focus</p>
                    <p className="font-bold">Web & UI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-2 text-sm font-black uppercase border-2 border-black hover:bg-black hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="border-4 border-black bg-white">
              <div className="border-b-4 border-black p-4 bg-black text-white">
                <h3 className="text-sm font-black uppercase tracking-wider">EXPERIENCE</h3>
              </div>
              <div>
                {[
                  { role: "JUNIOR DEV", company: "Freelance", period: "2020 — 2021" }
                ].map((job, idx) => (
                  <div key={idx} className="p-4 border-b-2 border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-black uppercase tracking-tighter">{job.role}</span>
                      <span className="text-xs font-bold text-gray-500">{job.period}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{job.company}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4">SERVICES</h3>
              <ul className="space-y-2">
                {[
                  "WEB DEVELOPMENT",
                  "UI/UX DESIGN",
                  "API DEVELOPMENT",
                  "CONSULTING"
                ].map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-bold">
                    <ChevronRight className="w-4 h-4" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white border-4 border-white flex items-center justify-center">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Get In Touch</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6">
              LET'S WORK<br />TOGETHER.
            </h2>
            <p className="text-lg font-bold text-gray-400 max-w-md mb-8">
              Have a project in mind? Want to collaborate? 
              Just want to say hi? I'm always open.
            </p>

            <div className="space-y-4">
              <div className="border-4 border-white p-4 hover:bg-white hover:text-black transition-all">
                <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">EMAIL</div>
                <a href="mailto:raihan@akm.dev" className="text-xl font-black hover:underline">
                  RAIHANALIMUHAMMAD12420@GMAIL.COM
                </a>
              </div>
              <div className="border-4 border-white p-4 hover:bg-white hover:text-black transition-all">
                <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">LOCATION</div>
                <span className="text-xl font-black">SURABAYA, INDONESIA</span>
              </div>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col justify-end">
            <div className="border-4 border-white">
              <div className="border-b-4 border-white p-4">
                <h3 className="text-sm font-black uppercase tracking-wider">SOCIAL LINKS</h3>
              </div>
              <div>
                {[
                  { name: "GITHUB", icon: Globe, url: "https://github.com/UnDecrypted" },
                  { name: "INSTAGRAM", icon: AtSign, url: "https://www.instagram.com/muraaldb_/" },
                  { name: "WHATSAPP", icon: MessageSquare, url: "https://wa.me/6289525032522" },
                  { name: "EMAIL", icon: Mail, url: "mailto:raihanalimuhammad12420@gmail.com" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="flex items-center justify-between p-4 border-b-2 border-gray-800 last:border-b-0 hover:bg-white hover:text-black transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className="w-5 h-5" />
                      <span className="font-black uppercase tracking-wider">{social.name}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black uppercase tracking-wider">MRA.DEV</span>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
          © 2026 — MUHAMMAD RAIHAN ALI
        </p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black border-2 border-black" />
          <span className="text-xs font-black uppercase">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
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