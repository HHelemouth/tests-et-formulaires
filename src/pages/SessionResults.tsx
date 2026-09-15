import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession, listResponses } from '../firebase/sessions';
import { getTestDefinition } from '../testDefinitions/registry';
import { computeResults, computeItemLeans } from '../testDefinitions/scoring';
import { generateInsights } from '../testDefinitions/generateInsights';
import ResultsBody from '../components/ResultsBody';
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

      <ResultsBody test={test} results={results} insights={insights} responses={responses} />
    </div>
  );
}
