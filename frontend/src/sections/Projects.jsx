import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Web Application", "Website"];

  // Mapping dynamic categories to user filters
  const getFilteredProjects = () => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "AI") return projects.filter(p => p.category === "AI");
    return projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
  };

  const filteredProjects = getFilteredProjects() || [];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Our Work
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Featured Projects
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20'
                  : 'bg-slate-200/50 hover:bg-slate-200 text-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const handleLinkClick = (e, url, type) => {
                // If it's a placeholder link, prevent 404 and show a helpful guide
                if (!url || url === "#" || url.includes("github.com/PankajPatel/") || url.includes("siteeforgestudio.com")) {
                  e.preventDefault();
                  alert(`Bhai, ye ${type} link abhi placeholder hai.\n\nJab aap apna project GitHub par upload karenge ya deploy karenge, toh aap Django Admin Dashboard (/admin) me jaakar is link ko badal sakte hain! Tab ye bilkul sahi chalega.`);
                }
              };

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id || project.title}
                  className="group rounded-3xl glass-card overflow-hidden hover:border-brand-500/30 transition-all duration-300 hover-lift text-left flex flex-col justify-between"
                >
                  {/* Image / Graphic Display */}
                  <div className="relative h-52 bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Elegant CSS Fallback graphic representation */
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-950 to-slate-900 flex flex-col justify-center items-center p-6 w-full h-full">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <div className="w-12 h-12 bg-brand-500/10 text-brand-400 rounded-full flex items-center justify-center border border-brand-500/20 shadow-lg glow-blue mb-3">
                          <span className="text-sm font-bold font-mono">&lt;/&gt;</span>
                        </div>
                        <span className="text-[10px] text-brand-400 font-bold uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Category Badge */}
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md mb-3 block w-fit">
                        {project.category} Project
                      </span>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs font-light text-slate-500 dark:text-slate-400 leading-relaxed mb-6 min-h-[48px]">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Action buttons row - Flawless touch support! */}
                      <div className="flex items-center gap-3 mb-5">
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleLinkClick(e, project.github_link, "GitHub")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer pointer-events-auto"
                          >
                            <FaGithub size={14} />
                            GitHub
                          </a>
                        )}
                        {project.live_demo_link && (
                          <a
                            href={project.live_demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleLinkClick(e, project.live_demo_link, "Live Demo")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-brand-500/10 cursor-pointer pointer-events-auto"
                          >
                            <FaExternalLinkAlt size={12} />
                            Live Demo
                          </a>
                        )}
                      </div>

                      {/* Tech stack items */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-semibold font-mono text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
