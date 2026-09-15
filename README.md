# Tests & Formulaires

**Site en ligne : [tests-et-formulaires.vercel.app](https://tests-et-formulaires.vercel.app/)**

Outil pour créer des sessions de test UX (AttrakDiff, meCUE), les partager, et consulter les résultats avec interprétation automatique.

## Stack

- React + TypeScript + Vite
- Firebase (Authentication + Firestore)
- Déploiement automatique sur Vercel à chaque push sur `main`

## Ajouter un nouveau type de test

Créer un fichier dans `src/testDefinitions/` sur le modèle de `attrakdiff.ts` ou `mecue.ts`, puis l'enregistrer dans `registry.ts`. Le nouveau test apparaît automatiquement dans le menu déroulant de création de session.
