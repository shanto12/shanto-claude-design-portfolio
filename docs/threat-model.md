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
- Production release workflow to evidence docs.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Sensitive personal or recruiter data appears in public UI | Data provenance file lists allowed facts and explicit exclusions. Tests cover demo counts and exclusion categories. |
| Contact route collects secrets or identity details | Contact function validates shape, rejects obvious sensitive terms, and logs only metadata such as email domain and message length. |
| Client-side secret exposure | No provider keys, API tokens, or private env vars are referenced in frontend code. |
| Clickjacking or weak browser policy | `netlify.toml` sets CSP, `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, referrer policy, and a restrictive permissions policy. |
| Production behavior differs from local preview | Playwright has local and production configs. `verify:production` was run against the deployed Netlify URL before release signoff. |
| External demo links drift or fail | Production release verification checked all nine public Netlify demo links for HTTP 200 before signoff. |

## Residual risk

External demo applications are independently hosted and can drift after this release. Re-run the link check in `docs/test-evidence.md` before using the portfolio for a new campaign or recruiter proof pack.
