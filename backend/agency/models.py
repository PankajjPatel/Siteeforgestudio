from django.db import models

class SiteSettings(models.Model):
    title = models.CharField(max_length=255, default="SiteeForgeStudio")
    tagline = models.CharField(max_length=255, default="Building Modern Digital Experiences")
    logo = models.ImageField(upload_to='site_assets/', blank=True, null=True)
    email = models.EmailField(default="contact@siteeforgestudio.com")
    phone = models.CharField(max_length=20, default="+919876543210")
    whatsapp_number = models.CharField(max_length=20, default="+919876543210")
    address = models.TextField(default="India")
    resume = models.FileField(upload_to='resume/', blank=True, null=True)
    about_text = models.TextField(blank=True, null=True)
    mission = models.TextField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    why_choose_us = models.JSONField(default=list, blank=True, help_text="List of reasons, e.g. ['Modern UI/UX', 'Responsive Design']")

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.title

class Founder(models.Model):
    name = models.CharField(max_length=100, default="Pankaj Patel")
    title = models.CharField(max_length=255, default="Founder & Principal Developer")
    profile_image = models.ImageField(upload_to='founder/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    achievements = models.JSONField(default=list, blank=True, help_text="List of achievements")
    roles = models.JSONField(default=list, blank=True, help_text="List of dynamic typing roles, e.g. ['Full Stack Developer', 'React Developer']")

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=50, help_text="React Icon name or Lucide name, e.g. FaLaptopCode, FaReact, FaServer")
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Database', 'Database'),
        ('Tools', 'Tools'),
        ('AI & Automation', 'AI & Automation'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.PositiveIntegerField(default=80, help_text="Proficiency percentage (0-100)")
    icon_name = models.CharField(max_length=50, blank=True, null=True, help_text="Icon name, e.g. DiReact, DiPython")

    def __str__(self):
        return f"{self.name} ({self.category})"

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend Development'),
        ('Backend', 'Backend Development'),
        ('Full Stack', 'Full Stack Development'),
        ('Mobile App', 'Mobile Development'),
        ('AI', 'AI Integration'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Full Stack')
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    technologies = models.JSONField(default=list, help_text="List of technology names")
    github_link = models.URLField(blank=True, null=True)
    live_demo_link = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    client_role = models.CharField(max_length=100)
    client_company = models.CharField(max_length=100, blank=True, null=True)
    client_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    feedback = models.TextField()
    rating = models.PositiveIntegerField(default=5, help_text="Rating between 1 and 5")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.client_name} - {self.client_company or ''}"

class SocialLink(models.Model):
    platform = models.CharField(max_length=50)
    url = models.URLField()
    icon_name = models.CharField(max_length=50, help_text="React Icon name, e.g. FaGithub, FaLinkedin")

    def __str__(self):
        return self.platform

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Contacted', 'Contacted'),
        ('Completed', 'Completed'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    service_required = models.CharField(max_length=100, blank=True, null=True)
    budget = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Message from {self.name} - {self.email}"
