import type { ReactNode } from 'react';
import { useAuth } from '../firebase/AuthContext';
import Login from '../pages/Login';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="centered-page"><p className="muted">Chargement...</p></div>;
  if (!user) return <Login />;
  return <>{children}</>;
}
