# Angular Ignite Starter

Enterprise-ready Angular starter template focused on scalability, maintainability, white-label support, and clean architecture.

## Highlights

- Angular 21 with **standalone APIs** and strict TypeScript
- Feature-based architecture with **core/shared/features** boundaries
- Lazy-loaded routing with route guard example
- Signals + RxJS examples for scalable state and side effects
- Reusable API layer, auth flow, interceptors, loading and error handling patterns
- Angular Material + TailwindCSS + responsive layout
- Dark/light theme using CSS variables
- Reusable UI primitives: modal, data table, form card
- Reactive form validation and CRUD feature sample
- ESLint + Prettier + Husky + lint-staged + commitlint
- Jest unit test setup + Playwright E2E setup
- Docker image support + GitHub Actions CI workflow
- Path aliases and absolute imports

## Architecture

```text
src/app
├─ core/                 # cross-cutting concerns (services, guards, interceptors, shell)
├─ shared/               # reusable UI and helpers
├─ features/             # domain features (dashboard, products)
└─ models/               # domain contracts
```

### Clean Architecture and SOLID notes

- **Separation of concerns**: core infra, feature domain logic, and shared UI are isolated.
- **Dependency inversion**: feature code depends on abstractions/models and injected services.
- **Single responsibility**: small focused services (auth, loading, notification, dialog).
- **Open/closed**: feature route boundaries support independent domain growth.

## Environment strategy

- `src/environments/environment.ts` for production defaults
- `src/environments/environment.development.ts` for local development
- Runtime-sensitive values include API base URL and JWT key

## Scripts

```bash
pnpm start
pnpm build
pnpm lint
pnpm test
pnpm e2e
pnpm format:check
```

## Git hooks and commit conventions

- `pre-commit`: lint-staged + prettier
- `commit-msg`: conventional commits validation via commitlint

## Docker

```bash
docker build -t angular-ignite-starter .
docker run -p 8080:80 angular-ignite-starter
```
