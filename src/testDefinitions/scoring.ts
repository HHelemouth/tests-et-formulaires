import type { TestDefinition, TestResponse, DimensionResult } from '../types';

export function itemKey(dimKey: string, index: number): string {
  return `${dimKey}-${index}`;
}

// Convertit une réponse brute en score centré sur zéro et applique
// l'inversion si l'item est marqué "reversed".
function signedScore(raw: number, min: number, max: number, reversed?: boolean): number {
  const mid = (min + max) / 2;
  const s = raw - mid;
  return reversed ? -s : s;
}

export function computeResults(test: TestDefinition, responses: TestResponse[]): DimensionResult[] {
  return test.dimensions.map((dim) => {
    let dimSum = 0;
    let dimCount = 0;

    const itemAverages = dim.pairs.map((pair, i) => {
      const key = itemKey(dim.key, i);
      let sum = 0;
      let count = 0;
      responses.forEach((r) => {
        const raw = r.answers[key];
        if (raw !== undefined) {
          const s = signedScore(raw, test.scaleMin, test.scaleMax, pair.reversed);
          sum += s;
          count += 1;
          dimSum += s;
          dimCount += 1;
        }
      });
      return {
        label: `${pair.left} ↔ ${pair.right}`,
        average: count > 0 ? sum / count : null,
      };
    });

    return {
      key: dim.key,
      name: dim.name,
      color: dim.color,
      average: dimCount > 0 ? dimSum / dimCount : null,
      itemAverages,
    };
  });
}

export interface ItemLean {
  dimKey: string;
  index: number;
  leftWord: string;
  rightWord: string;
  rawAverage: number | null; // -half..+half, positif = penche vers la droite
  count: number;
}

// Moyenne brute par item, SANS inversion : reflète directement de quel côté
// (mot de gauche ou de droite) les réponses penchent réellement.
export function computeItemLeans(test: TestDefinition, responses: TestResponse[]): ItemLean[] {
  const leans: ItemLean[] = [];
  test.dimensions.forEach((dim) => {
    dim.pairs.forEach((pair, i) => {
      const key = itemKey(dim.key, i);
      const mid = (test.scaleMin + test.scaleMax) / 2;
      let sum = 0;
      let count = 0;
      responses.forEach((r) => {
        const raw = r.answers[key];
        if (raw !== undefined) {
          sum += raw - mid;
          count += 1;
        }
      });
      leans.push({
        dimKey: dim.key,
        index: i,
        leftWord: pair.left,
        rightWord: pair.right,
        rawAverage: count > 0 ? sum / count : null,
        count,
      });
    });
  });
  return leans;
}

export function totalItemCount(test: TestDefinition): number {
  return test.dimensions.reduce((sum, d) => sum + d.pairs.length, 0);
}
