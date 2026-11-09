# CLAUDE.md — Sillon

Projet étudiant solo (Samuel, ESIEE-IT, B3 Concepteur Solution Numérique). Langue du projet : **français** (UI, docs, commits, PR). Le code (noms de variables, fonctions) est en anglais.

## 1. Le produit

**Sillon** est une plateforme web de découverte et de partage musical.
Tronc : faire découvrir la musique en mêlant **hits** et **artistes émergents** dans un même fil personnalisé, et permettre de la partager.

Trois piliers :

- **Découvrir** (cœur) : page d'accueil personnalisée (« Pour toi », « Nouveautés », « Genre à explorer », « Émergents près de chez toi »), recherche, pages genre / artiste / titre, bibliothèque.
- **Partager** : abonnements, playlists partagées et collaboratives, reviews et articles sur le profil (façon blog), commentaires, retours privés aux artistes.
- **Créer** : **en pause** (séquenceur, battles, vote). Garder une place dans la navigation (« Créer · bientôt ») et ne rien coder pour l'instant.

Persona principale : **Emily**, 21 ans, étudiante à Paris, passionnée de musique, tourne en rond dans ses recommandations.
Deuxième cible : artistes indépendants et émergents qui veulent être découverts.

### Décisions produit (ne pas remettre en cause sans demander)

- **Pas d'écoute intégrée.** L'écoute se fait par **redirection** vers la plateforme de l'utilisateur (Spotify, Deezer, Apple Music, YouTube, SoundCloud). Des **extraits de 30 s** sont une piste (selon ce que les API fournissent ; jamais d'autoplay).
- **Historique d'écoute via Last.fm** (connexion OAuth, import, synchro des scrobbles). Sillon doit rester utilisable sans Last.fm (stats limitées aux likes et clics).
- **Abonnements à sens unique** entre utilisateurs (pas d'« amis » réciproques).
- **Un compte = une identité.** Le profil artiste s'**active** sur un compte ; un artiste qui veut aussi un compte perso en crée un second.
- **Retours aux artistes** : commentaires publics sur les titres ET retours privés à l'artiste (les deux pour l'instant).
- **Quota d'émergents** garanti dans chaque fil de recommandation (équité, ODD 10).
- **En attente** : héberger les sons des artistes sur Sillon OU leur demander de publier d'abord sur Spotify puis de coller le lien. Pour le MVP : **ajout de titre par lien** uniquement (KAN-144). Ne pas coder l'upload audio (KAN-145, KAN-146) sans décision.

### Offre (pour info, paiement hors MVP)

Basique gratuit · **Sillon+** (abonnement auditeur : stats avancées, badges découvreur, accès anticipé) · **Artiste Pro** (stats avancées, mise en avant locale, badge vérifié, billetterie/merch).

## 2. Stack technique

- **Monorepo Turborepo** (pnpm recommandé)
  - `apps/web` — Next.js (App Router) + TypeScript, Zustand pour l'état client
  - `apps/server` — NestJS + TypeScript (API REST)
  - `packages/shared-types` — types partagés front/back (DTO, enums)
  - `packages/ui` — composants UI partagés
  - `packages/config` — configs ESLint / TypeScript / Prettier partagées
