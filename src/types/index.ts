// Un item peut être un différenciateur sémantique (deux mots opposés, comme
// AttrakDiff) ou une affirmation évaluée par degré d'accord (comme meCUE).
// Le scoring (moyenne, inversion) fonctionne identiquement pour les deux ;
// seul le rendu du formulaire diffère selon `kind`.

export interface DifferentialItem {
  kind: 'differential';
  left: string;
  right: string;
  reversed?: boolean;
}

export interface LikertItem {
  kind: 'likert';
  statement: string;
  reversed?: boolean;
}

export type Item = DifferentialItem | LikertItem;

export interface Dimension {
  key: string;
  name: string;
  description?: string;
  color: string;
  items: Item[];
  // Redéfinit l'échelle pour cette dimension uniquement (ex. le jugement
  // global du meCUE va de -5 à +5, alors que le reste du test est en 1-7).
  scaleMin?: number;
  scaleMax?: number;
}

// Définit un TYPE de test (AttrakDiff, meCUE, un test maison...).
// Ajouter un nouveau type de test = ajouter une entrée dans testDefinitions/,
// sans toucher au reste de l'application (dashboard, page de passation,
// résultats) qui s'adapte automatiquement à la structure fournie.
export interface TestDefinition {
  id: string;
  name: string;
  shortDescription: string;
  instructions: string;
  scaleMin: number;
  scaleMax: number;
  dimensions: Dimension[];
  citation?: string;
}

export type SessionStatus = 'open' | 'closed';

export interface TestSession {
  id: string;
  ownerId: string;
  ownerEmail: string;
  name: string;
  testTypeId: string;
  status: SessionStatus;
  requireEmail: boolean;
  createdAt: number;
  closedAt?: number;
  responseCount: number;
}

export interface TestResponse {
  id: string;
  sessionId: string;
  participantName: string;
  participantRole: string;
  participantEmail?: string;
  answers: Record<string, number>; // "DIMKEY-index" -> valeur brute
  submittedAt: number;
}

export interface DimensionResult {
  key: string;
  name: string;
  color: string;
  average: number | null;
  itemAverages: { label: string; average: number | null }[];
}
