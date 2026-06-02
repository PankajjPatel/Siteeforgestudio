import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaHeart } from 'react-icons/fa';
import Icon from './Icon';

const Footer = ({ settings, socialLinks }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 bg-slate-900 text-slate-400 dark:bg-slate-950/70 border-t border-slate-800">
      {/* Wave layout overlay top */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-purple-600">
              <span className="text-xs font-black">SF</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              {settings?.title || "SiteeForgeStudio"}
            </span>
          </div>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            {settings?.tagline || "Building Modern Digital Experiences."}
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-2">
            {socialLinks?.map((link) => (
              <a
                key={link.id || link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 text-slate-300"
                title={link.platform}
              >
                <Icon name={link.icon_name} className="text-base" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Quick Links</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white transition-colors">About Founder</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-white transition-colors">Services Grid</a>
            <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="hover:text-white transition-colors">Client Projects</a>
          </div>
        </div>

        {/* Process & Solutions */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Solutions</h3>
          <div className="flex flex-col gap-3 text-sm">
            <span className="hover:text-white cursor-default">Business Websites</span>
            <span className="hover:text-white cursor-default">Custom React Development</span>
            <span className="hover:text-white cursor-default">Django Secure APIs</span>
            <span className="hover:text-white cursor-default">Website Optimization</span>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">Contact Info</h3>
          <div className="flex flex-col gap-4 text-sm leading-relaxed">
            <p>
              <strong className="text-white block font-medium">Email:</strong>
              <a href={`mailto:${settings?.email || "pankaj@siteeforgestudio.com"}`} className="hover:text-white transition-colors">
                {settings?.email || "pankaj@siteeforgestudio.com"}
              </a>
            </p>
            {settings?.phone?.trim() ? (
              <p>
                <strong className="text-white block font-medium">Call:</strong>
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </p>
            ) : null}
            <p>
              <strong className="text-white block font-medium">Location:</strong>
              {settings?.address || "India"}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>
          &copy; {currentYear} {settings?.title || "SiteeForgeStudio"}. Founded by Pankaj Patel.
        </p>
        <p className="flex items-center gap-1.5">
          Designed & Crafted with <FaHeart className="text-rose-500 animate-pulse" /> by{" "}
          <span className="text-white font-semibold">Pankaj Patel</span>
        </p>
      </div>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-11 h-11 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg hover-lift transition-all focus:outline-none"
          title="Back to Top"
        >
          <FaChevronUp size={16} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
