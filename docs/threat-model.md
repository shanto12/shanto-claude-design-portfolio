# Threat Model

## Assets

- Public portfolio content and demo links.
- Contact payload submitted to `/api/contact`.
- Netlify deploy metadata exposed by `/api/health`.
- Static frontend bundle and visual assets.

## Trust boundaries

- Browser to Netlify static assets.
- Browser to Netlify Functions.
- Netlify Functions to logs.
- Parent deployment workflow to production evidence.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Sensitive personal or recruiter data appears in public UI | Data provenance file lists allowed facts and explicit exclusions. Tests cover demo counts and exclusion categories. |
| Contact route collects secrets or identity details | Contact function validates shape, rejects obvious sensitive terms, and logs only metadata such as email domain and message length. |
| Client-side secret exposure | No provider keys, API tokens, or private env vars are referenced in frontend code. |
| Clickjacking or weak browser policy | `netlify.toml` sets CSP, `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, referrer policy, and a restrictive permissions policy. |
| Production behavior differs from local preview | Playwright has local and production configs. `verify:production` requires `PLAYWRIGHT_BASE_URL` and parent production evidence. |
| External demo links drift or fail | Parent production verification should check live demo reachability before release signoff. |

## Residual risk

Worker B did not deploy or run real Chrome production verification. Parent must complete live Netlify, Chrome profile, header, function, and network evidence before calling the portfolio production-ready.
