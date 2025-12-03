# anda a tu repo de superset, en esta ruta  
# ~/superset/docker/pythonpath_dev ((5.0.0))
#vas a configurar el archivo "superset_config.py"


# agrega estas configs a tu archivo

# --- AQUÍ ESTÁN TUS CAMBIOS PERSONALIZADOS (Fusionados correctamente) ---

# Hemos unificado los Flags aquí para que no se sobrescriban
FEATURE_FLAGS = {
    "ALERT_REPORTS": True,
    "EMBEDDED_SUPERSET": True
}

ALERT_REPORTS_NOTIFICATION_DRY_RUN = True
WEBDRIVER_BASEURL = "http://superset:8088/"
WEBDRIVER_BASEURL_USER_FRIENDLY = WEBDRIVER_BASEURL
SQLLAB_CTAS_NO_LIMIT = True

# 1. CORS: Permitir todo explícitamente con Regex
ENABLE_CORS = True
CORS_OPTIONS = {
    'supports_credentials': True,
    'allow_headers': ['*'],
    'resources': r'/*',  # Regex para permitir todas las rutas
    'origins': ['http://localhost:5173', 'http://localhost:3000', '*']
}

# 2. LA SOLUCIÓN  AL ERROR X-FRAME-OPTIONS
# Deshabilitamos Talisman en Dev para que no sobreescriba los headers
TALISMAN_ENABLED = False 

# 3. Forzamos el header manualmente (sin Talisman estorbando)
HTTP_HEADERS = {'X-Frame-Options': 'ALLOWALL'}
TALISMAN_CONFIG = {
    "content_security_policy": {
        "frame-ancestors": ["*", "http://localhost:5173", "http://localhost:3000"], #depende del puerto del servidor de vite
    },
    "force_https": False,
    "session_cookie_secure": False,
}


# 4. Desactivar protección CSRF para evitar errores 403 en POSTs locales
WTF_CSRF_ENABLED = False
WTF_CSRF_EXEMPT_LIST = ['/superset/csrf_token', '/api/v1/security/guest_token/', '/api/v1/security/login']

# # 5. Permitir que el iframe use cookies si fuera necesario
# SESSION_COOKIE_SAMESITE = 'None'
# SESSION_COOKIE_SECURE = False   # False porque usas http://localhost
# SESSION_COOKIE_HTTPONLY = False # A veces ayuda en iframes


# IMPORTANTE: Mantén esta Key fija para que no te vuelva a pasar el error al reiniciar
SECRET_KEY = "MI_SECRETO_SUPER_SEGURO_12345" 
GUEST_TOKEN_JWT_SECRET = "MI_SECRETO_INVITADO_12345"
# Asigna el rol Gamma (lector) a los usuarios invitados
GUEST_ROLE_NAME = "Gamma"
GUEST_TOKEN_JWT_EXP_SECONDS = 300

# --- FIN DE TUS CAMBIOS ---
