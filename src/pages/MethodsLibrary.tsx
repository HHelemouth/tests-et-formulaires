import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UX_METHODS } from '../methodsLibrary/methods';
import type { MethodCategory } from '../methodsLibrary/methods';

const CATEGORIES: MethodCategory[] = ['Évaluation quantitative', 'Évaluation qualitative', 'Évaluation experte', 'Idéation & conception'];

export default function MethodsLibrary() {
  const [activeCategory, setActiveCategory] = useState<MethodCategory | 'Toutes'>('Toutes');

  const visible = activeCategory === 'Toutes' ? UX_METHODS : UX_METHODS.filter((m) => m.category === activeCategory);

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Mes sessions
      </Link>

      <header className="page-header">
        <div>
          <h1>Méthodes UX</h1>
          <p className="muted">Bibliothèque de référence, à consulter selon les besoins du projet.</p>
        </div>
      </header>

      <div className="method-filters">
        <button
          className={`filter-chip ${activeCategory === 'Toutes' ? 'active' : ''}`}
          onClick={() => setActiveCategory('Toutes')}
        >
          Toutes
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} className={`filter-chip ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="method-list">
        {visible.map((m) => (
          <div className="method-card" key={m.id}>
            <div className="method-card-top">
              <h2>{m.name}</h2>
              <span className="method-category-badge">{m.category}</span>
            </div>
            <p className="method-description">{m.description}</p>
            <p className="method-when"><strong>Quand l'utiliser </strong>— {m.whenToUse}</p>
            <p className="method-reference muted">{m.reference}</p>
            <div className="method-actions">
              <a href={m.link} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Voir la ressource
              </a>
              {m.runnableTestTypeId && (
                <Link to="/" className="btn-primary">
                  Créer une session →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
