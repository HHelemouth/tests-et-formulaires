import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSession, submitResponse } from '../firebase/sessions';
import { getTestDefinition } from '../testDefinitions/registry';
import { totalItemCount, itemKey, dimensionScale } from '../testDefinitions/scoring';
import type { TestSession } from '../types';

export default function PublicTest() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<TestSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!sessionId) return;
    getSession(sessionId).then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, [sessionId]);

  if (loading) return <div className="centered-page"><p className="muted">Chargement...</p></div>;
  if (!session) return <div className="centered-page"><p className="muted">Ce test n'existe pas ou plus.</p></div>;
  if (session.status === 'closed')
    return (
      <div className="centered-page">
        <div className="login-card">
          <h1>{session.name}</h1>
          <p>Cette session est terminée, elle n'accepte plus de réponses.</p>
        </div>
      </div>
    );

  const test = getTestDefinition(session.testTypeId);
  if (!test) return <div className="centered-page"><p className="muted">Type de test inconnu.</p></div>;

  const total = totalItemCount(test);
  const answeredCount = Object.keys(answers).length;
  const emailOk = !session.requireEmail || email.trim().length > 0;
  const canSubmit = answeredCount === total && name.trim().length > 0 && emailOk;

  const handleSubmit = async () => {
    if (!canSubmit || !sessionId) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitResponse({
        sessionId,
        participantName: name.trim(),
        participantRole: role.trim(),
        participantEmail: email.trim() || undefined,
        answers,
      });
      setSubmitted(true);
    } catch (e) {
      setError("L'envoi a échoué, réessaie.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="centered-page">
        <div className="login-card">
          <h1>Merci !</h1>
          <p>Ta réponse a bien été enregistrée.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page public-test">
      <h1>{session.name}</h1>
      <p className="muted">{test.shortDescription}</p>
      <p className="lede">{test.instructions}</p>

      <div className="intro-field">
        <label>
          Prénom / Nom
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div className="intro-field">
        <label>
          Rôle / fonction
          <input value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
      </div>
      {session.requireEmail && (
        <div className="intro-field">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
      )}

      {test.dimensions.map((dim) => {
        const { min, max } = dimensionScale(test, dim);
        return (
          <div key={dim.key}>
            <div className="dim-title">{dim.name}</div>
            {dim.description && <div className="dim-sub">{dim.description}</div>}
            {dim.items.map((item, i) => {
              const key = itemKey(dim.key, i);
              const scaleInputs = (
                <div className="scale">
                  {Array.from({ length: max - min + 1 }, (_, idx) => {
                    const v = min + idx;
                    const inputId = `${key}-${v}`;
                    return (
                      <label key={v} className={answers[key] === v ? 'checked' : ''}>
                        <input
                          type="radio"
                          id={inputId}
                          name={key}
                          value={v}
                          checked={answers[key] === v}
                          onChange={() => setAnswers((a) => ({ ...a, [key]: v }))}
                        />
                      </label>
                    );
                  })}
                </div>
              );

              if (item.kind === 'differential') {
                return (
                  <div className="pair-row" key={key}>
                    <div className="pair-label left">{item.left}</div>
                    {scaleInputs}
                    <div className="pair-label right">{item.right}</div>
                  </div>
                );
              }

              return (
                <div className="likert-row" key={key}>
                  <div className="likert-statement">{item.statement}</div>
                  <div className="likert-scale-row">
                    <span className="likert-endpoint">Pas du tout d'accord</span>
                    {scaleInputs}
                    <span className="likert-endpoint">Tout à fait d'accord</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="submit-bar">
        <button className="btn-primary" disabled={!canSubmit || submitting} onClick={handleSubmit}>
          {submitting ? 'Envoi...' : 'Envoyer mes réponses'}
        </button>
        <span className="status">
          {answeredCount} / {total} répondu{answeredCount > 1 ? 's' : ''}
        </span>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
