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
    tagline: "Modern web applications and websites built with Python, Django, and modern web technologies.",
    logo: null,
    email: "siteeforgestudio@gmail.com",
    phone: "",
    whatsapp_number: "",
    address: "India",
    resume: null,
    about_text: "SiteeForgeStudio is an independent web development portfolio founded by Pankaj Patel, focused on building modern web applications and websites.",
    mission: "Currently focused on improving backend development skills with Django, building full-stack projects, and exploring AI-assisted development workflows.",
    vision: "To build a professional online presence and highlight real-world development work.",
    why_choose_us: [
      "Modern Web Tech: Responsive layouts crafted with HTML5 and Tailwind CSS.",
      "Clean Backend Logic: Secure database integration and clean code structures with Python & Django.",
      "Relational Databases: Well-structured database queries and management using MySQL & SQL.",
      "Version Control: Safe code deployments, issue tracking, and version history using Git and GitHub.",
      "AI Integration: Leveraging tools like ChatGPT, Gemini, and Claude for faster learning and code testing.",
      "Continuous Study: Constantly developing real-world academic & hobby projects to expand engineering skills."
    ]
  },
  founder: {
    name: "Pankaj Patel",
    title: "Computer Science Student & Developer",
    profile_image: null,
    bio: "I am Pankaj Patel, a Computer Science student passionate about web development and software engineering. I enjoy building web applications using Python, Django, HTML, Tailwind CSS, and MySQL. I actively use modern AI-assisted development tools to accelerate learning, improve productivity, and enhance development workflows while continuously building real-world projects.",
    achievements: [
      "Computer Science Student",
      "Building real-world web apps with Python & Django",
      "Designing responsive layouts using Tailwind CSS",
      "Leveraging AI assistance for rapid learning & testing"
    ],
    roles: [
      "Python • Django • Web Development",
      "Building Modern Web Applications"
    ]
  },
  services: [
    { id: 1, title: "Python & Django Apps", icon_name: "FaPython", description: "Full-stack web systems built using Django's secure, robust web framework." },
    { id: 2, title: "Responsive Web Design", icon_name: "FaHtml5", description: "Modern, lightweight, and responsive user interfaces created using HTML5 and Tailwind CSS." },
    { id: 3, title: "Database Management", icon_name: "FaDatabase", description: "Designing relational database schemas and writing optimized queries using MySQL and SQL." },
    { id: 4, title: "Git & Version Control", icon_name: "FaGithub", description: "Using Git branching strategies, pull requests, and GitHub repositories for clean collaborative workflows." },
    { id: 5, title: "AI-Assisted Workflows", icon_name: "FaRobot", description: "Employing LLMs like Claude, Gemini, and ChatGPT to optimize, test, and document code structures." },
    { id: 6, title: "Academic & Full Stack Projects", icon_name: "FaLaptopCode", description: "Building real-world portfolio case studies to solve engineering issues and track queue lines." }
  ],
  skills: [
    // Programming
    { id: 1, name: "Python", category: "Programming", proficiency: 85, icon_name: "FaPython" },
    { id: 2, name: "SQL", category: "Programming", proficiency: 80, icon_name: "FaDatabase" },

    // Frontend
    { id: 3, name: "HTML5", category: "Frontend", proficiency: 90, icon_name: "FaHtml5" },
    { id: 4, name: "Tailwind CSS", category: "Frontend", proficiency: 85, icon_name: "SiTailwindcss" },

    // Backend
    { id: 5, name: "Django", category: "Backend", proficiency: 80, icon_name: "DiDjango" },

    // Database
    { id: 6, name: "MySQL", category: "Database", proficiency: 80, icon_name: "SiMysql" },

    // Tools
    { id: 7, name: "Git", category: "Tools", proficiency: 85, icon_name: "FaGitAlt" },
    { id: 8, name: "GitHub", category: "Tools", proficiency: 90, icon_name: "FaGithub" },

    // AI-Assisted Development
    { id: 9, name: "ChatGPT", category: "AI-Assisted Development", proficiency: 90, icon_name: "FaRobot" },
    { id: 10, name: "Gemini", category: "AI-Assisted Development", proficiency: 90, icon_name: "FaBrain" },
    { id: 11, name: "Claude", category: "AI-Assisted Development", proficiency: 90, icon_name: "FaBrain" }
  ],
  projects: [
    {
      id: 1,
      title: "Smart Queue Management System",
      description: "A web-based Smart Queue Management System developed for Hospitals, Banks, and Colleges. The system enables appointment booking, digital token generation, and live queue tracking to reduce waiting time and improve service efficiency.",
      category: "Web Application",
      technologies: ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
      github_link: "https://github.com/PankajPatel/smart-queue-management",
      live_demo_link: "https://queue.siteeforgestudio.com",
      featured: true,
      image: null
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing technical skills, projects, and development journey. Built to provide a professional online presence and highlight real-world development work.",
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
