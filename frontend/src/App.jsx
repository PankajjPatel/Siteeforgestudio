import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Process from './sections/Process';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppWidget from './components/WhatsAppWidget';
import { apiService } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    settings: null,
    founder: null,
    services: [],
    skills: [],
    projects: [],
    testimonials: [],
    socialLinks: []
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          settings,
          founder,
          services,
          skills,
          projects,
          testimonials,
          socialLinks
        ] = await Promise.all([
          apiService.getSettings(),
          apiService.getFounder(),
          apiService.getServices(),
          apiService.getSkills(),
          apiService.getProjects(),
          apiService.getTestimonials(),
          apiService.getSocialLinks()
        ]);

        setData({
          settings,
          founder,
          services,
          skills,
          projects,
          testimonials,
          socialLinks
        });
      } catch (err) {
        console.error("Critical error in data fetching:", err);
      } finally {
        // Leave preloader visible for a minimal visual effect
        setTimeout(() => setLoading(false), 1200);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Floating Ambient lights */}
      <div className="fixed top-0 inset-x-0 h-40 bg-gradient-to-b from-brand-600/5 to-transparent pointer-events-none z-0"></div>

      {/* Floating Sticky Glass Header */}
      <Navbar settings={data.settings} />

      {/* Core Portfolio Sections */}
      <main className="relative z-10">
        <Hero settings={data.settings} founder={data.founder} />
        <About settings={data.settings} founder={data.founder} />
        <Services services={data.services} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Process />
        <WhyChooseUs />
        <Testimonials testimonials={data.testimonials} />
        <Contact settings={data.settings} />
      </main>

      {/* Footer */}
      <Footer settings={data.settings} socialLinks={data.socialLinks} />

      {/* Floating WhatsApp Chat Widget */}
      <WhatsAppWidget phoneNumber={data.settings?.whatsapp_number} />
    </div>
  );
}

export default App;
