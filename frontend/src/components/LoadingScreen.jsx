import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 300); // Give a brief moment at 100%
          return 100;
        }
        return prev + 10;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          {/* Glowing particle background elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* Logo container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center z-10"
          >
            {/* Custom Brand Logo Representation */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 shadow-xl glow-blue">
              <span className="text-4xl font-extrabold tracking-tighter text-white">SF</span>
              <div className="absolute -inset-1 rounded-2xl border border-white/20 animate-ping opacity-25"></div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-brand-400">
              SiteeForgeStudio
            </h1>
            <p className="text-sm font-light tracking-widest text-slate-400 mt-2 uppercase">
              Digital Craftsmanship
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-64 h-1 mt-10 overflow-hidden rounded-full bg-slate-800 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-xs font-mono text-slate-500 mt-2 z-10">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
