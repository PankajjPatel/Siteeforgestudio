import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const CustomToast = ({ show, type = "success", message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl glass-card border border-white/20"
        >
          {type === "success" ? (
            <FaCheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
          ) : (
            <FaExclamationCircle className="text-rose-500 flex-shrink-0" size={20} />
          )}

          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 pr-4">
            {message}
          </p>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <FaTimes size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
