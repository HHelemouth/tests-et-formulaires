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
  {
    id: 'sus',
    name: 'SUS (System Usability Scale)',
    category: 'Évaluation quantitative',
    description:
      "Le questionnaire d'utilisabilité le plus utilisé au monde : 10 affirmations, échelle d'accord en 5 points, items alternés positifs/négatifs. Donne un score unique sur 100, directement comparable entre projets et dans le temps.",
    whenToUse:
      "Après un test utilisateur sur quelques scénarios, pour obtenir un score benchmarkable rapidement (3-4 min de passation). Idéal pour comparer plusieurs versions d'un même outil, ou pour se situer par rapport à d'autres études publiées.",
    reference: 'Brooke (1996) ; version française validée (F-SUS) : Gronier & Baudet (2021)',
    link: 'https://www.guillaumegronier.com/blog/files/6545bc93a9d0952c2afac2581129ae7c-0.html',
  },
  {
    id: 'heuristiques-nielsen',
    name: 'Heuristiques de Nielsen',
    category: 'Évaluation experte',
    description:
      "Les 10 heuristiques d'utilisabilité les plus citées en UX (visibilité du statut système, correspondance système/monde réel, contrôle utilisateur, cohérence, prévention des erreurs, reconnaissance plutôt que rappel, etc.).",
    whenToUse:
      "Pour une évaluation experte rapide et structurée d'une interface, seule ou en équipe, sans avoir besoin de recruter des utilisateurs. Bon point de départ avant un test utilisateur plus poussé.",
    reference: 'Nielsen, J. (1994). 10 Usability Heuristics for User Interface Design.',
    link: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
  },
  {
    id: 'cognitive-walkthrough',
    name: 'Cognitive Walkthrough',
    category: 'Évaluation experte',
    description:
      "Évaluation experte pas-à-pas : pour chaque étape d'un parcours utilisateur, l'évaluateur se met à la place d'un utilisateur type et se pose 4 questions (L'utilisateur cherchera-t-il à faire cette action ? La verra-t-il ? La reconnaîtra-t-elle comme la bonne ? Comprendra-t-il le retour du système ?).",
    whenToUse:
      "Pour un parcours précis et critique (ex. onboarding, tunnel de conversion) où chaque friction coûte cher — plus fin qu'une évaluation heuristique généraliste, mais plus long à mener.",
    reference: 'Polson, Lewis, Rieman & Wharton (1992)',
    link: 'https://www.nngroup.com/articles/cognitive-walkthroughs/',
  },
  {
    id: 'card-sorting',
    name: 'Card Sorting',
    category: 'Idéation & conception',
    description:
      "Les participants regroupent des cartes (contenus, fonctionnalités, catégories) selon une logique qui leur est propre, puis nomment leurs groupes. Version ouverte (les catégories ne sont pas données) ou fermée (les catégories sont fixées, les participants y classent les cartes).",
    whenToUse:
      "Pour structurer ou valider une architecture d'information, un menu, une navigation — particulièrement utile en amont d'une refonte de Design System ou quand un outil est jugé confus.",
    reference: 'Méthode classique de recherche UX, popularisée par Donna Spencer',
    link: 'https://www.nngroup.com/articles/card-sorting-definition/',
  },
  {
    id: 'kano-model',
    name: 'Modèle de Kano',
    category: 'Idéation & conception',
    description:
      "Classe les fonctionnalités en 3 catégories selon leur effet sur la satisfaction : basiques (leur absence frustre, leur présence n'est pas remarquée), de performance (plus il y en a, plus la satisfaction augmente linéairement), et d'enchantement (leur absence ne dérange pas, leur présence enthousiasme).",
    whenToUse:
      "En phase de cadrage ou de priorisation de roadmap, pour arbitrer entre fonctionnalités indispensables et fonctionnalités différenciantes — utile pour argumenter des choix face à des parties prenantes.",
    reference: 'Kano, N., Seraku, N., Takahashi, F., & Tsuji, S. (1984)',
    link: 'https://www.nngroup.com/articles/kano-model/',
  },
];
