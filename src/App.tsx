import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthContext';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import SessionResults from './pages/SessionResults';
import PublicTest from './pages/PublicTest';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/t/:sessionId" element={<PublicTest />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
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
