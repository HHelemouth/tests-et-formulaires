import type { TestDefinition } from '../types';

export const attrakdiffTest: TestDefinition = {
  id: 'attrakdiff-fr',
  name: 'AttrakDiff',
  shortDescription: "Évaluation de l'expérience utilisateur (qualité pragmatique, hédonique, attractivité)",
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
      pairs: [
        { left: 'Humain', right: 'Technique', reversed: true },
        { left: 'Simple', right: 'Compliqué', reversed: true },
        { left: 'Pratique', right: 'Pas pratique', reversed: true },
        { left: 'Fastidieux', right: 'Efficace' },
        { left: 'Prévisible', right: 'Imprévisible', reversed: true },
        { left: 'Confus', right: 'Clair' },
        { left: 'Incontrôlable', right: 'Maîtrisable' },
      ],
    },
    {
      key: 'QHS',
      name: 'Qualité hédonique — Stimulation',
      description: 'Contenus et interactions nouveaux, stimulants',
      color: '#d83f8a',
      pairs: [
        { left: 'Original', right: 'Conventionnel', reversed: true },
        { left: 'Sans imagination', right: 'Créatif' },
        { left: 'Audacieux', right: 'Prudent', reversed: true },
        { left: 'Novateur', right: 'Conservateur', reversed: true },
        { left: 'Ennuyeux', right: 'Captivant' },
        { left: 'Peu exigeant', right: 'Challenging' },
        { left: 'Nouveau', right: 'Commun', reversed: true },
      ],
    },
    {
      key: 'QHI',
      name: 'Qualité hédonique — Identité',
      description: 'Fonction sociale, identité communiquée',
      color: '#8a3fd8',
      pairs: [
        { left: "M'isole", right: 'Me sociabilise' },
        { left: 'Professionnel', right: 'Amateur', reversed: true },
        { left: 'De bon goût', right: 'De mauvais goût', reversed: true },
        { left: 'Bas de gamme', right: 'Haut de gamme' },
        { left: "M'exclut", right: "M'intègre" },
        { left: 'Me rapproche des autres', right: 'Me sépare des autres', reversed: true },
        { left: 'Non présentable', right: 'Présentable' },
      ],
    },
    {
      key: 'ATT',
      name: 'Attractivité globale',
      description: 'Valeur globale perçue du produit',
      color: '#d8763f',
      pairs: [
        { left: 'Plaisant', right: 'Déplaisant', reversed: true },
        { left: 'Laid', right: 'Beau' },
        { left: 'Agréable', right: 'Désagréable', reversed: true },
        { left: 'Rebutant', right: 'Attirant' },
        { left: 'Bon', right: 'Mauvais', reversed: true },
        { left: 'Repoussant', right: 'Attrayant' },
        { left: 'Motivant', right: 'Décourageant', reversed: true },
      ],
    },
  ],
};
