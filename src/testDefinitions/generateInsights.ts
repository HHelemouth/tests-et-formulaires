import type { TestDefinition, DimensionResult } from '../types';
import type { ItemLean } from './scoring';
import { INSIGHT_REGISTRY } from './insights';

export interface Watchout {
  label: string; // le mot qui pose signal, ex. "Incontrôlable"
  dimension: string;
  suggestion: string;
  strength: number; // magnitude du signal
}

export interface Strength {
  label: string; // le mot positif observé, ex. "Attirant"
  dimension: string;
  strength: number;
}

export interface GeneratedInsights {
  overview: string;
  dimensionLines: { name: string; tone: string }[];
  strengths: Strength[];
  watchouts: Watchout[];
  sampleTooSmall: boolean;
}

const THRESHOLD = 0.9; // sur une échelle -3..+3 : au-delà, le signal est jugé notable
const MAX_ITEMS = 5;

function tone(average: number | null): string {
  if (average === null) return 'pas de données';
  if (average >= 1.5) return 'très positive';
  if (average >= 0.5) return 'plutôt positive';
  if (average > -0.5) return 'mitigée';
  if (average > -1.5) return 'plutôt négative';
  return 'très négative';
}

export function generateInsights(
  test: TestDefinition,
  dimensionResults: DimensionResult[],
  itemLeans: ItemLean[],
  responseCount: number
): GeneratedInsights {
  const insightMap = INSIGHT_REGISTRY[test.id] ?? {};
  const hasInsightMap = Object.keys(insightMap).length > 0;

  const dimensionLines = dimensionResults.map((d) => ({
    name: d.name,
    tone: tone(d.average),
  }));

  const strengths: Strength[] = [];
  const watchouts: Watchout[] = [];

  itemLeans.forEach((lean) => {
    if (lean.rawAverage === null || Math.abs(lean.rawAverage) < THRESHOLD) return;
    const key = `${lean.dimKey}-${lean.index}`;
    const insight = insightMap[key];
    if (!insight) return;
    const dim = test.dimensions.find((d) => d.key === lean.dimKey);
    const dimName = dim?.name ?? lean.dimKey;
    const leansRight = lean.rawAverage > 0;
    const word = lean.kind === 'differential' ? (leansRight ? lean.rightWord! : lean.leftWord!) : lean.statement!;
    const magnitude = Math.abs(lean.rawAverage);

    const isWatch = (leansRight && insight.watchPole === 'right') || (!leansRight && insight.watchPole === 'left');

    if (isWatch) {
      watchouts.push({ label: word, dimension: dimName, suggestion: insight.suggestion, strength: magnitude });
    } else {
      strengths.push({ label: word, dimension: dimName, strength: magnitude });
    }
  });

  strengths.sort((a, b) => b.strength - a.strength);
  watchouts.sort((a, b) => b.strength - a.strength);

  const topStrengths = strengths.slice(0, MAX_ITEMS);
  const topWatchouts = watchouts.slice(0, MAX_ITEMS);

  let overview: string;
  if (topStrengths.length === 0 && topWatchouts.length === 0) {
    if (hasInsightMap) {
      overview = "Les réponses ne font pas encore ressortir de signal fort dans un sens ou dans l'autre.";
    } else {
      // Pas de pistes détaillées configurées pour ce test : on retombe sur
      // la tonalité par dimension, qui reste toujours calculable.
      const positive = dimensionLines.filter((d) => d.tone.includes('positive'));
      const negative = dimensionLines.filter((d) => d.tone.includes('négative'));
      if (positive.length === 0 && negative.length === 0) {
        overview = "Les résultats sont globalement mitigés, sans tendance nette par dimension.";
      } else {
        const parts: string[] = [];
        if (positive.length > 0) parts.push(`plutôt bien perçu sur ${positive.map((d) => d.name).join(', ')}`);
        if (negative.length > 0) parts.push(`plus fragile sur ${negative.map((d) => d.name).join(', ')}`);
        overview = `Vu par dimension, l'outil est ${parts.join(' — ')}.`;
      }
    }
  } else {
    const strengthWords = topStrengths.map((s) => s.label.toLowerCase()).join(', ');
    const watchWords = topWatchouts.map((w) => w.label.toLowerCase()).join(', ');
    if (topStrengths.length > 0 && topWatchouts.length > 0) {
      overview = `Les répondants trouvent globalement l'outil ${strengthWords} — mais pointent aussi des signaux du côté ${watchWords}.`;
    } else if (topStrengths.length > 0) {
      overview = `Les réponses sont homogènes et positives : l'outil est perçu comme ${strengthWords}.`;
    } else {
      overview = `Les réponses font surtout ressortir des points de vigilance : ${watchWords}.`;
    }
  }

  return {
    overview,
    dimensionLines,
    strengths: topStrengths,
    watchouts: topWatchouts,
    sampleTooSmall: responseCount < 3,
  };
}
