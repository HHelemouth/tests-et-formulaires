// Une paire d'adjectifs opposés (différenciateur sémantique)
export interface ItemPair {
  left: string;
  right: string;
  // Si true, la valeur est inversée au moment du scoring
  reversed?: boolean;
}

export interface Dimension {
  key: string;
  name: string;
  description?: string;
  color: string;
  pairs: ItemPair[];
}

// Définit un TYPE de test (AttrakDiff, SUS, NPS, un test maison...).
// Ajouter un nouveau type de test = ajouter une entrée ici, sans toucher
// au reste de l'application (dashboard, page de passation, résultats).
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
