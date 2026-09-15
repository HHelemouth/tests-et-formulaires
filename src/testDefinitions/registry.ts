import type { TestDefinition } from '../types';
import { attrakdiffTest } from './attrakdiff';

// Pour ajouter un nouveau type de test : créer un fichier dans ce dossier
// (sur le modèle d'attrakdiff.ts) puis l'ajouter ici. Rien d'autre à modifier.
export const TEST_REGISTRY: Record<string, TestDefinition> = {
  [attrakdiffTest.id]: attrakdiffTest,
};

export function getTestDefinition(testTypeId: string): TestDefinition | undefined {
  return TEST_REGISTRY[testTypeId];
}

export function listTestDefinitions(): TestDefinition[] {
  return Object.values(TEST_REGISTRY);
}
