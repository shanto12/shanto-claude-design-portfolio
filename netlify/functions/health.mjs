const headers = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers,
  })

export default async () => {
  const context = getEnv('CONTEXT') || 'production'
  const url =
    getEnv('URL') ||
    getEnv('DEPLOY_PRIME_URL') ||
    'https://shanto-claude-design-portfolio.netlify.app'
  const deployId = getEnv('DEPLOY_ID') || getEnv('BUILD_ID') || 'manual-upload-production'

  return json({
    service: 'shanto-claude-design-portfolio',
    status: 'ready',
    mode: 'static-portfolio-with-contact-backend',
    provider: 'deterministic-no-llm',
    context,
    url,
    deployId,
    observedAt: new Date().toISOString(),
    capabilities: [
      {
        name: 'Portfolio UI',
        status: 'ready',
        detail: 'Hero, achievements, skills, demo gallery, systems approach, proof surface, and contact workflow.',
      },
      {
        name: 'Demo links',
        status: 'ready',
        detail: 'Nine public Netlify demos are linked with public-safe purpose summaries.',
      },
      {
        name: 'Contact validation',
        status: 'ready',
        detail: 'Validates contact payloads without API keys, phone collection, identity data, or recruiter-private fields.',
      },
      {
        name: 'Release evidence',
        status: 'production-verified',
        detail:
          'Netlify deploy, real Chrome pass, headers, production Playwright, API checks, and demo-link reachability are recorded in docs/test-evidence.md.',
      },
    ],
  })
}

function getEnv(name) {
  return globalThis.Netlify?.env?.get?.(name) || process.env[name]
}

export const config = {
  path: '/api/health',
}
