import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthContext';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import SessionResults from './pages/SessionResults';
import PublicTest from './pages/PublicTest';
import PublicResults from './pages/PublicResults';
import MethodsLibrary from './pages/MethodsLibrary';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/t/:sessionId" element={<PublicTest />} />
          <Route path="/r/:sessionId" element={<PublicResults />} />
          {/* Accès libre : le tableau de bord gère lui-même l'état connecté/non
              connecté, et la bibliothèque de méthodes est une simple ressource
              de consultation. Seules les pages de gestion d'une session précise
              restent réservées à son propriétaire. */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/methods" element={<MethodsLibrary />} />
          <Route
            path="/session/:id"
            element={
              <RequireAuth>
                <SessionDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/session/:id/results"
            element={
              <RequireAuth>
                <SessionResults />
              </RequireAuth>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
