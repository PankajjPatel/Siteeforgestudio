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
        tagline="Modern web applications and websites built with Python, Django, and modern web technologies.",
        email="siteeforgestudio@gmail.com",
        phone="",
        whatsapp_number="",
        address="India",
        about_text=(
            "SiteeForgeStudio is an independent web development portfolio founded by Pankaj Patel, "
            "focused on building modern web applications and websites."
        ),
        mission="Currently focused on improving backend development skills with Django, building full-stack projects, and exploring AI-assisted development workflows.",
        vision="To build a professional online presence and highlight real-world development work.",
        why_choose_us=[
            "Modern Web Tech: Responsive layouts crafted with HTML5 and Tailwind CSS.",
            "Clean Backend Logic: Secure database integration and clean code structures with Python & Django.",
            "Relational Databases: Well-structured database queries and management using MySQL & SQL.",
            "Version Control: Safe code deployments, issue tracking, and version history using Git and GitHub.",
            "AI Integration: Leveraging tools like ChatGPT, Gemini, and Claude for faster learning and code testing.",
            "Continuous Study: Constantly developing real-world academic & hobby projects to expand engineering skills."
        ]
    )
    print("Site Settings seeded.")

    # 3. Founder
    founder = Founder.objects.create(
        name="Pankaj Patel",
        title="Computer Science Student & Developer",
        bio=(
            "I am Pankaj Patel, a Computer Science student passionate about web development and software engineering. "
            "I enjoy building web applications using Python, Django, HTML, Tailwind CSS, and MySQL. "
            "I actively use modern AI-assisted development tools to accelerate learning, improve productivity, "
            "and enhance development workflows while continuously building real-world projects."
        ),
        achievements=[
            "Computer Science Student",
            "Building real-world web apps with Python & Django",
            "Designing responsive layouts using Tailwind CSS",
            "Leveraging AI assistance for rapid learning & testing"
        ],
        roles=[
            "Python • Django • Web Development",
            "Building Modern Web Applications"
        ]
    )
    print("Founder details seeded.")

    # 4. Services
    services_data = [
        {"title": "Python & Django Apps", "icon_name": "FaPython", "description": "Full-stack web systems built using Django's secure, robust web framework."},
        {"title": "Responsive Web Design", "icon_name": "FaHtml5", "description": "Modern, lightweight, and responsive user interfaces created using HTML5 and Tailwind CSS."},
        {"title": "Database Management", "icon_name": "FaDatabase", "description": "Designing relational database schemas and writing optimized queries using MySQL and SQL."},
        {"title": "Git & Version Control", "icon_name": "FaGithub", "description": "Using Git branching strategies, pull requests, and GitHub repositories for clean collaborative workflows."},
        {"title": "AI-Assisted Workflows", "icon_name": "FaRobot", "description": "Employing LLMs like Claude, Gemini, and ChatGPT to optimize, test, and document code structures."},
        {"title": "Academic & Full Stack Projects", "icon_name": "FaLaptopCode", "description": "Building real-world portfolio case studies to solve engineering issues and track queue lines."}
    ]
    for i, s in enumerate(services_data):
        Service.objects.create(title=s["title"], icon_name=s["icon_name"], description=s["description"], order=i)
    print("Services seeded.")

    # 5. Skills
    skills_data = [
        # Programming
        {"name": "Python", "category": "Programming", "proficiency": 85, "icon_name": "FaPython"},
        {"name": "SQL", "category": "Programming", "proficiency": 80, "icon_name": "FaDatabase"},

        # Frontend
        {"name": "HTML5", "category": "Frontend", "proficiency": 90, "icon_name": "FaHtml5"},
        {"name": "Tailwind CSS", "category": "Frontend", "proficiency": 85, "icon_name": "SiTailwindcss"},
        
        # Backend
        {"name": "Django", "category": "Backend", "proficiency": 80, "icon_name": "DiDjango"},

        # Database
        {"name": "MySQL", "category": "Database", "proficiency": 80, "icon_name": "SiMysql"},

        # Tools
        {"name": "Git", "category": "Tools", "proficiency": 85, "icon_name": "FaGitAlt"},
        {"name": "GitHub", "category": "Tools", "proficiency": 90, "icon_name": "FaGithub"},

        # AI-Assisted Development
        {"name": "ChatGPT", "category": "AI-Assisted Development", "proficiency": 90, "icon_name": "FaRobot"},
        {"name": "Gemini", "category": "AI-Assisted Development", "proficiency": 90, "icon_name": "FaBrain"},
        {"name": "Claude", "category": "AI-Assisted Development", "proficiency": 90, "icon_name": "FaBrain"}
    ]
    for sk in skills_data:
        Skill.objects.create(name=sk["name"], category=sk["category"], proficiency=sk["proficiency"], icon_name=sk["icon_name"])
    print("Skills seeded.")

    # 6. Projects
    projects_data = [
        {
            "title": "Smart Queue Management System",
            "description": "A web-based Smart Queue Management System developed for Hospitals, Banks, and Colleges. The system enables appointment booking, digital token generation, and live queue tracking to reduce waiting time and improve service efficiency.",
            "category": "Web Application",
            "technologies": ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
            "github_link": "https://github.com/PankajPatel/smart-queue-management",
            "live_demo_link": "https://queue.siteeforgestudio.com",
            "featured": True,
            "order": 1
        },
        {
            "title": "Portfolio Website",
            "description": "Personal portfolio website showcasing technical skills, projects, and development journey. Built to provide a professional online presence and highlight real-world development work.",
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
