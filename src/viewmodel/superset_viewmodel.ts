import { useEffect, useRef, useState } from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { supersetService, type GuestUser } from '../services/superset_service';

interface UseSupersetEmbeddingProps {
  dashboardId: string;
  guestUser?: GuestUser;
}

/**
 * ViewModel: Maneja el estado y la lógica de negocio de la integración.
 */
export const useSupersetEmbedding = ({ 
  dashboardId, 
  guestUser = { username: "guest", first_name: "Guest", last_name: "User" } 
}: UseSupersetEmbeddingProps) => {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref para controlar StrictMode de React (doble ejecución)
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    // Patrón de bloqueo para evitar condiciones de carrera
    if (isMounted.current || !containerRef.current) return;
    isMounted.current = true;

    const initDashboard = async () => {
      try {
        setLoading(true);
        
        // 1. Orquestación de llamadas al servicio (Model)
        console.log("ViewModel: Iniciando secuencia de autenticación...");
        const accessToken = await supersetService.authenticate();
        const guestToken = await supersetService.fetchGuestToken(accessToken, dashboardId, guestUser);

        // 2. Lógica de Embedding (SDK)
        console.log("ViewModel: Montando dashboard en el DOM...");
        await embedDashboard({
          id: dashboardId,
          supersetDomain: 'http://localhost:8088',
          mountPoint: containerRef.current as HTMLElement, // "Binding" a la vista
          fetchGuestToken: () => Promise.resolve(guestToken),
          dashboardUiConfig: { 
            hideTitle: true,
            hideChartControls: true,
            hideTab: true
          },
          iframeSandboxExtras: [
            'allow-top-navigation', 
            'allow-popups-to-escape-sandbox', 
            'allow-forms', 
            'allow-scripts', 
            'allow-same-origin'
          ]
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido cargando el dashboard');
        setLoading(false);
      }
    };

    initDashboard();

  }, [dashboardId]); // Se re-ejecuta solo si cambia el ID del dashboard

  // Exponemos solo lo que la Vista necesita saber
  return { containerRef, loading, error };
};