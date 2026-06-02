import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden bg-grid-pattern-dark">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>

      <div className="relative z-10 p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800/50 shadow-2xl flex flex-col items-center"
        >
          {/* Glowing 404 badge */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl glow-blue mb-8 animate-float">
            404
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
            Digital Path Lost
          </h1>
          <p className="text-sm font-light text-slate-400 leading-relaxed mb-8">
            The page you are looking for has been forged out of existence or moved. Let's return to safe coordinates.
          </p>

          {/* CTAs */}
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all hover-lift"
          >
            <FaHome size={16} />
            Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
