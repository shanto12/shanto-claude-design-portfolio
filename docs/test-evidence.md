# Test Evidence

Verified: May 20, 2026, 6:47 PM CDT

- Production URL: https://shanto-claude-design-portfolio.netlify.app
- Netlify site ID: `b46923c6-13ef-4acf-bea7-91ef1c4b0f4c`
- Netlify production deploy ID: `6a0e47dcfabb57588fad07dd`
- GitHub source: https://github.com/shanto12/shanto-claude-design-portfolio
- Source provenance: Claude Design project exported visually; Claude Code CLI was present but the bounded non-interactive run hit the configured budget cap, so Codex completed the production implementation and release pass.

## Evidence Matrix

| Requirement | Status | Evidence mode | Notes |
| --- | --- | --- | --- |
| Test deployed Netlify URL | Verified | Playwright production + Netlify plugin | `PLAYWRIGHT_BASE_URL=https://shanto-claude-design-portfolio.netlify.app npm run verify:production` passed against the production URL; Netlify deploy was ready with framework `vite` and two functions. |
| Real Chrome profile final pass | Verified | Real Chrome | Used Shanto's real Google Chrome profile on the production URL. LastPass and other profile extensions were visible. |
| Primary controls, tabs, buttons, forms, workflows | Verified | Real Chrome + Playwright | Real Chrome clicked hero demo/proof actions, nav links, all demo filters, the contact button/form fields, and submitted the contact form with fake QA data. Playwright covered desktop and mobile workflows. |
| Auth, logout/login, password-manager behavior | Not applicable | Architecture review + Real Chrome | The portfolio has no auth, login, logout, or password field. LastPass appeared in real Chrome fields; no credential-save prompt was relevant. |
| API calls | Verified | API + Playwright | `/api/health` returned service `shanto-claude-design-portfolio` with release evidence `production-verified`; `/api/contact` accepted a valid JSON payload and returned `Message validated. Production follow-up can proceed without exposing sensitive details.` |
| Backend/runner jobs and task completion | Not applicable | Architecture review | The backend is deterministic Netlify Functions only; there are no queue workers, scheduled jobs, or long-running runners. |
| Desktop layout | Verified | Playwright production | Production desktop Chromium workflow passed without layout blockers. |
| Mobile layout | Verified | Playwright production | Production mobile Chromium workflow passed without layout blockers. |
| Console errors and failed network requests | Verified | Playwright production | E2E collectors failed the run on page errors, console errors, failed requests, or same-origin HTTP failures; production run passed. |
| Security headers and CSP | Verified | Headers | Production `curl -D -` returned CSP, HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, and Permissions-Policy. |
| Production npm audit | Verified | npm audit | `npm audit --omit=dev --audit-level=high` completed with 0 vulnerabilities in the release and production verification scripts. |
| Public Netlify demo links | Verified | Link check | All nine outbound Netlify demo URLs returned HTTP 200 on May 20, 2026. |

## Commands Recorded

```bash
npm run verify:release
PLAYWRIGHT_BASE_URL=https://shanto-claude-design-portfolio.netlify.app npm run verify:production
curl -sS -D - -o /dev/null https://shanto-claude-design-portfolio.netlify.app
curl -sS https://shanto-claude-design-portfolio.netlify.app/api/health
curl -sS -X POST https://shanto-claude-design-portfolio.netlify.app/api/contact -H 'content-type: application/json' --data '{"name":"Real Chrome Reviewer","email":"chrome-reviewer@example.com","company":"Real Chrome production pass","interest":"Security automation role","message":"Testing the deployed Claude portfolio contact workflow in the real Chrome profile."}'
```

## External Demo Link Check

```text
200 https://security-ops-playbook-analyzer.netlify.app/
200 https://grok-medical-frontdesk.netlify.app/
200 https://grok-experience-navigator.netlify.app/
200 https://nocturne-ai-hotel.netlify.app/
200 https://y22-ai-sales-roleplay.netlify.app/
200 https://elevenlabs-forward-deployed-engineer.netlify.app/
200 https://vapi-pilot-command-center.netlify.app/
200 https://gp-agentic-revenue-ops.netlify.app/
200 https://flux-atlas-demo.netlify.app/
```
