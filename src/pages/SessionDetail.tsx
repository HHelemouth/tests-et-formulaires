import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession, setSessionStatus } from '../firebase/sessions';
import { getTestDefinition } from '../testDefinitions/registry';
import type { TestSession } from '../types';

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<TestSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    getSession(id).then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="page"><p className="muted">Chargement...</p></div>;
  if (!session) return <div className="page"><p className="muted">Session introuvable.</p></div>;

  const test = getTestDefinition(session.testTypeId);
  const shareUrl = `${window.location.origin}${window.location.pathname}#/t/${session.id}`;

  const toggleStatus = async () => {
    const next = session.status === 'open' ? 'closed' : 'open';
    await setSessionStatus(session.id, next);
    setSession({ ...session, status: next });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Mes sessions
      </Link>

      <header className="page-header">
        <div>
          <h1>{session.name}</h1>
          <p className="muted">
            {test?.name ?? session.testTypeId} · créée le {new Date(session.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <span className={`status-badge ${session.status}`}>{session.status === 'open' ? 'En cours' : 'Terminée'}</span>
      </header>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-value">{session.responseCount}</div>
          <div className="stat-label">participant{session.responseCount > 1 ? 's' : ''}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{session.requireEmail ? 'Oui' : 'Non'}</div>
          <div className="stat-label">email requis</div>
        </div>
      </div>

      <div className="panel">
        <h2>Lien à partager (formulaire)</h2>
        <div className="share-row">
          <input readOnly value={shareUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
          <button className="btn-secondary" onClick={copyLink}>
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      <div className="panel-actions" style={{ marginTop: 24 }}>
        <button className="btn-secondary" onClick={toggleStatus}>
          {session.status === 'open' ? 'Clore la session' : 'Rouvrir la session'}
        </button>
        <Link to={`/session/${session.id}/results`} className="btn-primary">
          Voir les résultats →
        </Link>
      </div>
    </div>
  );
}
