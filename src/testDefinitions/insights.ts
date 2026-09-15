// Pour chaque item du test AttrakDiff, on définit quel mot (gauche ou droite)
// est le signal à surveiller, et la piste de réflexion concrète associée.
// L'autre mot devient automatiquement un point fort quand les réponses penchent
// de ce côté-là. Clé = "DIMKEY-index" (même indexation que le tableau `pairs`).

export interface ItemInsight {
  watchPole: 'left' | 'right';
  suggestion: string;
}

export const ATTRAKDIFF_INSIGHTS: Record<string, ItemInsight> = {
  // Qualité pragmatique
  'QP-0': { watchPole: 'right', suggestion: "Vérifier si le ton et les messages du site restent accessibles, pas trop jargonneux." },
  'QP-1': { watchPole: 'right', suggestion: "Simplifier le parcours : réduire le nombre d'étapes ou de choix visibles à l'écran." },
  'QP-2': { watchPole: 'right', suggestion: "Revoir l'ergonomie des actions courantes (clics superflus, éléments mal placés)." },
  'QP-3': { watchPole: 'left', suggestion: "Identifier les étapes qui prennent du temps ou paraissent répétitives." },
  'QP-4': { watchPole: 'right', suggestion: "Vérifier la cohérence des comportements de l'interface (mêmes actions → mêmes résultats)." },
  'QP-5': { watchPole: 'left', suggestion: "Clarifier la hiérarchie visuelle et le vocabulaire utilisé." },
  'QP-6': { watchPole: 'left', suggestion: "Vérifier si le site n'incite pas à l'erreur, s'il ne bug pas, et si les actions sont réversibles." },

  // Qualité hédonique — Stimulation
  'QHS-0': { watchPole: 'right', suggestion: "Explorer des éléments visuels ou interactifs plus distinctifs." },
  'QHS-1': { watchPole: 'left', suggestion: "Apporter plus de personnalité visuelle ou de petites touches surprenantes." },
  'QHS-2': { watchPole: 'right', suggestion: "Oser des choix plus affirmés dans le ton ou le design." },
  'QHS-3': { watchPole: 'right', suggestion: "Identifier des fonctionnalités ou interactions plus novatrices à introduire." },
  'QHS-4': { watchPole: 'left', suggestion: "Ajouter des éléments qui suscitent l'intérêt ou l'engagement (micro-interactions, contenu vivant)." },
  'QHS-5': { watchPole: 'left', suggestion: "Vérifier si l'outil est perçu comme trop basique pour ses utilisateurs les plus experts." },
  'QHS-6': { watchPole: 'right', suggestion: "Renforcer ce qui différencie l'outil des solutions équivalentes." },

  // Qualité hédonique — Identité
  'QHI-0': { watchPole: 'left', suggestion: "Vérifier si l'outil facilite la collaboration ou le partage entre utilisateurs." },
  'QHI-1': { watchPole: 'right', suggestion: "Renforcer la finition visuelle et la cohérence graphique." },
  'QHI-2': { watchPole: 'right', suggestion: "Revoir la direction artistique (couleurs, typographie, images)." },
  'QHI-3': { watchPole: 'left', suggestion: "Soigner les détails de finition (micro-interactions, qualité des visuels)." },
  'QHI-4': { watchPole: 'left', suggestion: "Vérifier l'accessibilité, et si le vocabulaire ou les prérequis excluent certains profils." },
  'QHI-5': { watchPole: 'right', suggestion: "Explorer des fonctionnalités qui favorisent l'échange ou le travail à plusieurs." },
  'QHI-6': { watchPole: 'left', suggestion: "Vérifier si l'outil est présentable en démonstration ou face à un public externe." },

  // Attractivité globale
  'ATT-0': { watchPole: 'right', suggestion: "Identifier ce qui, dans la première impression, dérange (couleurs, densité, mise en page)." },
  'ATT-1': { watchPole: 'left', suggestion: "Retravailler l'esthétique générale de l'interface." },
  'ATT-2': { watchPole: 'right', suggestion: "Repérer les points de friction qui gâchent l'expérience." },
  'ATT-3': { watchPole: 'left', suggestion: "Comprendre ce qui donne envie de refermer l'outil dès les premières secondes." },
  'ATT-4': { watchPole: 'right', suggestion: "Creuser en entretien ce qui motive ce jugement global." },
  'ATT-5': { watchPole: 'left', suggestion: "Identifier l'élément déclencheur du rejet initial (visuel, message d'accueil...)." },
  'ATT-6': { watchPole: 'right', suggestion: "Vérifier si des messages d'erreur ou des blocages découragent la poursuite de l'usage." },
};

// Registre par type de test — pour rester évolutif si d'autres tests sont ajoutés.
export const INSIGHT_REGISTRY: Record<string, Record<string, ItemInsight>> = {
  'attrakdiff-fr': ATTRAKDIFF_INSIGHTS,
};
