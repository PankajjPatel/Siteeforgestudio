from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.static import serve as static_serve
import os

@ensure_csrf_cookie
def serve_react(request):
    try:
        # Read built index.html from frontend dist folder
        dist_index = os.path.join(settings.BASE_DIR, '../frontend/dist/index.html')
        with open(dist_index, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse(
            """
            <html>
            <head><title>SiteeForgeStudio - Building...</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 100px; background-color: #080c14; color: #ffffff;">
                <h2>Web App is building...</h2>
                <p>Please build the frontend using 'npm run build' or refresh in a few seconds.</p>
            </body>
            </html>
            """,
            status=503
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('agency.urls')),
]

# Serve static and media files using django's static serve view as a robust fallback
urlpatterns += [
    re_path(r'^static/(?P<path>.*)$', static_serve, {'document_root': settings.STATICFILES_DIRS[0] if settings.STATICFILES_DIRS else settings.STATIC_ROOT}),
    re_path(r'^media/(?P<path>.*)$', static_serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^.*$', serve_react),
]
