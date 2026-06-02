import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/Icon';

const Skills = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const categories = ["Frontend", "Backend", "Database", "Tools", "AI & Automation"];

  // Filter skills based on chosen category
  const filteredSkills = skills?.filter(skill => skill.category === activeCategory) || [];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Our Stack
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Technical Proficiencies & Tools We Master
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id || skill.name}
                  className="p-6 rounded-3xl glass-card flex flex-col hover-lift border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Dynamic Skill Icon */}
                      <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                        <Icon name={skill.icon_name} className="text-lg" />
                      </div>
                      <span className="text-base font-bold text-slate-800 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Proficient progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-600 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
