import axios from 'axios';

// Definición de Tipos para nuestro Dominio
export interface GuestUser {
  username: string;
  first_name: string;
  last_name: string;
}

export interface SupersetConfig {
  supersetUrl: string;
  dashboardId: string;
}

// Credenciales (En un entorno real, esto vendría de variables de entorno)
const AUTH_CREDS = {
  username: "admin",
  password: "admin",
  provider: "db",
  refresh: true
};

/**
 * Servicio encargado de la comunicación HTTP con Apache Superset.
 */
export class SupersetService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Paso 1: Obtener el Access Token de administrador
   */
  async authenticate(): Promise<string> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/api/v1/security/login`,
        AUTH_CREDS,
        { headers: { "Content-Type": "application/json" } }
      );
      return data.access_token;
    } catch (error) {
      console.error("Fallo en autenticación Superset", error);
      throw new Error("No se pudo iniciar sesión en Superset");
    }
  }

  /**
   * Paso 2: Generar el Guest Token con permisos específicos
   */
  async fetchGuestToken(accessToken: string, dashboardId: string, user: GuestUser): Promise<string> {
    const guestTokenBody = {
      user: user,
      resources: [{ type: "dashboard", id: dashboardId }],
      rls: [], // Row Level Security rules
    };

    try {
      const { data } = await axios.post(
        `${this.baseUrl}/api/v1/security/guest_token/`,
        guestTokenBody,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        }
      );
      return data.token;
    } catch (error) {
      console.error("Fallo obteniendo Guest Token", error);
      throw new Error("No se pudo generar el token de invitado");
    }
  }
}

// Singleton para usar en la app
export const supersetService = new SupersetService('http://localhost:8088');