import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSession, listResponses } from '../firebase/sessions';
import { getTestDefinition } from '../testDefinitions/registry';
import { computeResults, computeItemLeans } from '../testDefinitions/scoring';
import { generateInsights } from '../testDefinitions/generateInsights';
import ResultsBody from '../components/ResultsBody';
import type { TestSession, TestResponse, DimensionResult } from '../types';

export default function PublicResults() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<TestSession | null>(null);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    Promise.all([getSession(sessionId), listResponses(sessionId)])
      .then(([s, r]) => {
        setSession(s);
        setResponses(r);
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(e instanceof Error ? e.message : 'Erreur de chargement.');
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) return <div className="page"><p className="muted">Chargement...</p></div>;
  if (loadError) return <div className="page"><p className="error-text">{loadError}</p></div>;
  if (!session || !session.resultsPublic)
    return <div className="page"><p className="muted">Ces résultats ne sont pas accessibles.</p></div>;

  const test = getTestDefinition(session.testTypeId);
  if (!test) return <div className="page"><p className="muted">Type de test inconnu.</p></div>;

  const results: DimensionResult[] = computeResults(test, responses);
  const itemLeans = computeItemLeans(test, responses);
  const insights = generateInsights(test, results, itemLeans, responses.length);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>{session.name}</h1>
          <p className="muted">
            {test.name} · {responses.length} réponse{responses.length > 1 ? 's' : ''}
          </p>
        </div>
      </header>

      <ResultsBody test={test} results={results} insights={insights} responses={responses} />
    </div>
  );
}
