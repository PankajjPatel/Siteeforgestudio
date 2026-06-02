import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppWidget = ({ phoneNumber = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!phoneNumber || phoneNumber.trim() === "" || phoneNumber.includes("9876543210")) {
    return null;
  }

  // Clear formatted phone numbers for raw URL
  const rawNumber = phoneNumber.replace(/[^0-9+]/g, '');

  const message = "Hi Pankaj, I visited SiteeForgeStudio and would love to discuss a website project!";
  const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <FaWhatsapp size={18} />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-white">Pankaj Patel</h4>
                  <p className="text-[10px] text-slate-400">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="py-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/50">
                Hey there! 👋 I am Pankaj Patel, Founder of SiteeForgeStudio. How can I help you bring your digital idea to life?
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl transition-colors duration-300 shadow-md shadow-green-500/20"
            >
              <FaWhatsapp size={16} />
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 shadow-green-500/30"
      >
        {isOpen ? <FaTimes size={20} /> : <FaWhatsapp size={28} />}
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
