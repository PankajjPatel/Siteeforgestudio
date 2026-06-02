from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import (
    SiteSettings, Founder, Service, Skill, 
    Project, Testimonial, SocialLink, ContactMessage
)
from .serializers import (
    SiteSettingsSerializer, FounderSerializer, ServiceSerializer, 
    SkillSerializer, ProjectSerializer, TestimonialSerializer, 
    SocialLinkSerializer, ContactMessageSerializer
)

class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

    def list(self, request, *args, **kwargs):
        settings = SiteSettings.objects.first()
        if settings:
            serializer = self.get_serializer(settings)
            return Response(serializer.data)
        # Return empty defaults if no settings record exists yet
        return Response({
            "title": "SiteeForgeStudio",
            "tagline": "Building Modern Digital Experiences",
            "logo": None,
            "email": "contact@siteeforgestudio.com",
            "phone": "+919876543210",
            "whatsapp_number": "+919876543210",
            "address": "India",
            "resume": None,
            "about_text": "Introduce SiteeForgeStudio and founder Pankaj Patel.",
            "mission": "Helping businesses grow through modern websites, web applications, and digital solutions.",
            "vision": "To be the premium standard of modern digital craftsmanship.",
            "why_choose_us": ["Modern UI/UX", "Responsive Design", "Fast Performance", "SEO Friendly", "Affordable Pricing", "Ongoing Support"]
        }, status=status.HTTP_200_OK)

class FounderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Founder.objects.all()
    serializer_class = FounderSerializer

    def list(self, request, *args, **kwargs):
        founder = Founder.objects.first()
        if founder:
            serializer = self.get_serializer(founder)
            return Response(serializer.data)
        return Response({
            "name": "Pankaj Patel",
            "title": "Founder & Principal Developer",
            "profile_image": None,
            "bio": "Founder of SiteeForgeStudio. Full Stack Developer specializing in building modern premium web systems using React and Django.",
            "achievements": [
                "50+ Projects Successfully Completed",
                "100% Client Satisfaction Rating",
                "Full Stack Developer specializing in high-performance apps",
                "Advanced AI integrations & dynamic automations"
            ],
            "roles": [
                "Full Stack Developer",
                "React Developer",
                "Django Developer",
                "Freelancer",
                "AI Enthusiast"
            ]
        }, status=status.HTTP_200_OK)

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().order_by('order')
    serializer_class = ServiceSerializer

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def get_queryset(self):
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('order')
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all().order_by('order')
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == 'true')
        return queryset

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all().order_by('order')
    serializer_class = TestimonialSerializer

class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
