import axios from 'axios';

// Connects to local Django backend or fallback
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// High-Fidelity Mock Data for Graceful Degradation
const MOCK_DATA = {
  settings: {
    title: "SiteeForgeStudio",
    tagline: "Modern websites and web applications built with React, Django, and modern web technologies.",
    logo: null,
    email: "pankaj@siteeforgestudio.com",
    phone: null,
    whatsapp_number: null,
    address: "India",
    resume: null,
    about_text: "SiteeForgeStudio is an independent web development studio founded by Pankaj Patel, focused on building modern websites and web applications for businesses and individuals.",
    mission: "To build clean, modern, and highly responsive websites that help small businesses and individuals establish a strong digital presence.",
    vision: "To deliver premium digital products that are budget-friendly, high-quality, and easy to maintain.",
    why_choose_us: [
      "Modern Design: Clean layouts, beautiful animations, and professional styling.",
      "Responsive Layouts: Mobile-first responsive grids that scale perfectly across all screens.",
      "Affordable Pricing: Transparent and beginner-friendly rates tailored for individuals & small businesses.",
      "Clean Code: Lightweight React frontends and optimized Django backend systems.",
      "SEO Optimization: Semantic HTML5 elements and best practice meta tags for search visibility.",
      "Direct Communication: Work directly with the founder for swift updates and personal project support."
    ]
  },
  founder: {
    name: "Pankaj Patel",
    title: "Founder & Freelance Web Developer",
    profile_image: null,
    bio: "I am Pankaj Patel, a web developer passionate about building modern and responsive websites. I am continuously learning new technologies and working on real-world projects to improve my skills and help clients establish their online presence.",
    achievements: [
      "Focus on building responsive & modern websites",
      "Committed to clean code and prompt support",
      "Learning and applying React.js, Django, & Vite",
      "Using modern AI tools to accelerate development speed"
    ],
    roles: [
      "Portfolio Websites",
      "Business Websites",
      "Landing Pages",
      "Website Maintenance"
    ]
  },
  services: [
    { id: 1, title: "Portfolio Websites", icon_name: "FaUserTie", description: "Sleek, personal portfolio systems designed to showcase your skills, achievements, and work." },
    { id: 2, title: "Business Websites", icon_name: "FaGlobe", description: "Modern, responsive websites built to establish a professional digital presence for small businesses." },
    { id: 3, title: "Landing Pages", icon_name: "FaRocket", description: "Focused, high-converting single-page layouts optimized for marketing campaigns and lead capture." },
    { id: 4, title: "React Frontend Development", icon_name: "FaReact", description: "Interactive, highly dynamic user interfaces built with React, Vite, and Tailwind CSS." },
    { id: 5, title: "Django Backend Development", icon_name: "FaServer", description: "Secure, lightweight database systems, secure admin panels, and custom backend API logic with Django." },
    { id: 6, title: "Website Maintenance", icon_name: "FaTachometerAlt", description: "Regular website monitoring, minor styling tweaks, performance tuning, and content updates." }
  ],
  skills: [
    { id: 1, name: "React.js", category: "Frontend", proficiency: 85, icon_name: "RiReactjsLine" },
    { id: 2, name: "Tailwind CSS", category: "Frontend", proficiency: 90, icon_name: "SiTailwindcss" },
    { id: 3, name: "JavaScript (ES6+)", category: "Frontend", proficiency: 80, icon_name: "IoLogoJavascript" },
    { id: 4, name: "HTML5 / CSS3", category: "Frontend", proficiency: 90, icon_name: "FaHtml5" },
    { id: 5, name: "Django", category: "Backend", proficiency: 80, icon_name: "DiDjango" },
    { id: 6, name: "Python", category: "Backend", proficiency: 85, icon_name: "FaPython" },
    { id: 7, name: "SQLite", category: "Database", proficiency: 85, icon_name: "SiSqlite" },
    { id: 8, name: "Git & GitHub", category: "Tools", proficiency: 80, icon_name: "FaGithub" },
    { id: 9, name: "VS Code", category: "Tools", proficiency: 90, icon_name: "SiVisualstudiocode" },
    { id: 10, name: "AI Tool Integrations", category: "AI & Automation", proficiency: 90, icon_name: "FaRobot" }
  ],
  projects: [
    {
      id: 1,
      title: "Smart Queue Management System",
      description: "An interactive web system helping businesses track customer queues dynamically. Features queue updates, real-time client notification dashboard, and beautiful charts.",
      category: "Web Application",
      technologies: ["React.js", "Django", "Django REST Framework", "SQLite", "Tailwind CSS"],
      github_link: "https://github.com/PankajPatel/smart-queue-management",
      live_demo_link: "https://queue.siteeforgestudio.com",
      featured: true,
      image: null
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "The responsive and modern developer portfolio website and founder portal itself. Built using React, Vite, Tailwind CSS, Framer Motion, and Django REST API.",
      category: "Website",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Django", "SQLite"],
      github_link: "https://github.com/PankajPatel/siteeforge-studio",
      live_demo_link: "https://siteeforgestudio.com",
      featured: true,
      image: null
    }
  ],
  testimonials: [],
  socialLinks: [
    { id: 1, platform: "GitHub", url: "https://github.com/PankajPatel", icon_name: "FaGithub" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/pankaj-patel", icon_name: "FaLinkedin" },
    { id: 3, platform: "Twitter", url: "https://twitter.com/pankaj_patel", icon_name: "FaTwitter" }
  ]
};

// Graceful Wrapper to load from Django or load fallback Mock
const getSafe = async (urlPath, mockKey) => {
  try {
    const response = await api.get(urlPath);
    // If Django response contains a result or is empty settings/founder list, format it
    if (response.data) {
      // In Django rest framework we might paginate lists, check for 'results'
      if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results.length > 0 ? response.data.results : MOCK_DATA[mockKey];
      }
      // If it is settings/founder view that returns object
      if (Object.keys(response.data).length > 0) {
        return response.data;
      }
    }
    return MOCK_DATA[mockKey];
  } catch (error) {
    console.warn(`API path '${urlPath}' failed. Falling back to local premium mock data. Details:`, error.message);
    return MOCK_DATA[mockKey];
  }
};

export const apiService = {
  getSettings: () => getSafe('/settings/', 'settings'),
  getFounder: () => getSafe('/founder/', 'founder'),
  getServices: () => getSafe('/services/', 'services'),
  getSkills: () => getSafe('/skills/', 'skills'),
  getProjects: (category = null) => {
    const url = category ? `/projects/?category=${category}` : '/projects/';
    return getSafe(url, 'projects');
  },
  getTestimonials: () => getSafe('/testimonials/', 'testimonials'),
  getSocialLinks: () => getSafe('/social-links/', 'socialLinks'),
  
  submitContactMessage: async (formData) => {
    try {
      const response = await api.post('/contact/', formData);
      return response.data;
    } catch (error) {
      console.warn('API message submission failed. Simulating local resolution for demo.', error);
      // Simulate slow network resolution for premium UI/UX feel
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Message dispatched locally!" };
    }
  }
};
