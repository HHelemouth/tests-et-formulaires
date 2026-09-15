import { dimensionScale } from '../testDefinitions/scoring';
import type { TestDefinition, DimensionResult, TestResponse } from '../types';
import type { GeneratedInsights } from '../testDefinitions/generateInsights';

export default function ResultsBody({
  test,
  results,
  insights,
  responses,
}: {
  test: TestDefinition;
  results: DimensionResult[];
  insights: GeneratedInsights;
  responses: TestResponse[];
}) {
  if (responses.length === 0) {
    return <p className="muted">Aucune réponse pour le moment.</p>;
  }

  return (
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

      {results.map((d) => {
        const dimDef = test.dimensions.find((td) => td.key === d.key);
        const { min, max } = dimDef ? dimensionScale(test, dimDef) : { min: test.scaleMin, max: test.scaleMax };
        const range = max - min;
        const half = range / 2;
        return (
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
        );
      })}

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

      {test.citation && <p className="muted citation">Instrument : {test.citation}</p>}
    </>
  );
}
