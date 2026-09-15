import type { TestDefinition } from '../types';

export const attrakdiffTest: TestDefinition = {
  id: 'attrakdiff-fr',
  name: 'AttrakDiff',
  shortDescription: "Évaluation de l'expérience utilisateur (qualité pragmatique, hédonique, attractivité)",
  about:
    "Évalue la perception d'une interface ou d'un produit sur 4 axes : sa facilité d'usage (qualité pragmatique), ce qu'il dit de la personne qui l'utilise (identité), ce qu'il apporte de nouveau ou de stimulant, et l'impression générale (attractivité). Les répondants placent leur ressenti entre 28 paires de mots opposés (ex. Simple ↔ Compliqué), sans jamais lire de mot négatif ou positif à l'écran — la note se calcule ensuite. Compte 5 à 8 minutes de passation.",
  instructions:
    "Pour chaque ligne, place ton ressenti entre les deux mots, du plus proche du mot de gauche au plus proche du mot de droite. Il n'y a pas de bonne réponse : ce qui compte, c'est ton impression spontanée.",
  scaleMin: 1,
  scaleMax: 7,
  citation:
    "Lallemand, C., Koenig, V., Gronier, G., & Martin, R. (2015). Création et validation d'une version française du questionnaire AttrakDiff. Revue Européenne de Psychologie Appliquée.",
  dimensions: [
    {
      key: 'QP',
      name: 'Qualité pragmatique',
      description: "Utilisabilité, facilité à atteindre ses buts",
      color: '#3b3fd8',
      items: [
        { kind: 'differential', left: 'Humain', right: 'Technique', reversed: true },
        { kind: 'differential', left: 'Simple', right: 'Compliqué', reversed: true },
        { kind: 'differential', left: 'Pratique', right: 'Pas pratique', reversed: true },
        { kind: 'differential', left: 'Fastidieux', right: 'Efficace' },
        { kind: 'differential', left: 'Prévisible', right: 'Imprévisible', reversed: true },
        { kind: 'differential', left: 'Confus', right: 'Clair' },
        { kind: 'differential', left: 'Incontrôlable', right: 'Maîtrisable' },
      ],
    },
    {
      key: 'QHS',
      name: 'Qualité hédonique — Stimulation',
      description: 'Contenus et interactions nouveaux, stimulants',
      color: '#d83f8a',
      items: [
        { kind: 'differential', left: 'Original', right: 'Conventionnel', reversed: true },
        { kind: 'differential', left: 'Sans imagination', right: 'Créatif' },
        { kind: 'differential', left: 'Audacieux', right: 'Prudent', reversed: true },
        { kind: 'differential', left: 'Novateur', right: 'Conservateur', reversed: true },
        { kind: 'differential', left: 'Ennuyeux', right: 'Captivant' },
        { kind: 'differential', left: 'Peu exigeant', right: 'Challenging' },
        { kind: 'differential', left: 'Nouveau', right: 'Commun', reversed: true },
      ],
    },
    {
      key: 'QHI',
      name: 'Qualité hédonique — Identité',
      description: 'Fonction sociale, identité communiquée',
      color: '#8a3fd8',
      items: [
        { kind: 'differential', left: "M'isole", right: 'Me sociabilise' },
        { kind: 'differential', left: 'Professionnel', right: 'Amateur', reversed: true },
        { kind: 'differential', left: 'De bon goût', right: 'De mauvais goût', reversed: true },
        { kind: 'differential', left: 'Bas de gamme', right: 'Haut de gamme' },
        { kind: 'differential', left: "M'exclut", right: "M'intègre" },
        { kind: 'differential', left: 'Me rapproche des autres', right: 'Me sépare des autres', reversed: true },
        { kind: 'differential', left: 'Non présentable', right: 'Présentable' },
      ],
    },
    {
      key: 'ATT',
      name: 'Attractivité globale',
      description: 'Valeur globale perçue du produit',
      color: '#d8763f',
      items: [
        { kind: 'differential', left: 'Plaisant', right: 'Déplaisant', reversed: true },
        { kind: 'differential', left: 'Laid', right: 'Beau' },
        { kind: 'differential', left: 'Agréable', right: 'Désagréable', reversed: true },
        { kind: 'differential', left: 'Rebutant', right: 'Attirant' },
        { kind: 'differential', left: 'Bon', right: 'Mauvais', reversed: true },
        { kind: 'differential', left: 'Repoussant', right: 'Attrayant' },
        { kind: 'differential', left: 'Motivant', right: 'Décourageant', reversed: true },
      ],
    },
  ],
};
