import os
import sys
from django.core.wsgi import get_wsgi_application

# Ensure the root folder is in Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'modelviewer.settings')

_django_app = get_wsgi_application()

def app(environ, start_response):
    # Strip the vercel entrypoint prefix so Django receives clean URLs ('/', '/admin/', etc.)
    path_info = environ.get('PATH_INFO', '')
    if path_info.startswith('/api/index.py'):
        environ['PATH_INFO'] = path_info.replace('/api/index.py', '', 1) or '/'
    elif path_info.startswith('/api'):
        environ['PATH_INFO'] = path_info.replace('/api', '', 1) or '/'

    return _django_app(environ, start_response)