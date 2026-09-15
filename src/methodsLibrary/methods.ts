export type MethodCategory = 'Idéation & conception' | 'Évaluation quantitative' | 'Évaluation qualitative' | 'Évaluation experte';

export interface UXMethod {
  id: string;
  name: string;
  category: MethodCategory;
  description: string;
  whenToUse: string;
  reference: string;
  link: string;
  // Si renseigné, un lien direct vers la création d'une session de ce type dans l'outil.
  runnableTestTypeId?: string;
}

export const UX_METHODS: UXMethod[] = [
  {
    id: 'attrakdiff',
    name: 'AttrakDiff',
    category: 'Évaluation quantitative',
    description:
      "Questionnaire de référence en UX, mesure la qualité pragmatique, la qualité hédonique (identité, stimulation) et l'attractivité globale d'un système, via 28 paires d'adjectifs opposés.",
    whenToUse:
      "Pour objectiver un ressenti diffus (\"c'est moche\", \"c'est compliqué\") avant de lancer une refonte, ou pour comparer deux versions d'une interface.",
    reference: 'Hassenzahl, Burmester & Koller (2003) ; version française : Lallemand, Koenig, Gronier & Martin (2015)',
    link: 'https://uxmind.eu/2015/09/30/outil-attrakdiff-version-francaise/',
    runnableTestTypeId: 'attrakdiff-fr',
  },
  {
    id: 'mecue',
    name: 'meCUE',
    category: 'Évaluation quantitative',
    description:
      "Questionnaire modulaire en 10 dimensions (utilité, utilisabilité, esthétique, statut, engagement, émotions positives/négatives, fidélité, intention d'usage, jugement global).",
    whenToUse:
      "Pour une évaluation plus complète qu'AttrakDiff, notamment quand la dimension émotionnelle ou l'attachement au produit sont en jeu. Plus long à passer.",
    reference: 'Minge, Riedel & Thüring (2007) ; version française : Lallemand (2018)',
    link: 'https://uxmind.eu/2018/10/28/questionnaire-ux-mecue-version-francaise/',
    runnableTestTypeId: 'mecue-fr',
  },
  {
    id: 'test-5-secondes',
    name: 'Test des 5 secondes',
    category: 'Évaluation qualitative',
    description:
      "Présenter une interface statique pendant exactement 5 secondes, puis recueillir la première impression à l'aide d'un court questionnaire.",
    whenToUse:
      "Pour évaluer rapidement une première impression (page d'accueil, écran clé) avant même de tester l'usage réel. Très léger à mettre en place.",
    reference: 'Quick-Exposure Memory Test / Rapid Desirability Testing ; version française : Lallemand (2016)',
    link: 'https://uxmind.eu/wp-content/uploads/2016/06/le-test-des-5-secondes.pdf',
  },
  {
    id: 'ux-curve',
    name: 'UX Curve',
    category: 'Évaluation qualitative',
    description:
      "Le participant dessine, en entretien, une courbe retraçant l'évolution de son expérience dans le temps (utilisabilité, attractivité, utilité, volume d'usage), en expliquant à voix haute les variations.",
    whenToUse:
      "Pour comprendre comment l'expérience évolue sur un usage long — utile après plusieurs mois d'usage d'un outil comme Proveil, pour repérer les moments de bascule (adoption, lassitude, redécouverte).",
    reference: 'Kujala, Roto, Väänänen-Vainio-Mattila, Karapanos & Sinnelä (2011) ; templates français : Lallemand',
    link: 'https://uxmind.eu/wp-content/uploads/2016/06/ux_curve_templates_fr.pdf',
  },
  {
    id: 'completion-phrases',
    name: 'Complétion de phrases',
    category: 'Évaluation qualitative',
    description:
      "Méthode projective : des débuts de phrase amorcent le répondant sur des aspects expérientiels précis, qu'il termine librement. Fait surtout ressortir les émotions négatives, plus difficiles à verbaliser en entretien direct.",
    whenToUse:
      "En complément d'un questionnaire quantitatif, quand tu veux du verbatim exploitable sans le coût d'un entretien complet.",
    reference: 'Lallemand (méthode qualitative et projective)',
    link: 'https://uxmind.eu/category/ressources/',
  },
  {
    id: 'ux-cards',
    name: 'UX Cards',
    category: 'Idéation & conception',
    description:
      "7 cartes représentant les besoins psychologiques fondamentaux (autonomie, compétence, stimulation, relation, sécurité, popularité, sens) + 2 cartes d'instructions, pour concevoir ou évaluer en gardant ces besoins en tête plutôt que la seule tâche fonctionnelle.",
    whenToUse:
      "En atelier de co-conception, en phase de cadrage amont — pour élargir la discussion au-delà du \"est-ce que ça marche\" vers \"qu'est-ce que ça apporte réellement\".",
    reference: 'Lallemand (2015), thèse de doctorat, Université du Luxembourg',
    link: 'https://uxmind.eu/wp-content/uploads/2015/12/ux-cards_lallemand_fr_v1.pdf',
  },
  {
    id: 'plex-cards',
    name: 'PLEX Cards',
    category: 'Idéation & conception',
    description:
      "22 catégories d'expériences ludiques, sous forme de cartes, pour concevoir des interactions plus stimulantes ou divertissantes — même dans un contexte pro.",
    whenToUse:
      "Quand un outil interne est jugé \"ennuyeux\" ou \"peu engageant\" (par exemple sur les dimensions QHS de l'AttrakDiff) et qu'il faut des idées concrètes pour y remédier.",
    reference: 'Lucero & Arrasvuori (2010)',
    link: 'http://www.funkydesignspaces.com/plex/PLEX_Cards_French.pdf',
  },
  {
    id: 'persuasion-technologique',
    name: 'Critères de persuasion technologique',
    category: 'Évaluation experte',
    description:
      "Grille de 12 critères (aspects statiques et dynamiques) pour analyser ou concevoir la dimension persuasive d'une interface — ce qui pousse à l'action, à l'adoption, au changement de comportement.",
    whenToUse:
      "Pour une évaluation experte rapide (sans utilisateurs) d'un écran ou parcours dont l'objectif est de convaincre ou d'inciter à agir.",
    reference: 'Nemery (2012), thèse de doctorat, Université de Metz',
    link: 'http://wp.me/a2i3pb-hJ',
  },
  {
    id: 'heuristiques-colombo-pasch',
    name: 'Heuristiques UX de Colombo & Pasch',
    category: 'Évaluation experte',
    description:
      "10 heuristiques dérivées de la théorie du flow, pour une évaluation experte \"discount\" (économe en ressources) de la qualité de l'expérience.",
    whenToUse:
      "Quand le temps ou le budget ne permettent pas un vrai test utilisateur — une bonne alternative rapide avant de lancer quelque chose de plus lourd comme l'AttrakDiff.",
    reference: 'Colombo & Pasch (2012)',
    link: 'https://uxmind.eu/2014/08/14/10-heuristiques-pour-une-ux-optimale-de-colombo-et-pasch/',
  },
];
