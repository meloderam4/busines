# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) + React 19 app ("Persian Hub", a local business directory) using **pnpm**. There is no monorepo, no test framework, and no Docker.

### Services

| Service | Required | How to run |
|---|---|---|
| Next.js dev server | Yes | `pnpm dev` (serves http://localhost:3000) |
| Supabase (hosted Postgres + Auth) | Effectively yes (see below) | Set env vars; seed with `scripts/*.sql` |
| Stripe | Optional | Only for the business-registration checkout (`/api/create-checkout-session`) |
| Google Maps JS API | Optional | Only for maps on business detail/search pages |

### Environment variables (critical, non-obvious)

The app will NOT boot without Supabase env vars. `components/main-header.tsx` (rendered in the root `app/layout.tsx`) calls `createClient()` at render time, which **throws** if `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing — so every page returns HTTP 500. This is different from the homepage business list, which catches the error and shows hardcoded fallback data.

- Provide these as Cursor secrets (preferred) or in a gitignored `.env.local` at the repo root:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `STRIPE_SECRET_KEY` (optional)
  - `GOOGLE_MAPS_API_KEY` (optional)
- `.env*` is gitignored, so `.env.local` does not persist through a fresh repo checkout. If no real Supabase secrets are set, create a placeholder `.env.local` so the app boots with fallback data:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
  ```
- With placeholder (non-real) credentials, only the homepage business grid works (it uses hardcoded fallback data). Category filtering, keyword search, business detail pages, auth, favorites, admin, and the Stripe checkout all query Supabase directly and will appear empty / "not found" until real credentials + seeded data (`scripts/001`/`002`) are supplied.

### Lint / typecheck / build notes

- `pnpm lint` is NOT usable non-interactively: ESLint is unconfigured and `next lint` prompts for a config. `next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so linting is not part of this project's workflow.
- `next.config.mjs` also sets `typescript.ignoreBuildErrors: true`. There are pre-existing `tsc` type errors (e.g. `email` not on `BusinessDetails` in `lib/db/businesses.ts`); they are intentionally ignored and do not block dev/build.
- Standard scripts live in `package.json`: `dev`, `build`, `start`, `lint`.
- `sharp`'s build script is ignored by pnpm; this is fine because `next.config.mjs` uses `images.unoptimized: true`.
