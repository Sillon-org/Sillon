# Sillon

**Sillon** est une plateforme web de découverte et de partage musical. Elle mêle **hits** et **artistes émergents** dans un même fil personnalisé, et permet de partager ce qu'on découvre (playlists, reviews, retours aux artistes).

L'écoute ne se fait pas sur Sillon : chaque titre redirige vers la plateforme de l'utilisateur (Spotify, Deezer, Apple Music, YouTube, SoundCloud). L'historique d'écoute peut être importé depuis Last.fm.

> Projet étudiant — ESIEE-IT, B3 Concepteur Solution Numérique.

## Gestion de projet

- Jira (projet `KAN`) : https://sillon-musique.atlassian.net/jira/software/projects/KAN/boards
- Confluence — suivi du projet : https://sillon-musique.atlassian.net/wiki/spaces/S/pages/1212417/Suivi+du+projet+Sillon

## Stack

| Partie              | Technologie                                    |
| ------------------- | ---------------------------------------------- |
| Monorepo            | Turborepo + pnpm                               |
| Front (`apps/web`)  | Next.js (App Router), TypeScript, Zustand      |
| API (`apps/server`) | NestJS, TypeScript                             |
| Base de données     | PostgreSQL + Prisma                            |
| Cache / tâches      | Redis                                          |
| Tests               | Vitest (unitaires), Playwright (parcours clés) |
| Déploiement         | Vercel (web), Railway ou Render (API + base)   |

```
apps/
  web/            Front Next.js
  server/         API NestJS + Prisma (schéma dans prisma/)
packages/
  shared-types/   Types partagés front/back (DTO, enums)
  ui/             Composants UI partagés
  config/         Configs ESLint, TypeScript, Prettier
```

## Prérequis

- **Node.js 24** (voir `.nvmrc`)
- **pnpm 10** — activé via Corepack : `corepack enable`
- **Docker** (PostgreSQL et Redis en local)

## Lancement en local

```bash
# 1. Dépendances (génère aussi le client Prisma)
pnpm install

# 2. Variables d'environnement
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env.local

# 3. PostgreSQL + Redis
pnpm db:up

# 4. Migrations (dès qu'il y a des modèles)
pnpm --filter @sillon/server db:migrate

# 5. Front + API en parallèle
pnpm dev
```

- Front : http://localhost:3000
- API : http://localhost:3001/api (santé : `GET /api/health`)

### Commandes utiles

| Commande          | Rôle                                 |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Lance web et server en mode watch    |
| `pnpm lint`       | ESLint sur tout le monorepo          |
| `pnpm typecheck`  | Vérification TypeScript              |
| `pnpm test`       | Tests Vitest                         |
| `pnpm build`      | Build de production                  |
| `pnpm format`     | Formatage Prettier                   |
| `pnpm db:up/down` | Démarre / arrête PostgreSQL et Redis |

## Conventions

### Branches — GitHub Flow

- `main` est toujours stable et protégée : fusion par PR uniquement, CI au vert obligatoire.
- Une branche par story, nommée avec la clé Jira : `KAN-17-inscription`, `KAN-45-import-tops`.

### Commits

Clé Jira en tête + [Conventional Commits](https://www.conventionalcommits.org/fr/), en français :

```
KAN-17 feat: formulaire d'inscription
KAN-17 fix: validation de l'email
KAN-45 chore: tâche planifiée d'import des tops
```

Types : `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`.

### Pull requests

- Une PR par story, titre `KAN-17 Inscription et connexion`.
- Description selon le modèle : ticket, résumé, comment tester, captures, critères d'acceptation cochés.
- Squash merge.

### Releases

En fin de sprint : tag et release GitHub `v0.N-sprintN` (ex. `v0.1-sprint1`) listant les tickets livrés.

### Secrets

Jamais de secret dans le dépôt : `.env` est ignoré, `.env.example` est versionné et tenu à jour.
