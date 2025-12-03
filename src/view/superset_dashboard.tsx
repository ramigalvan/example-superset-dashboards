import { useSupersetEmbedding } from '../viewmodel/superset_viewmodel';

interface Props {
  dashboardId: string;
}

export const SupersetDashboard = ({ dashboardId }: Props) => {
  // Conectamos la Vista con el ViewModel
  const { containerRef, loading, error } = useSupersetEmbedding({
    dashboardId
  });

  return (
    <div className="dashboard-container-wrapper">
      {/* Estado de Carga */}
      {loading && (
        <div className="status-message loading">
          <div className="spinner"></div>
          <p>Conectando con Superset...</p>
        </div>
      )}

      {/* Estado de Error */}
      {error && (
        <div className="status-message error">
          <p> Error: {error}</p>
        </div>
      )}

      {/* Contenedor del Iframe (El ViewModel inyectará aquí el reporte) */}
      <div 
        id="superset-container" 
        ref={containerRef} 
        className={loading ? 'hidden' : 'visible'}
      />
    </div>
  );
};