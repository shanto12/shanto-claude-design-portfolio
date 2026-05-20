import { describe, expect, it } from 'vitest'
import { demos, excludedFromPublicSurface, profile } from './portfolio'

describe('portfolio data', () => {
  it('contains the required Shanto facts and nine demo links', () => {
    expect(profile.name).toBe('Shanto Mathew')
    expect(profile.location).toBe('Dallas-Fort Worth')
    expect(demos).toHaveLength(9)
    expect(demos.map((demo) => demo.url)).toEqual([
      'https://security-ops-playbook-analyzer.netlify.app/',
      'https://grok-medical-frontdesk.netlify.app/',
      'https://grok-experience-navigator.netlify.app/',
      'https://nocturne-ai-hotel.netlify.app/',
      'https://y22-ai-sales-roleplay.netlify.app/',
      'https://elevenlabs-forward-deployed-engineer.netlify.app/',
      'https://vapi-pilot-command-center.netlify.app/',
      'https://gp-agentic-revenue-ops.netlify.app/',
      'https://flux-atlas-demo.netlify.app/',
    ])
  })

  it('documents excluded private data categories', () => {
    expect(excludedFromPublicSurface).toContain('phone')
    expect(excludedFromPublicSurface).toContain('API keys')
    expect(excludedFromPublicSurface).toContain('client-sensitive details')
  })
})
