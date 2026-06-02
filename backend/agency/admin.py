from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SiteSettings, Founder, Service, Skill, 
    Project, Testimonial, SocialLink, ContactMessage
)

# Custom admin header
admin.site.site_header = "SiteeForgeStudio Administration"
admin.site.site_title = "SiteeForgeStudio Portal"
admin.site.index_title = "Welcome to SiteeForgeStudio Control Panel"

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'phone', 'whatsapp_number')
    readonly_fields = ('logo_preview',)
    fieldsets = (
        ('General Info', {
            'fields': ('title', 'tagline', 'logo', 'logo_preview')
        }),
        ('Contact details', {
            'fields': ('email', 'phone', 'whatsapp_number', 'address', 'resume')
        }),
        ('Brand Details', {
            'fields': ('about_text', 'mission', 'vision', 'why_choose_us')
        }),
    )

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 80px;" />', obj.logo.url)
        return "No logo uploaded"
    logo_preview.short_description = "Logo Preview"

    def has_add_permission(self, request):
        # Allow only one settings instance
        return not SiteSettings.objects.exists()

@admin.register(Founder)
class FounderAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.profile_image:
            return format_html('<img src="{}" style="max-height: 80px; border-radius: 50%;" />', obj.profile_image.url)
        return "No profile image"
    image_preview.short_description = "Profile Image Preview"

    def has_add_permission(self, request):
        # Allow only one founder profile
        return not Founder.objects.exists()

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'description')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order')
    list_editable = ('featured', 'order')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'description', 'technologies')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 80px; border-radius: 4px;" />', obj.image.url)
        return "No project image"
    image_preview.short_description = "Project Image Preview"

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'client_company', 'rating', 'order')
    list_editable = ('order',)
    list_filter = ('rating',)
    search_fields = ('client_name', 'client_company', 'feedback')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.client_image:
            return format_html('<img src="{}" style="max-height: 80px; border-radius: 50%;" />', obj.client_image.url)
        return "No image"
    image_preview.short_description = "Client Image Preview"

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'icon_name')
    search_fields = ('platform',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service_required', 'budget', 'status', 'created_at')
    list_filter = ('status', 'service_required', 'created_at')
    list_editable = ('status',)
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('name', 'email', 'phone', 'service_required', 'budget', 'message', 'created_at')
    
    fieldsets = (
        ('Inquiry Information', {
            'fields': ('name', 'email', 'phone', 'service_required', 'budget', 'message', 'created_at')
        }),
        ('Action Plan', {
            'fields': ('status',)
        }),
    )

    def has_add_permission(self, request):
        return False  # Inquiries only come from frontend POST submissions
