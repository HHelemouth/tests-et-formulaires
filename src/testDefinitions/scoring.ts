import type { TestDefinition, TestResponse, DimensionResult, Dimension, Item } from '../types';

export function itemKey(dimKey: string, index: number): string {
  return `${dimKey}-${index}`;
}

export function dimensionScale(test: TestDefinition, dim: Dimension): { min: number; max: number } {
  return {
    min: dim.scaleMin ?? test.scaleMin,
    max: dim.scaleMax ?? test.scaleMax,
  };
}

export function itemLabel(item: Item): string {
  return item.kind === 'differential' ? `${item.left} ↔ ${item.right}` : item.statement;
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
    const { min, max } = dimensionScale(test, dim);
    let dimSum = 0;
    let dimCount = 0;

    const itemAverages = dim.items.map((item, i) => {
      const key = itemKey(dim.key, i);
      let sum = 0;
      let count = 0;
      responses.forEach((r) => {
        const raw = r.answers[key];
        if (raw !== undefined) {
          const s = signedScore(raw, min, max, item.reversed);
          sum += s;
          count += 1;
          dimSum += s;
          dimCount += 1;
        }
      });
      return {
        label: itemLabel(item),
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
  kind: Item['kind'];
  leftWord?: string;
  rightWord?: string;
  statement?: string;
  rawAverage: number | null; // centré sur zéro, positif = penche vers la droite / l'accord
  count: number;
}

// Moyenne brute par item, SANS inversion : reflète directement de quel côté
// (mot de gauche/droite, ou accord/désaccord) les réponses penchent réellement.
export function computeItemLeans(test: TestDefinition, responses: TestResponse[]): ItemLean[] {
  const leans: ItemLean[] = [];
  test.dimensions.forEach((dim) => {
    const { min, max } = dimensionScale(test, dim);
    const mid = (min + max) / 2;
    dim.items.forEach((item, i) => {
      const key = itemKey(dim.key, i);
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
        kind: item.kind,
        leftWord: item.kind === 'differential' ? item.left : undefined,
        rightWord: item.kind === 'differential' ? item.right : undefined,
        statement: item.kind === 'likert' ? item.statement : undefined,
        rawAverage: count > 0 ? sum / count : null,
        count,
      });
    });
  });
  return leans;
}

export function totalItemCount(test: TestDefinition): number {
  return test.dimensions.reduce((sum, d) => sum + d.items.length, 0);
}
