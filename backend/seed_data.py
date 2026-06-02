import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'siteeforge_backend.settings')
django.setup()

from django.contrib.auth.models import User
from agency.models import (
    SiteSettings, Founder, Service, Skill, 
    Project, Testimonial, SocialLink
)

def seed():
    print("Starting data seeding for SiteeForgeStudio...")

    # 1. Create Superuser if it doesn't exist
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@siteeforgestudio.com", "admin123")
        print("Superuser created: admin / admin123")
    else:
        print("Superuser admin already exists.")

    # Clear existing agency models (except contact messages)
    SiteSettings.objects.all().delete()
    Founder.objects.all().delete()
    Service.objects.all().delete()
    Skill.objects.all().delete()
    Project.objects.all().delete()
    Testimonial.objects.all().delete()
    SocialLink.objects.all().delete()

    # 2. Site Settings
    settings = SiteSettings.objects.create(
        title="SiteeForgeStudio",
        tagline="Modern websites and web applications built with React, Django, and modern web technologies.",
        email="pankaj@siteeforgestudio.com",
        phone="",
        whatsapp_number="",
        address="India",
        about_text=(
            "SiteeForgeStudio is an independent web development studio founded by Pankaj Patel, "
            "focused on building modern websites and web applications for businesses and individuals."
        ),
        mission="To build clean, modern, and highly responsive websites that help small businesses and individuals establish a strong digital presence.",
        vision="To deliver premium digital products that are budget-friendly, high-quality, and easy to maintain.",
        why_choose_us=[
            "Modern Design: Clean layouts, beautiful animations, and professional styling.",
            "Responsive Layouts: Mobile-first responsive grids that scale perfectly across all screens.",
            "Affordable Pricing: Transparent and beginner-friendly rates tailored for individuals & small businesses.",
            "Clean Code: Lightweight React frontends and optimized Django backend systems.",
            "SEO Optimization: Semantic HTML5 elements and best practice meta tags for search visibility.",
            "Direct Communication: Work directly with the founder for swift updates and personal project support."
        ]
    )
    print("Site Settings seeded.")

    # 3. Founder
    founder = Founder.objects.create(
        name="Pankaj Patel",
        title="Founder & Freelance Web Developer",
        bio=(
            "I am Pankaj Patel, a web developer passionate about building modern and responsive websites. "
            "I am continuously learning new technologies and working on real-world projects to improve my skills "
            "and help clients establish their online presence."
        ),
        achievements=[
            "Focus on building responsive & modern websites",
            "Committed to clean code and prompt support",
            "Learning and applying React.js, Django, & Vite",
            "Using modern AI tools to accelerate development speed"
        ],
        roles=[
            "Portfolio Websites",
            "Business Websites",
            "Landing Pages",
            "Website Maintenance"
        ]
    )
    print("Founder details seeded.")

    # 4. Services
    services_data = [
        {"title": "Portfolio Websites", "icon_name": "FaUserTie", "description": "Sleek, personal portfolio systems designed to showcase your skills, achievements, and work."},
        {"title": "Business Websites", "icon_name": "FaGlobe", "description": "Modern, responsive websites built to establish a professional digital presence for small businesses."},
        {"title": "Landing Pages", "icon_name": "FaRocket", "description": "Focused, high-converting single-page layouts optimized for marketing campaigns and lead capture."},
        {"title": "React Frontend Development", "icon_name": "FaReact", "description": "Interactive, highly dynamic user interfaces built with React, Vite, and Tailwind CSS."},
        {"title": "Django Backend Development", "icon_name": "FaServer", "description": "Secure, lightweight database systems, secure admin panels, and custom backend API logic with Django."},
        {"title": "Website Maintenance", "icon_name": "FaTachometerAlt", "description": "Regular website monitoring, minor styling tweaks, performance tuning, and content updates."}
    ]
    for i, s in enumerate(services_data):
        Service.objects.create(title=s["title"], icon_name=s["icon_name"], description=s["description"], order=i)
    print("Services seeded.")

    # 5. Skills
    skills_data = [
        # Frontend
        {"name": "React.js", "category": "Frontend", "proficiency": 85, "icon_name": "RiReactjsLine"},
        {"name": "Tailwind CSS", "category": "Frontend", "proficiency": 90, "icon_name": "SiTailwindcss"},
        {"name": "JavaScript (ES6+)", "category": "Frontend", "proficiency": 80, "icon_name": "IoLogoJavascript"},
        {"name": "HTML5 / CSS3", "category": "Frontend", "proficiency": 90, "icon_name": "FaHtml5"},
        
        # Backend
        {"name": "Django", "category": "Backend", "proficiency": 80, "icon_name": "DiDjango"},
        {"name": "Python", "category": "Backend", "proficiency": 85, "icon_name": "FaPython"},

        # Database
        {"name": "SQLite", "category": "Database", "proficiency": 85, "icon_name": "SiSqlite"},

        # Tools
        {"name": "Git & GitHub", "category": "Tools", "proficiency": 80, "icon_name": "FaGithub"},
        {"name": "VS Code", "category": "Tools", "proficiency": 90, "icon_name": "SiVisualstudiocode"},

        # AI & Automation
        {"name": "AI Tool Integrations", "category": "AI & Automation", "proficiency": 90, "icon_name": "FaRobot"}
    ]
    for sk in skills_data:
        Skill.objects.create(name=sk["name"], category=sk["category"], proficiency=sk["proficiency"], icon_name=sk["icon_name"])
    print("Skills seeded.")

    # 6. Projects
    projects_data = [
        {
            "title": "Smart Queue Management System",
            "description": "An interactive web system helping businesses track customer queues dynamically. Features queue updates, real-time client notification dashboard, and beautiful charts.",
            "category": "Web Application",
            "technologies": ["React.js", "Django", "Django REST Framework", "SQLite", "Tailwind CSS"],
            "github_link": "https://github.com/PankajPatel/smart-queue-management",
            "live_demo_link": "https://queue.siteeforgestudio.com",
            "featured": True,
            "order": 1
        },
        {
            "title": "Portfolio Website",
            "description": "The responsive and modern developer portfolio website and founder portal itself. Built using React, Vite, Tailwind CSS, Framer Motion, and Django REST API.",
            "category": "Website",
            "technologies": ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Django", "SQLite"],
            "github_link": "https://github.com/PankajPatel/siteeforge-studio",
            "live_demo_link": "https://siteeforgestudio.com",
            "featured": True,
            "order": 2
        }
    ]
    for p in projects_data:
        Project.objects.create(
            title=p["title"],
            description=p["description"],
            category=p["category"],
            technologies=p["technologies"],
            github_link=p["github_link"],
            live_demo_link=p["live_demo_link"],
            featured=p["featured"],
            order=p["order"]
        )
    print("Projects seeded.")

    # 7. Testimonials
    # Kept empty as no real-world testimonials exist yet for the founder.
    print("Testimonials cleared (Testimonials section hidden).")

    # 8. Social Links
    socials_data = [
        {"platform": "GitHub", "url": "https://github.com/PankajPatel", "icon_name": "FaGithub"},
        {"platform": "LinkedIn", "url": "https://linkedin.com/in/pankaj-patel", "icon_name": "FaLinkedin"},
        {"platform": "Twitter", "url": "https://twitter.com/pankaj_patel", "icon_name": "FaTwitter"}
    ]
    for sc in socials_data:
        SocialLink.objects.create(platform=sc["platform"], url=sc["url"], icon_name=sc["icon_name"])
    print("Social links seeded.")

    print("\nData Seeding completed successfully! Default admin: admin / admin123")

if __name__ == "__main__":
    seed()
