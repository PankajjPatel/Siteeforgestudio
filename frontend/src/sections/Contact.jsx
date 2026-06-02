import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';
import CustomToast from '../components/CustomToast';

const Contact = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_required: "Portfolio Websites",
    budget: "Less than ₹5,000",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const servicesList = [
    "Portfolio Websites",
    "Business Websites",
    "Landing Pages",
    "React Frontend Development",
    "Django Backend Development",
    "Website Maintenance"
  ];

  const budgetsList = [
    "Less than ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹20,000",
    "₹20,000+"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Live simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        show: true,
        type: "error",
        message: "Please fill out all required fields (Name, Email, Message)."
      });
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.submitContactMessage(formData);
      if (response) {
        setToast({
          show: true,
          type: "success",
          message: "Thank you! Your quote request has been sent successfully."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service_required: "Portfolio Websites",
          budget: "Less than ₹5,000",
          message: ""
        });
      }
    } catch (err) {
      setToast({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again or reach out on WhatsApp!"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact-form');
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
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950/20">
      
      {/* Toast Notification Container */}
      <CustomToast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* ==================== FREELANCE CTA BANNER ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-brand-900 to-slate-900 text-white text-left relative overflow-hidden shadow-2xl glow-blue"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20 w-fit block mb-4">
                Available for Freelance Work
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
                Let's Build Your Website or Custom Web App Together
              </h3>
              <p className="text-sm font-light text-slate-300 leading-relaxed max-w-xl">
                Whether you need a personal portfolio, a business website, or a custom web application built with React & Django, I am ready to help you establish a premium online presence.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-4 justify-start lg:justify-end">
              <a
                href="#contact-form"
                onClick={handleScrollToForm}
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover-lift shadow-brand-500/20"
              >
                Hire Me Now
              </a>
              {settings?.whatsapp_number?.trim() ? (
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 hover-lift shadow-lg shadow-emerald-500/20"
                >
                  <FaWhatsapp />
                  WhatsApp Now
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>

        {/* ==================== CONTACT FORM SECTION ==================== */}
        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column Details */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <h2 className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-3">
              Request Quote
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Let's Build Something Great. Reach Out!
            </h3>
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Fill out the details, and I will get back to you with an honest quote and plan within 24 hours.
            </p>

            {/* Icons contacts grid */}
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shadow-inner">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Write to Us</h4>
                  <a
                    href={`mailto:${settings?.email || "pankaj@siteeforgestudio.com"}`}
                    className="text-sm font-bold text-slate-800 dark:text-white hover:text-brand-600 transition-colors"
                  >
                    {settings?.email || "pankaj@siteeforgestudio.com"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              {settings?.phone?.trim() ? (
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shadow-inner">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Call Directly</h4>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-sm font-bold text-slate-800 dark:text-white hover:text-brand-600 transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              ) : null}

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shadow-inner">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Location</h4>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    {settings?.address || "India"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              className="p-8 md:p-10 rounded-3xl glass-card flex flex-col gap-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Full Name <strong className="text-rose-500">*</strong>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="p-3.5 rounded-xl text-sm glass-input text-slate-800 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Email Address <strong className="text-rose-500">*</strong>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="p-3.5 rounded-xl text-sm glass-input text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g. +91 98765 43210"
                    className="p-3.5 rounded-xl text-sm glass-input text-slate-800 dark:text-white"
                  />
                </div>

                {/* Service Required */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service_required" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Service Required
                  </label>
                  <select
                    id="service_required"
                    name="service_required"
                    value={formData.service_required}
                    onChange={handleInputChange}
                    className="p-3.5 rounded-xl text-sm glass-input bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none cursor-pointer"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv} className="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-100">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {budgetsList.map((bud) => (
                    <button
                      key={bud}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budget: bud }))}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border transition-all duration-300 ${
                        formData.budget === bud
                          ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20 scale-102'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {bud}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Message Description <strong className="text-rose-500">*</strong>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Detail your requirements, project scope, integrations, and ideal launch timeline..."
                  required
                  className="p-3.5 rounded-xl text-sm glass-input text-slate-800 dark:text-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover-lift shadow-xl shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                ) : (
                  <>
                    Send Quote Request
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
