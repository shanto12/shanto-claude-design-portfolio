# Architecture

## Runtime

- Vite + React + TypeScript single-page portfolio.
- Static assets served from `public/`.
- Netlify Functions provide `/api/health` and `/api/contact`.
- No client-side secrets, LLM calls, database writes, or private recruiter integrations.

## Frontend modules

- `src/data/portfolio.ts`: public-safe profile facts, achievements, skills, demo links, system steps, evidence items, and excluded data categories.
- `src/lib/contact.ts`: shared contact payload type, local validation, Netlify function submit flow, and local fallback.
- `src/App.tsx`: composed sections for header, hero, achievements, skills, demo gallery, approach, proof, contact, and footer.
- `src/index.css`: app-level design tokens, responsive layout, controls, cards, forms, and accessibility states.

## Backend modules

- `netlify/functions/health.mjs`: deterministic JSON health response with capabilities, deploy context, and production verification status.
- `netlify/functions/contact.mjs`: validates contact payloads, rejects obvious sensitive terms, logs only metadata, and returns next-step guidance.

## Verification boundary

Production verification was completed on May 20, 2026 Central Time against `https://shanto-claude-design-portfolio.netlify.app` on deploy `6a0e47dcfabb57588fad07dd`. The release evidence covers Netlify deploy readiness, Playwright desktop/mobile production workflows, real Chrome profile interaction, `/api/health`, `/api/contact`, security headers, CSP, production audit, and outbound demo-link reachability. The explicit evidence matrix is maintained in `docs/test-evidence.md`.
