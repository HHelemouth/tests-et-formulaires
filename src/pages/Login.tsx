import { useAuth } from '../firebase/AuthContext';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="centered-page">
      <div className="login-card">
        <h1>Tests &amp; Formulaires</h1>
        <p>Connecte-toi pour créer et gérer tes sessions de test.</p>
        <button className="btn-primary" onClick={() => loginWithGoogle()}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
