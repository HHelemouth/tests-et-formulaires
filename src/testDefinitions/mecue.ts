import type { TestDefinition } from '../types';

// Les items sont formulés génériquement avec "le produit" — reformule-les
// avec le nom exact de ton outil si tu veux, en éditant ce fichier.
export const mecueTest: TestDefinition = {
  id: 'mecue-fr',
  name: 'meCUE',
  shortDescription:
    "Évaluation modulaire de l'expérience utilisateur (utilité, utilisabilité, esthétique, statut, engagement, émotions, fidélité, intention d'usage)",
  instructions:
    "Pour chaque affirmation, indique ton degré d'accord, de \"pas du tout d'accord\" à \"tout à fait d'accord\". Sois spontané(e) : ta réponse doit refléter ta première impression, même si l'affirmation ne te semble pas totalement correspondre à ton expérience.",
  scaleMin: 1,
  scaleMax: 7,
  citation:
    "Lallemand, C. & Koenig, V. (2017). \"How Could an Intranet be Like a Friend to Me?\" — Why Standardized UX Scales Don't Always Fit. Proceedings of ECCE 2017, Umeå, Sweden.",
  dimensions: [
    {
      key: 'F',
      name: 'Utilité',
      description: 'Le produit aide-t-il à atteindre ses objectifs ?',
      color: '#3b3fd8',
      items: [
        { kind: 'likert', statement: 'Les fonctionnalités du produit sont parfaitement adaptées à mes objectifs.' },
        { kind: 'likert', statement: 'Je considère ce produit comme extrêmement utile.' },
        { kind: 'likert', statement: "À l'aide de ce produit, je peux atteindre mes objectifs." },
      ],
    },
    {
      key: 'U',
      name: 'Utilisabilité',
      description: 'Facilité de prise en main et de compréhension',
      color: '#3f8fd8',
      items: [
        { kind: 'likert', statement: 'Le produit est facile à utiliser.' },
        { kind: 'likert', statement: 'On perçoit rapidement comment utiliser le produit.' },
        { kind: 'likert', statement: "L'utilisation du produit est facile à comprendre." },
      ],
    },
    {
      key: 'A',
      name: 'Esthétisme',
      description: 'Perception visuelle et créative du produit',
      color: '#8a3fd8',
      items: [
        { kind: 'likert', statement: 'Le produit est conçu de manière créative.' },
        { kind: 'likert', statement: "Le design a l'air attrayant." },
        { kind: 'likert', statement: 'Le produit est élégant.' },
      ],
    },
    {
      key: 'S',
      name: 'Statut',
      description: "Ce que l'usage du produit renvoie de son utilisateur",
      color: '#d83f8a',
      items: [
        { kind: 'likert', statement: 'Le produit me donne une meilleure image auprès des autres.' },
        { kind: 'likert', statement: 'À travers ce produit, on me perçoit différemment.' },
        { kind: 'likert', statement: 'Mes amis peuvent bien être envieux de ce produit.' },
      ],
    },
    {
      key: 'C',
      name: 'Engagement émotionnel',
      description: "L'attachement personnel au produit",
      color: '#d8763f',
      items: [
        { kind: 'likert', statement: 'Je ne peux pas vivre sans ce produit.' },
        { kind: 'likert', statement: 'Le produit est comme un ami pour moi.' },
        { kind: 'likert', statement: "Si je perdais le produit, j'en serais dévasté(e)." },
      ],
    },
    {
      key: 'PEM',
      name: 'Émotions positives',
      description: "Enthousiasme, joie, détente, apaisement ressentis à l'usage",
      color: '#2f8f5b',
      items: [
        { kind: 'likert', statement: "Le produit m'enthousiasme." },
        { kind: 'likert', statement: "Quand j'utilise ce produit, je me sens joyeux(se)." },
        { kind: 'likert', statement: 'Le produit me détend.' },
        { kind: 'likert', statement: "Le produit m'apaise." },
      ],
    },
    {
      key: 'NEM',
      name: 'Émotions négatives',
      description: "Absence d'énervement, de frustration, de fatigue ou d'ennui (score élevé = peu d'émotions négatives)",
      color: '#c14343',
      items: [
        { kind: 'likert', statement: "Le produit m'énerve.", reversed: true },
        { kind: 'likert', statement: 'Le produit me frustre.', reversed: true },
        { kind: 'likert', statement: 'Le produit me fatigue.', reversed: true },
        { kind: 'likert', statement: "Le produit m'ennuie.", reversed: true },
      ],
    },
    {
      key: 'L',
      name: 'Fidélité',
      description: "L'attachement comparatif à ce produit plutôt qu'à un autre",
      color: '#c9932e',
      items: [
        { kind: 'likert', statement: "Je n'échangerais le produit contre aucun autre." },
        { kind: 'likert', statement: "Par rapport à ce produit, les autres produits ont l'air moins perfectionnés." },
        { kind: 'likert', statement: "Je n'hésiterais pas à choisir ce produit (à nouveau)." },
      ],
    },
    {
      key: 'IN',
      name: "Intention d'usage",
      description: "L'envie de continuer à utiliser le produit",
      color: '#3fd8c9',
      items: [
        { kind: 'likert', statement: 'Si je le pouvais, j\'utiliserais le produit chaque jour.' },
        { kind: 'likert', statement: "Je suis impatient(e) d'utiliser le produit à nouveau." },
        { kind: 'likert', statement: "Quand j'utilise ce produit, il m'arrive de perdre la notion du temps." },
      ],
    },
    {
      key: 'GLOBAL',
      name: 'Jugement global',
      description: 'Évaluation générale du produit, tous critères confondus',
      color: '#1e2233',
      scaleMin: -5,
      scaleMax: 5,
      items: [{ kind: 'differential', left: 'Mauvais', right: 'Bon' }],
    },
  ],
};
