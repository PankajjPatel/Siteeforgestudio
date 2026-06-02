import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRupeeSign, FaEnvelope, FaGlobe, FaLaptopCode } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      title: "Portfolio Website",
      price: "2,000",
      description: "Perfect for freelancers, students, and professionals looking to showcase their personal work and achievements.",
      icon: <FaGlobe className="text-brand-500" size={24} />,
      features: [
        "Sleek Single Page Layout",
        "100% Responsive (Mobile & Desktop)",
        "About Me & Project Showcase",
        "Interactive Skills Section",
        "Working Contact Form",
        "Fast Load Times & Basic SEO"
      ],
      cta: "Get Portfolio Site",
      highlight: false
    },
    {
      title: "Business Website",
      price: "5,000",
      description: "Ideal for small businesses, startups, and service providers looking to build trust and capture digital leads.",
      icon: <FaLaptopCode className="text-purple-500" size={24} />,
      features: [
        "Multi-page Structure (Up to 5 Pages)",
        "SEO Optimization & Analytics setup",
        "Lead Capture Forms & WhatsApp Integration",
        "Service & Testimonial Sliders",
        "Google Maps & Social Media integration",
        "Post-Launch Maintenance Support"
      ],
      cta: "Build Business Site",
      highlight: true
    },
    {
      title: "Custom Projects",
      price: "Contact",
      isCustom: true,
      description: "For complex requirements, custom web applications, automation setups, or specific API integrations.",
      icon: <FaEnvelope className="text-emerald-500" size={24} />,
      features: [
        "Custom React Frontend + Django Backend",
        "Database Architecture (SQLite / PostgreSQL)",
        "Interactive Admin Dashboard Panel",
        "AI API & LLM Integrations (Chatbots/Agents)",
        "Custom Business Logic & Workflows",
        "Scalable Cloud Hosting Deployments"
      ],
      cta: "Request Quote",
      highlight: false
    }
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-900/40 relative overflow-hidden">
      {/* Background glow ambient nodes */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Transparent, Budget-Friendly Pricing
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-3 max-w-md mx-auto">
            Honest rates tailored for small businesses, individuals, and beginners.
          </p>
          <div className="h-1 w-20 bg-brand-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative text-left hover-lift ${
                plan.highlight
                  ? 'glass-card border-brand-500/40 shadow-xl dark:shadow-black/40 bg-slate-900/5 dark:bg-brand-500/5 border-2'
                  : 'glass-card border-slate-200/60 dark:border-slate-800/80 shadow-md'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Icon & Title */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
                    {plan.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {plan.title}
                  </h4>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-6">
                  {!plan.isCustom ? (
                    <>
                      <FaRupeeSign className="text-slate-900 dark:text-white mr-1 self-center" size={24} />
                      <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-2 uppercase">Starting From</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-2 uppercase">for custom quote</span>
                    </>
                  )}
                </div>

                {/* Plan Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-light">
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px]">
                        <FaCheck />
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className={`w-full py-3.5 text-center font-bold text-xs rounded-2xl transition-all duration-300 block shadow-md ${
                  plan.highlight
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-white shadow-slate-950/20'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
