import { SupersetDashboard } from "./view/superset_dashboard";
import './App.css'

// Definimos el ID aquí o podríamos traerlo de variables de entorno (import.meta.env.VITE_DASHBOARD_ID)
const DASHBOARD_ID = "5f6d1cf4-45f7-4e32-ae50-d359f82de2fa";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Reporte Superset</h1>
        <p className="subtitle">Integración MVVM con React</p>
      </header>
      
      <main className="dashboard-layout">
        <SupersetDashboard dashboardId={DASHBOARD_ID} />
      </main>
    </div>
  );
}

export default App;