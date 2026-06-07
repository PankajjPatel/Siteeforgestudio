import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const Testimonials = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    // Auto Play interval every 6 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900/40 relative overflow-hidden">
      {/* Glow ambient spots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Client Words
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            What International Business Leaders Say About Us
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel container */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:-left-16 z-20 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-full hidden md:flex items-center justify-center shadow-lg transition-transform focus:outline-none hover:scale-105"
            aria-label="Previous Testimonial"
          >
            <FaChevronLeft size={14} />
          </button>

          {/* Carousel Slide Card */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full p-8 md:p-12 rounded-3xl glass-card text-left flex flex-col relative"
              >
                {/* Floating quote graphic */}
                <span className="absolute top-8 right-8 text-brand-500/10 dark:text-brand-400/10 text-7xl font-serif">
                  <FaQuoteLeft />
                </span>

                {/* Stars Rating */}
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" size={16} />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-base md:text-lg font-light italic leading-relaxed text-slate-700 dark:text-slate-200 mb-8 pr-6">
                  "{current.feedback}"
                </p>

                {/* Client Avatar Bio */}
                <div className="flex items-center gap-4 mt-auto">
                  {current.client_image ? (
                    <img
                      src={current.client_image}
                      alt={current.client_name}
                      className="w-12 h-12 rounded-full object-cover border border-brand-500/20"
                    />
                  ) : (
                    /* Default graphical initials circle avatar */
                    <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm border border-brand-500/20">
                      {current.client_name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {current.client_name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {current.client_role} &bull; <strong className="text-slate-500 font-medium">{current.client_company}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="absolute right-0 lg:-right-16 z-20 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-full hidden md:flex items-center justify-center shadow-lg transition-transform focus:outline-none hover:scale-105"
            aria-label="Next Testimonial"
          >
            <FaChevronRight size={14} />
          </button>
        </div>

        {/* Bullet Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200 dark:bg-slate-800'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
