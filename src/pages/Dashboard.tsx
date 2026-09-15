import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { createSession, listSessionsForUser } from '../firebase/sessions';
import type { TestSession } from '../types';
import { listTestDefinitions, getTestDefinition } from '../testDefinitions/registry';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const [name, setName] = useState('');
  const [testTypeId, setTestTypeId] = useState(listTestDefinitions()[0]?.id ?? '');
  const [requireEmail, setRequireEmail] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) return;
    listSessionsForUser(user.uid)
      .then((s) => {
        setSessions(s);
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(e instanceof Error ? e.message : 'Erreur de chargement.');
        setLoading(false);
      });
  }, [user]);

  const handleCreate = async () => {
    if (!user || !name.trim()) return;
    setCreating(true);
    const id = await createSession({
      ownerId: user.uid,
      ownerEmail: user.email ?? '',
      name: name.trim(),
      testTypeId,
      requireEmail,
    });
    setCreating(false);
    navigate(`/session/${id}`);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mes sessions</h1>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <button className="btn-secondary" onClick={() => logout()}>
            Se déconnecter
          </button>
        </div>
      </header>

      <button className="btn-primary" onClick={() => setShowNew(true)}>
        + Nouvelle session
      </button>

      {showNew && (
        <div className="panel new-session-panel">
          <h2>Nouvelle session</h2>
          <label>
            Nom de la session
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Proveil — septembre 2026" />
          </label>
          <label>
            Type de test
            <select value={testTypeId} onChange={(e) => setTestTypeId(e.target.value)}>
              {listTestDefinitions().map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          {getTestDefinition(testTypeId) && (
            <p className="test-about">{getTestDefinition(testTypeId)!.about}</p>
          )}
          <label className="checkbox-label">
            <input type="checkbox" checked={requireEmail} onChange={(e) => setRequireEmail(e.target.checked)} />
            Demander l'email des participants
          </label>
          <div className="panel-actions">
            <button className="btn-secondary" onClick={() => setShowNew(false)}>
              Annuler
            </button>
            <button className="btn-primary" disabled={!name.trim() || creating} onClick={handleCreate}>
              {creating ? 'Création...' : 'Créer la session'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="muted">Chargement...</p>
      ) : loadError ? (
        <p className="error-text">{loadError}</p>
      ) : sessions.length === 0 ? (
        <p className="muted">Aucune session pour le moment.</p>
      ) : (
        <div className="session-list">
          {sessions.map((s) => (
            <Link to={`/session/${s.id}`} key={s.id} className="session-card">
              <div className="session-card-top">
                <span className="session-name">{s.name}</span>
                <span className={`status-badge ${s.status}`}>{s.status === 'open' ? 'En cours' : 'Terminée'}</span>
              </div>
              <div className="session-card-meta">
                {new Date(s.createdAt).toLocaleDateString('fr-FR')} · {s.responseCount} participant
                {s.responseCount > 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
