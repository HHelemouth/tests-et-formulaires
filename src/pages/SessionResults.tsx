import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession, listResponses } from '../firebase/sessions';
import { getTestDefinition } from '../testDefinitions/registry';
import { computeResults, computeItemLeans } from '../testDefinitions/scoring';
import { generateInsights } from '../testDefinitions/generateInsights';
import type { TestSession, TestResponse, DimensionResult } from '../types';

export default function SessionResults() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<TestSession | null>(null);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getSession(id), listResponses(id)])
      .then(([s, r]) => {
        setSession(s);
        setResponses(r);
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(e instanceof Error ? e.message : 'Erreur de chargement.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="page"><p className="muted">Chargement...</p></div>;
  if (loadError) return <div className="page"><p className="error-text">{loadError}</p></div>;
  if (!session) return <div className="page"><p className="muted">Session introuvable.</p></div>;

  const test = getTestDefinition(session.testTypeId);
  if (!test) return <div className="page"><p className="muted">Type de test inconnu.</p></div>;

  const results: DimensionResult[] = computeResults(test, responses);
  const itemLeans = computeItemLeans(test, responses);
  const insights = generateInsights(test, results, itemLeans, responses.length);
  const resultsUrl = `${window.location.origin}${window.location.pathname}#/session/${session.id}/results`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(resultsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const rows = [
      ['Participant', 'Rôle', 'Email', 'Date', ...results.flatMap((d) => d.itemAverages.map((it) => `${d.key} — ${it.label}`))],
      ...responses.map((r) => [
        r.participantName,
        r.participantRole,
        r.participantEmail ?? '',
        new Date(r.submittedAt).toLocaleString('fr-FR'),
        ...results.flatMap((d) => d.itemAverages.map((_, i) => r.answers[`${d.key}-${i}`] ?? '')),
      ]),
    ];
    const csv = rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${session.name.replace(/\s+/g, '_')}_resultats.csv`;
    link.click();
  };

  const range = test.scaleMax - test.scaleMin;
  const half = range / 2;

  return (
    <div className="page">
      <Link to={`/session/${session.id}`} className="back-link">
        ← {session.name}
      </Link>

      <header className="page-header">
        <div>
          <h1>Résultats</h1>
          <p className="muted">
            {test.name} · {responses.length} réponse{responses.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={copyLink}>
            {copied ? 'Lien copié !' : 'Partager le lien'}
          </button>
          <button className="btn-secondary" onClick={downloadCsv} disabled={responses.length === 0}>
            Télécharger (CSV)
          </button>
        </div>
      </header>

      {responses.length === 0 ? (
        <p className="muted">Aucune réponse pour le moment.</p>
      ) : (
        <>
          <div className="panel insights-panel">
            <h2>Interprétation</h2>
            {insights.sampleTooSmall && (
              <p className="muted" style={{ marginBottom: 12 }}>
                Peu de réponses pour l'instant ({responses.length}) — cette lecture est encore fragile, à confirmer avec plus de participants.
              </p>
            )}
            <p>{insights.overview}</p>
            <ul className="dim-tone-list">
              {insights.dimensionLines.map((d) => (
                <li key={d.name}>
                  <strong>{d.name}</strong> — {d.tone}
                </li>
              ))}
            </ul>

            {insights.watchouts.length > 0 && (
              <>
                <h3 className="insights-subhead">Pistes de réflexion</h3>
                <ul className="insights-list">
                  {insights.watchouts.map((w) => (
                    <li key={w.label + w.dimension}>
                      <strong>{w.label}</strong> ({w.dimension}) — {w.suggestion}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="res-summary">
            {results.map((d) => (
              <div className="res-card" key={d.key}>
                <div className="val" style={{ color: d.color }}>
                  {d.average !== null ? (d.average >= 0 ? '+' : '') + d.average.toFixed(2) : '—'}
                </div>
                <div className="label">{d.name}</div>
              </div>
            ))}
          </div>

          {results.map((d) => (
            <div className="dim-result" key={d.key}>
              <div className="dim-result-head">
                <span className="name">{d.name}</span>
                <span className="score">
                  {d.average !== null ? (d.average >= 0 ? '+' : '') + d.average.toFixed(2) : 'pas de données'}
                </span>
              </div>
              <div className="bar-track">
                <div className="bar-zero" />
                {d.average !== null && (
                  <div
                    className="bar-fill"
                    style={{
                      background: d.color,
                      left: `${Math.min(50, ((d.average + half) / range) * 100)}%`,
                      width: `${Math.abs(((d.average + half) / range) * 100 - 50)}%`,
                    }}
                  />
                )}
              </div>
              <table className="item-table">
                <tbody>
                  {d.itemAverages.map((it) => (
                    <tr key={it.label}>
                      <td className="axis">{it.label}</td>
                      <td>{it.average !== null ? (it.average >= 0 ? '+' : '') + it.average.toFixed(1) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="panel" style={{ marginTop: 32 }}>
            <h2>Répondants</h2>
            <ul className="respondent-list">
              {responses.map((r) => (
                <li key={r.id}>
                  {r.participantName || 'Anonyme'} {r.participantRole ? `— ${r.participantRole}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {test.citation && <p className="muted citation">Instrument : {test.citation}</p>}
    </div>
  );
}