- **Base de données** : PostgreSQL + Prisma (schéma dans `apps/server/prisma`)
- **Cache / tâches planifiées** : Redis (cache des tops, file de synchro Last.fm)
- **Stockage fichiers** : Cloudflare R2 (pochettes, avatars ; audio seulement si décision d'hébergement)
- **Déploiement** : Vercel pour `apps/web` (aperçu par PR), Railway ou Render pour `apps/server` + PostgreSQL
- **Tests** : Vitest (unitaires), Playwright (quelques parcours clés)
- Héritage : un prototype Phase 0 (séquenceur Tone.js) existe — il relève du pilier Créer, ne pas le réintégrer.

### Intégrations externes

- **Last.fm API** : OAuth, `user.getRecentTracks` (historique), tops, tags de genre.
- **Spotify Web API** : tops et métadonnées (pochette, artiste, genre). Attention : les extraits `preview_url` ne sont plus fournis pour les nouvelles applis — à vérifier avant d'en dépendre.
- **Deezer API** : métadonnées, extraits 30 s (à vérifier).
- **Liens multi-plateformes** : API des plateformes ou service type song.link / Odesli (KAN-50).
- Respect des conditions d'utilisation des API (pas de stockage de fichiers audio tiers).

## 3. Design

Thème sombre chaleureux (cohérent avec les maquettes cliquables existantes) :

- Fond `#14110D` · surface `#1E1914` · surface 2 `#2A231C` · bordure `#3A3128`
- Texte `#F5EFE6` · texte secondaire `#B3A89A` · texte discret `#8C8174`
- Accent principal **orange `#FF6B1A`** (boutons, actif) · accent **cyan `#45E8FF`** (badge « Émergent », Last.fm, états « live »)
- Typo : **Space Grotesk** (titres), **Inter** (texte), **JetBrains Mono** (chiffres, stats)
- Badge « Émergent » = fond cyan, texte foncé ; badge « Top » = contour orange.
- Accessibilité : contraste ≥ 4,5:1, cibles ≥ 44 px, vrais `<button>` / `<a>` / `<label>`.
- Éco-conception (RGESN) : rendu serveur par défaut, peu de JS client, images WebP/AVIF redimensionnées, pas d'autoplay, pas de scroll infini.

Écrans maquettés (référence) : Connexion, Onboarding (genres → Last.fm → plateforme), Accueil, Découvrir, Genre, Artiste, Titre, Bibliothèque, Playlist collaborative, Profil-dashboard, Écrire une review, Espace artiste.

## 4. Modèle de données (proposition de départ, à affiner)

`User` (profil, préférences, plateforme préférée, visibilité) · `ArtistProfile` (1-1 optionnel avec User) · `Genre` · `Track` / `Album` (source : hit importé ou titre Sillon ; liens plateformes) · `Like` · `Follow` (user → user / artiste, sens unique) · `GenreFollow` · `Playlist` / `PlaylistItem` / `PlaylistCollaborator` · `Review` (courte avec note, ou article long) · `Comment` · `ArtistFeedback` (retour privé) · `Ranking` / `RankingEntry` (top artistes) · `LastfmAccount` / `Scrobble` · `RedirectClick` (titre, source dans Sillon, plateforme, date) · `Notification` · `Report` (signalement).

## 5. Gestion de projet : Jira

- Site : https://sillon-musique.atlassian.net — projet **sillon**, clé **KAN**.
- 13 epics (KAN-4 à KAN-16) = les 13 parties de l'arbre fonctionnel. 185 stories (KAN-17 à KAN-201), titre au format `US-x.y.z · …`.
- Priorités : Highest = Must (MVP) · Medium = Should · Low = Could · Lowest = Créer (en pause). Étiquettes : `must/should/could/en-pause`, rôle (`auditeur`, `artiste`, `système`, `administrateur`), offre (`sillon+`, `artiste-pro`), `a-decider`.
- Les stories Must ont des **critères d'acceptation** dans la description : ce sont les critères de « terminé ».
- Suivi et journal de bord dans Confluence : https://sillon-musique.atlassian.net/wiki/spaces/S/pages/1212417/Suivi+du+projet+Sillon

### Sprints (2 semaines, ~10 h/semaine, échéance fin juin 2027)

| Sprint | Dates           | Objectif                                        | Tickets                                    |
| ------ | --------------- | ----------------------------------------------- | ------------------------------------------ |
| 1      | 9–20 nov. 2026  | Socle compte                                    | KAN-17, 18, 25, 178, 90, 91                |
| 2      | 23 nov.–4 déc.  | Catalogue et redirections                       | KAN-45, 50, 48, 75, 76, 70                 |
| 3      | 7–18 déc.       | Last.fm et onboarding genres                    | KAN-55, 56, 57, 58, 20                     |
| 4      | 4–15 janv. 2027 | Moteur de reco + premières sections accueil     | KAN-40, 41, 26, 27, 29                     |
| 5      | 18–29 janv.     | Accueil complet                                 | KAN-28, 34, 35, 47, 51, 53                 |
| 6      | 1–12 févr.      | Découvrir                                       | KAN-62, 65, 66, 71, 123                    |
| 7      | 15–26 févr.     | Bibliothèque et playlists                       | KAN-80, 81, 84, 85, 86                     |
| 8      | 1–12 mars       | Dashboard : écoutes et filtres                  | KAN-94, 95, 96, 102, 103                   |
| 9      | 15–26 mars      | Dashboard : classement, préférences, paramètres | KAN-107, 113, 114, 117, 118, 179, 180, 181 |
| 10     | 29 mars–9 avr.  | Partage                                         | KAN-126, 127, 140, 138                     |
| 11     | 12–23 avr.      | Reviews et articles                             | KAN-131, 132, 133                          |
| 12     | 26 avr.–7 mai   | Espace artiste : publication                    | KAN-19, 142, 144, 147, 148                 |
| 13     | 10–21 mai       | Espace artiste : retours, stats ; notifications | KAN-152, 156, 157, 170, 174                |
| 14     | 24 mai–4 juin   | Modération et RGPD → MVP complet                | KAN-186, 187, 193, 182, 183                |
| 15     | 7–18 juin       | Should prioritaires                             | KAN-52, 36, 22, 23, 49, 38                 |
| 16     | 21 juin–2 juil. | Should prioritaires                             | KAN-59, 97, 99, 158, 30                    |

### Règle d'or : traçabilité

L'avancement Jira sera **montré à l'examen**. Chaque ligne de code doit pouvoir être reliée à une story, et chaque story à une date de réalisation.

- Avant de coder une story : lire le ticket Jira (description + critères d'acceptation). Si l'outil Atlassian est disponible, l'utiliser pour récupérer le ticket ; sinon demander à Samuel de le coller.
- Ne jamais travailler « hors ticket ». Si un besoin n'a pas de ticket, le signaler et proposer de créer une tâche Jira.
- Signaler toute story trop grosse pour un sprint et proposer un découpage.

## 6. Conventions Git / GitHub

- **GitHub Flow** : `main` toujours stable et protégée (fusion par PR uniquement, CI au vert obligatoire). Pas de branche `develop`.
- **Une branche par story**, nommée avec la clé Jira : `KAN-17-inscription`, `KAN-45-import-tops`.
- **Commits** : clé Jira en tête + Conventional Commits, en français :
  ```
  KAN-17 feat: formulaire d'inscription
  KAN-17 fix: validation de l'email
  KAN-45 chore: tâche planifiée d'import des tops
  ```
  Types : `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`.
- **Pull requests** : une PR par story, titre `KAN-17 Inscription et connexion`, description avec résumé, comment tester, captures, critères d'acceptation cochés. Squash merge.
- **CI GitHub Actions** sur chaque PR et sur `main` : install → lint → typecheck → tests → build, via `turbo`.
- **Fin de sprint** : tag + release GitHub `v0.N-sprintN` (ex. `v0.1-sprint1`) listant les tickets livrés.
- Jira est relié à GitHub via l'application « GitHub for Jira » : la clé dans branches / commits / PR suffit pour l'affichage dans le ticket.

## 7. Façon de travailler avec Samuel

- Répondre en français, de façon concise.
- Livrer des fichiers complets et prêts à l'emploi plutôt que des extraits partiels.
- Avancer par étapes : proposer le plan d'une story (fichiers touchés, schéma Prisma, routes, composants) avant de coder si elle est non triviale.
- Débogage : vérifier méthodiquement (présence du fichier → casse → cache → config des alias) avant les hypothèses complexes.
- Toujours préciser à la fin : ce qui a été fait, comment tester, le message de commit proposé, et si la story peut passer en Terminé (critères d'acceptation remplis ou non).
- Ne jamais commiter de secrets ; utiliser `.env` (ignoré) et `.env.example` (versionné).
