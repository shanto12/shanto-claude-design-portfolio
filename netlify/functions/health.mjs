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
  const context = process.env.CONTEXT || 'local'
  const url = process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:4173'
  const deployId = process.env.DEPLOY_ID || process.env.BUILD_ID || null

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
        status: 'parent-verification-required',
        detail: 'Production deploy, real Chrome pass, headers, and production Playwright evidence are intentionally left for parent.',
      },
    ],
  })
}

export const config = {
  path: '/api/health',
}
