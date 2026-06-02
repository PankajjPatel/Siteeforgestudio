import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaAward, FaCalendarAlt, FaDownload, FaRocket, FaEye } from 'react-icons/fa';

// Custom CountUp Component
const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // 1.5 seconds
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-brand-600 dark:text-brand-400">
      {count}{suffix}
    </span>
  );
};

const About = ({ settings, founder }) => {
  const achievements = founder?.achievements || [
    "Computer Science Student",
    "Building real-world web apps with Python & Django",
    "Designing responsive layouts using Tailwind CSS",
    "Leveraging AI assistance for rapid learning & testing"
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            About SiteeForgeStudio
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Crafting Digital Experiences That Elevate Your Brand
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column - Portrait & Stats Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Glass Box Mocking Portrait image */}
            <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl bg-gradient-to-tr from-brand-600 to-purple-600 p-[1.5px] shadow-2xl glow-blue">
              <div className="w-full h-full bg-slate-950 rounded-[23px] overflow-hidden flex flex-col justify-end p-6 relative">
                
                {/* Tech background overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute top-10 left-10 w-44 h-44 bg-brand-500/10 rounded-full blur-2xl"></div>

                {/* Glowing Abstract coding tags */}
                <div className="absolute top-6 right-6 font-mono text-[10px] text-brand-400/80 border border-brand-500/20 px-2 py-0.5 rounded">
                  &lt;coder&gt;
                </div>
                
                {/* Text overlay representing Pankaj Patel profile */}
                <div className="z-10 text-left">
                  <h4 className="text-lg font-bold text-white">{founder?.name || "Pankaj Patel"}</h4>
                  <p className="text-xs text-brand-400 font-semibold mb-3">{founder?.title || "Computer Science Student & Developer"}</p>
                  <p className="text-[11px] font-light text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                    Passionate about software engineering and web development.
                  </p>
                </div>
              </div>
            </div>

            {/* Float stats badge */}
            <div className="absolute -bottom-6 -right-2 md:right-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center min-w-[120px] hover-lift">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Status</span>
              <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400 mt-1">Open for Work</span>
            </div>
          </div>

          {/* Right Column - Biographic Intro */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Building Beyond Boundaries
            </h4>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
              {founder?.bio || "Hi, I'm Pankaj Patel, a technology architect, freelancer, and the driving force behind SiteeForgeStudio. With deep expertise in React.js, Django, and AI-driven automation, I help clients bridge the gap between complex business logic and highly engaging user interfaces. I love building fast, secure web solutions that scale."}
            </p>

            {/* Achievement checkmarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {achievements.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Resume Call */}
            <div className="mt-2">
              <a
                href={settings?.resume || "#"}
                onClick={(e) => {
                  if (!settings?.resume) {
                    e.preventDefault();
                    alert("Resume download mocked successfully! In production, this download will pull directly from the Django media upload field.");
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 font-bold text-xs rounded-xl shadow-md transition-all hover-lift"
              >
                <FaDownload />
                Download Founder Resume
              </a>
            </div>
          </div>
        </div>

        {/* Learning Journey & Development Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Learning Journey */}
          <div className="p-8 rounded-3xl glass-card text-left flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-inner">
              <FaRocket size={20} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">My Learning Journey</h4>
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
              {settings?.mission || "Currently focused on improving backend development skills with Django, building full-stack projects, and exploring AI-assisted development workflows."}
            </p>
          </div>

          {/* Development Focus */}
          <div className="p-8 rounded-3xl glass-card text-left flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-inner">
              <FaEye size={20} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Development Focus</h4>
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
              {settings?.vision || "Dedicated to building clean, well-documented, and responsive web applications while studying computer science principles."}
            </p>
          </div>
        </div>

        {/* Honest Highlights Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-brand-600 dark:text-brand-400">Actively Building</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">Portfolio Projects</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400">Open for Work</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">Freelance Opportunities</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Continuous Study</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">Learning Modern Tech</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
