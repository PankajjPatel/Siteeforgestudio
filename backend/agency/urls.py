from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet, FounderViewSet, ServiceViewSet, 
    SkillViewSet, ProjectViewSet, TestimonialViewSet, 
    SocialLinkViewSet, ContactMessageCreateView
)

router = DefaultRouter()
router.register(r'settings', SiteSettingsViewSet, basename='settings')
router.register(r'founder', FounderViewSet, basename='founder')
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')
router.register(r'social-links', SocialLinkViewSet, basename='social-links')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
]
