# anda a tu repo de superset, en esta ruta  
# ~/superset/docker/pythonpath_dev ((5.0.0))
#vas a configurar el archivo "superset_config.py"


# agrega estas configs a tu archivo

# --- AQUÍ ESTÁN TUS CAMBIOS PERSONALIZADOS (Fusionados correctamente) ---

#=================================================================
# 1. FEATURE FLAGS & CONFIGURACIÓN GENERAL
# =================================================================
FEATURE_FLAGS = {
    # Habilita alertas y reportes (requiere Celery)
    "ALERT_REPORTS": True,
    # Habilita la funcionalidad de "Embedded SDK" y Guest Tokens
    # Necesario si planeas usar tokens de invitado en el futuro en lugar de iframes públicos
    "EMBEDDED_SUPERSET": True 
}

# Configuración necesaria para que Celery pueda generar capturas de pantalla
# 'superset:8088' es el nombre del servicio dentro de la red de Docker
ALERT_REPORTS_NOTIFICATION_DRY_RUN = True
WEBDRIVER_BASEURL = "http://superset:8088/"
WEBDRIVER_BASEURL_USER_FRIENDLY = WEBDRIVER_BASEURL

# Permite crear tablas sin límite de filas en SQL Lab (Útil en dev, cuidado en prod)
SQLLAB_CTAS_NO_LIMIT = True

# =================================================================
# 2. CORS (Cross-Origin Resource Sharing)
# =================================================================
# WARNING: Permitir '*' en orígenes es inseguro para Producción.
# En producción, reemplazar '*' con la lista estricta de dominios (ej: https://miapp.com)
ENABLE_CORS = True
CORS_OPTIONS = {
    'supports_credentials': True,
    'allow_headers': ['*'],
    'resources': r'/*',  # Regex para permitir todas las rutas de la API
    'origins': ['http://localhost:5173', 'http://localhost:3000', '*']
}

# =================================================================
# 3. MANEJO DE IFRAMES Y HEADERS (TALISMAN)
# =================================================================
# ESTRATEGIA ACTUAL: Deshabilitar Talisman y forzar headers manualmente.
# Esto soluciona el error 'Refused to display... X-Frame-Options' en localhost.
TALISMAN_ENABLED = False 

# Forzamos el header manualmente porque Flask por defecto podría bloquear el iframe.
# 'ALLOWALL' es permisivo; permite que cualquier sitio incruste este Superset.
HTTP_HEADERS = {'X-Frame-Options': 'ALLOWALL'}

# NOTA: La siguiente configuración de TALISMAN_CONFIG es IGNORADA actualmente
# porque TALISMAN_ENABLED está en False. Se deja como referencia por si
# se decide habilitar la seguridad estricta más adelante.
TALISMAN_CONFIG = {
    "content_security_policy": {
        "frame-ancestors": ["*", "http://localhost:5173", "http://localhost:3000"], 
    },
    "force_https": False,
    "session_cookie_secure": False,
}

# =================================================================
# 4. PROTECCIÓN CSRF
# =================================================================
# WARNING: Deshabilitar CSRF es un riesgo de seguridad alto.
# Se deshabilita aquí para evitar errores 403 en peticiones POST desde localhost (dev).
# Si se habilita, hay que manejar el token X-CSRFToken en el frontend.
WTF_CSRF_ENABLED = False
WTF_CSRF_EXEMPT_LIST = ['/superset/csrf_token', '/api/v1/security/guest_token/', '/api/v1/security/login']

# =================================================================
# 5. SEGURIDAD Y TOKENS
# =================================================================
# IMPORTANTE: Cambiar estas claves en Producción usando `openssl rand -base64 42`
SECRET_KEY = "MI_SECRETO_SUPER_SEGURO_12345" 
GUEST_TOKEN_JWT_SECRET = "MI_SECRETO_INVITADO_12345"

# Configuración de Roles para usuarios invitados (Embedded SDK)
# 'Gamma' da acceso de solo lectura a los datos permitidos.
GUEST_ROLE_NAME = "Gamma"
GUEST_TOKEN_JWT_EXP_SECONDS = 300 # 5 minutos de validez para el token

# --- FIN DE TUS CAMBIOS ---
