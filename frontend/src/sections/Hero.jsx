import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import logoImg from '../assets/logo.png';


const Hero = ({ settings, founder }) => {
  const roles = founder?.roles || ["Python • Django • Web Development", "Building Modern Web Applications"];
  
  // Custom Typewriter logic
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const activeRole = roles[currentRoleIndex];
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeRole.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeRole.substring(0, currentText.length + 1));
      }, 100);
    }
    
    if (!isDeleting && currentText === activeRole) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-grid-pattern dark:bg-grid-pattern-dark">
      {/* Background radial soft ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col text-left">
          
          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold text-sm w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
            Founded by {founder?.name || "Pankaj Patel"}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-none"
          >
            Welcome to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-400 to-purple-500">
              {settings?.title || "SiteeForgeStudio"}
            </span>
          </motion.h1>

          {/* Dynamic typing roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 min-h-[2.5rem] md:h-10 mb-6 flex items-center flex-wrap"
          >
            <span className="mr-2 text-slate-500 font-light">Specializing in</span>
            <span className="text-brand-600 dark:text-brand-400 border-r-2 border-brand-500 pr-1 animate-pulse">
              {currentText}
            </span>
          </motion.div>

          {/* Subheadline description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-xl mb-10"
          >
            {settings?.tagline || "Modern websites and web applications built with React, Django, and modern web technologies."}
          </motion.p>

          {/* Button CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all duration-300 hover-lift w-full sm:w-auto text-center"
            >
              View Projects
              <FaArrowRight size={14} />
            </a>

            <a
              href={settings?.resume || "#"}
              onClick={(e) => {
                if (!settings?.resume) {
                  e.preventDefault();
                  alert("Resume download mocked! In production, this button will download your actual PDF resume.");
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-slate-200/20 font-bold rounded-2xl transition-all duration-300 hover-lift w-full sm:w-auto text-center"
            >
              <FaDownload size={14} />
              Download Resume
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-200/20 font-bold rounded-2xl transition-all duration-300 hover-lift w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column Graphic Representing SiteeForge Studio logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center z-10"
        >
          {/* Custom premium graphic node wrapper */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-slate-950 border-4 border-brand-600 shadow-2xl glow-blue overflow-hidden animate-float">
            
            {/* Full-circle coder avatar cropped to hide bottom text */}
            <img 
              src={logoImg} 
              alt="SiteeForgeStudio Coder at Work" 
              className="w-full h-full object-cover scale-[1.35] origin-top z-10"
            />

            {/* Subtle overlay elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-15 pointer-events-none"></div>

            {/* Active for Freelance absolute floating badge */}
            <div className="absolute bottom-6 z-20 flex items-center gap-1.5 text-[10px] text-brand-400 font-semibold bg-slate-950/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-500/20 shadow-xl">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              ACTIVE FOR FREELANCE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
