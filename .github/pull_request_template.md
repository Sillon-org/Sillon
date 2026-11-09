## Ticket Jira

[KAN-XXX](https://sillon-musique.atlassian.net/browse/KAN-XXX) — titre de la story

## Résumé

<!-- Ce que fait cette PR, en quelques lignes. -->

## Comment tester

1. `pnpm install`
2. `pnpm db:up`
3. …

## Captures

<!-- Avant / après si l'interface change. Supprimer la section sinon. -->

## Critères d'acceptation

<!-- Recopier les critères du ticket Jira et cocher ceux qui sont remplis. -->

- [ ] …
- [ ] …

## Vérifications

- [ ] Branche nommée `KAN-XXX-description`, commits préfixés par la clé Jira
- [ ] CI au vert (lint, typecheck, tests, build)
- [ ] Pas de secret commité (`.env` ignoré, `.env.example` à jour)
- [ ] Accessibilité : contraste ≥ 4,5:1, cibles ≥ 44 px, vrais `<button>` / `<a>` / `<label>`
