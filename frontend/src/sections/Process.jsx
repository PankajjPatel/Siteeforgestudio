import React from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaDraftingCompass, FaLaptopCode, FaVial, FaCloudUploadAlt, FaHeadset } from 'react-icons/fa';

const Process = () => {
  const steps = [
    {
      step: "01",
      title: "Requirement Discussion",
      icon: <FaComments />,
      desc: "We align on your product requirements, target audience, core KPIs, and visual preferences through immersive scoping sessions."
    },
    {
      step: "02",
      title: "Planning & Architecture",
      icon: <FaDraftingCompass />,
      desc: "Creating structural wireframes, mapping out Django database schemas, choosing proper API routing paths, and defining states."
    },
    {
      step: "03",
      title: "Production Development",
      icon: <FaLaptopCode />,
      desc: "Writing premium modular React views and stitching them to robust, lightning-fast Python Django REST APIs with PostgreSQL."
    },
    {
      step: "04",
      title: "Rigorous System Testing",
      icon: <FaVial />,
      desc: "Comprehensive testing for mobile viewport scaling, cross-browser compatibility, database query indexing, and security."
    },
    {
      step: "05",
      title: "Seamless Cloud Deployment",
      icon: <FaCloudUploadAlt />,
      desc: "Configuring environment variables, static/media caches, and hosting on robust servers (like AWS, VPS, or Heroku)."
    },
    {
      step: "06",
      title: "Dedicated Post-Launch Support",
      icon: <FaHeadset />,
      desc: "Ongoing maintenance patches, security audits, database cleanups, and seamless integration of your next-phase scaling goals."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Our Method
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Step-By-Step Product Development Pipeline
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Middle Line (Hidden on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>

          {/* Steps Grid */}
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`flex flex-col md:flex-row items-center justify-between relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left/Right Text Column */}
                  <div className="w-full md:w-[45%] text-left">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="p-8 rounded-3xl glass-card relative border border-slate-100 dark:border-slate-800 hover-lift"
                    >
                      {/* Step float label */}
                      <span className="absolute top-6 right-6 text-2xl font-black text-brand-600/10 dark:text-brand-400/10">
                        {item.step}
                      </span>
                      
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h4>

                      {/* Desc */}
                      <p className="text-xs font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Centered Node Icon on Vertical Line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-slate-100 dark:border-slate-800 dark:bg-slate-950 flex items-center justify-center text-white text-xs font-bold hidden md:flex glow-blue">
                    {item.step}
                  </div>

                  {/* Spacer column for horizontal width alignment */}
                  <div className="w-full md:w-[45%] hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
