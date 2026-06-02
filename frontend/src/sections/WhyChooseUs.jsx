import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaMobileAlt, FaTachometerAlt, FaSearch, FaDollarSign, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  const points = [
    {
      title: "Modern UI/UX",
      desc: "Stunning SaaS aesthetics, custom micro-animations, glassmorphic grids, and optimized layout flows that wow visitors.",
      icon: <FaPalette />,
      color: "from-blue-500/10 to-brand-500/10 text-brand-500"
    },
    {
      title: "Responsive Design",
      desc: "Pixel-perfect grid layouts that resize fluidly on mobile viewports, tablets, laptops, and ultra-wide desktops.",
      icon: <FaMobileAlt />,
      color: "from-purple-500/10 to-pink-500/10 text-purple-500"
    },
    {
      title: "Fast Performance",
      desc: "Sub-second page speeds, highly optimized images, query optimizations, and efficient caching patterns.",
      icon: <FaTachometerAlt />,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-500"
    },
    {
      title: "SEO Friendly",
      desc: "Built with standard semantic HTML5 elements, meta tags, titles, and schema architectures to maximize organic ranking.",
      icon: <FaSearch />,
      color: "from-amber-500/10 to-orange-500/10 text-amber-500"
    },
    {
      title: "Affordable Pricing",
      desc: "Highly competitive agency pricing offering exceptional top-tier quality web products tailored for business margins.",
      icon: <FaDollarSign />,
      color: "from-rose-500/10 to-red-500/10 text-rose-500"
    },
    {
      title: "Ongoing Support",
      desc: "Reliable, post-launch site maintenance, cloud deployments, security upgrades, and direct scale assistance.",
      icon: <FaHeadset />,
      color: "from-indigo-500/10 to-blue-500/10 text-indigo-500"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Elevating Agencies with Superior Execution
          </h3>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => (
            <motion.div
              key={pt.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 rounded-3xl glass-card text-left flex flex-col hover-lift"
            >
              {/* Highlight Icon wrapper */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pt.color} flex items-center justify-center mb-6 text-xl shadow-inner`}>
                {pt.icon}
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {pt.title}
              </h4>

              {/* Description */}
              <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
