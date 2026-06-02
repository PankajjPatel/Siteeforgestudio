import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const Services = ({ services }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Our Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            High-Performance Digital Solutions We Provide
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services?.map((service) => (
            <motion.div
              key={service.id || service.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl glass-card text-left flex flex-col hover:border-brand-500/30 hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 group"
            >
              {/* Dynamic Icon */}
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-inner group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <Icon name={service.icon_name} className="text-xl" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
