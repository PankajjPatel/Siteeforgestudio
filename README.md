# SiteeForgeStudio - Digital Agency & Website Craftsman Studio 💻
> **Tagline:** Building Premium, Modern, and Scalable Digital Experiences.

SiteeForgeStudio is a production-grade web application tailored for a web development/design agency. It allows creators to showcase their services, projects, dynamic founder profiles, client testimonials, and skills, while enabling prospective clients to submit customized quote requests (with budget and service categories) that automatically send email leads to the founder.

It features a unified setup architecture where a modern React-based Single Page Application (SPA) frontend is built and served directly as static assets from a Django-based REST API backend.

---

## 🛠️ Tech Stack & Key Technologies

### Frontend
- **Framework & Libraries:** React, Vite (as build & hot-module-replacement system)
- **Routing & Styling:** React Icons & Custom responsive CSS layouts
- **Production Delivery:** Pre-compiled static HTML/JS/CSS assets bundled to the backend's static directory

### Backend
- **Core Framework:** Python & Django 5.0+
- **REST API:** Django REST Framework (DRF)
- **Database client:** PyMySQL (connecting to local MySQL Server)
- **Configuration management:** django-environ
- **Notifications:** Integrated SMTP mail system (`django.core.mail`) to dispatch real-time client leads to agency admins
- **Production Server:** Gunicorn (with WSGI runner)

---

## 📂 Project Architecture Layout

```
siteeforge/
├── backend/                    # Django API & Server Directory
│   ├── agency/                 # Main agency logic app
│   │   ├── models.py           # SiteSettings, Founder, Service, Skill, Project, Testimonial, ContactMessage
│   │   ├── views.py            # DRF ViewSets & SMTP email sender on contact creation
│   │   ├── serializers.py      # Serializers for model exchange
│   │   └── urls.py             # API endpoints mapping
│   ├── siteeforge_backend/     # Main Django config directory (settings.py, urls.py)
│   ├── db_setup.py             # Helper to initialize local MySQL database
│   ├── seed_data.py            # Seeder to populate initial mock agency data
│   ├── requirements.txt        # Backend dependencies list
│   └── manage.py               # Django manager
│
├── frontend/                   # React Vite Frontend SPA
│   ├── src/                    # Components, hooks, and views
│   └── package.json            # npm packages list
│
└── run_project.bat             # Unified Windows Batch script to build, configure, and launch the app
```

---

## 🚀 Unified Setup & Launch Guide

For convenience, a unified launch script is provided at the root folder.

### Prerequisites
1. **Python 3.10+** installed and added to PATH.
2. **Node.js & npm** installed.
3. **MySQL Server 8.0+** running locally.
   - Default Database name: `siteeforge`
   - Default Username: `root`
   - Default Password: `Root@123` (Ensure database credentials in backend `.env` match your configuration).

### Quick Launch (Windows)
Double-click `run_project.bat` in the project root directory. This script will automatically:
1. Build the React frontend into static assets.
2. Create the backend Python virtual environment (`.venv`) and install pip packages.
3. Setup the MySQL database.
4. Apply migrations and seed default content.
5. Run the development server at `http://127.0.0.1:8000/`.

---

## 🔑 Default Accounts (Admin Dashboard)

To edit the agency details, add projects, change skills, or view contact messages:
- **Admin Dashboard URL:** `http://127.0.0.1:8000/admin`
- **Username:** `admin`
- **Password:** `admin123`
