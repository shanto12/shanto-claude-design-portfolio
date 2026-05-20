# Shanto Claude Design Portfolio

Standalone Vite + React + TypeScript portfolio for Shanto Mathew, built as an editorial systems proof surface for AI security automation, SOAR engineering, agentic AI delivery, and deployed Netlify demos.

## What is included

- Hero, achievements, skills, nine-demo gallery, systems approach, proof/evidence, and contact workflow.
- Public-safe data only: no phone, exact address, DOB, identity documents, private recruiter details, compensation, API keys, or client-sensitive details.
- Netlify Functions:
  - `GET /api/health`
  - `POST /api/contact`
- Vitest, Testing Library, Playwright desktop/mobile tests, ESLint, TypeScript, and Vite build.
- Release docs for architecture, data provenance, threat model, Claude Design source, and test evidence.

## Commands

```bash
npm install
npm run dev
npm run verify
npm run verify:release
PLAYWRIGHT_BASE_URL=https://<deployed-netlify-url> npm run verify:production
```

`verify:production` requires a deployed Netlify URL. Worker B intentionally does not deploy, push, or create Netlify/GitHub resources.

## Production handoff

Parent deploy worker should update `demo.manifest.json`, run the Netlify production deploy, then update `docs/test-evidence.md` with the live URL, deploy ID, real Chrome pass, headers, production Playwright results, and production npm audit result.
