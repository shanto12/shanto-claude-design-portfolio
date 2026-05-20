import type { Demo, EvidenceItem, SkillGroup, SystemStep } from '../lib/types'

export const profile = {
  name: 'Shanto Mathew',
  location: 'Dallas-Fort Worth',
  headline: 'Senior AI Security Automation Engineer and Agentic AI Builder',
  summary:
    'I build inspectable AI security automation systems: SOAR playbooks, agentic workflows, public-safe demos, and production proof surfaces that make automation decisions reviewable.',
  contactPositioning:
    'Best fit: security automation, SOAR/XSOAR/XSIAM, incident response automation, agentic AI platforms, and Python-heavy integration roles.',
}

export const achievements = [
  {
    value: '50+',
    label: 'SOAR playbooks',
    detail: 'Playbook engineering across enrichment, routing, response handoffs, and analyst-assist workflows.',
  },
  {
    value: 'Up to 70%',
    label: 'Reduced repetitive response paths',
    detail: 'Automation emphasis on removing duplicate triage steps, stale handoffs, and repeated enrichment loops.',
  },
  {
    value: '95%',
    label: 'Initial triage target',
    detail: 'Structured classification goals with human review, audit trails, and measurable routing outcomes.',
  },
  {
    value: '9',
    label: 'Public Netlify demos',
    detail: 'Deployed AI, voice, security, revenue, and creative systems surfaces with production-oriented checks.',
  },
] as const

export const skillGroups: SkillGroup[] = [
  {
    title: 'Security Automation',
    description: 'SOAR and SOC workflows that remove toil while keeping approvals and audit boundaries explicit.',
    skills: ['Cortex XSOAR/XSIAM', 'Splunk SOAR', 'Playbook engineering', 'Incident response'],
  },
  {
    title: 'Integration Engineering',
    description: 'API-first systems that normalize tool data, preserve provenance, and keep operators in control.',
    skills: ['Python', 'REST/JSON APIs', 'MCP tooling', 'CSP/security headers'],
  },
  {
    title: 'Agentic AI Delivery',
    description: 'Useful AI workflow surfaces with deterministic fallbacks, retrieval boundaries, and visible proof.',
    skills: ['Agentic AI', 'RAG', 'Netlify Functions', 'React'],
  },
  {
    title: 'Verification Practice',
    description: 'Release habits that treat test evidence, user journeys, and production checks as part of the product.',
    skills: ['TypeScript', 'Playwright', 'Vitest', 'Security headers'],
  },
]

export const demos: Demo[] = [
  {
    slug: 'security-ops-playbook-analyzer',
    title: 'Security Ops Playbook Analyzer',
    url: 'https://security-ops-playbook-analyzer.netlify.app/',
    category: 'Security AI',
    purpose:
      'SOC automation proof surface for incident intake, playbook reasoning, approval gates, and operator-readable reports.',
  },
  {
    slug: 'grok-medical-frontdesk',
    title: 'Grok Medical Frontdesk',
    url: 'https://grok-medical-frontdesk.netlify.app/',
    category: 'Voice AI',
    purpose:
      'Synthetic front-desk workflow showing real-time voice boundaries, safe scheduling behavior, and health-checkable backend routes.',
  },
  {
    slug: 'grok-experience-navigator',
    title: 'Grok Experience Navigator',
    url: 'https://grok-experience-navigator.netlify.app/',
    category: 'Voice AI',
    purpose:
      'Voice-guided enterprise experience navigator for product rooms, security rooms, ROI stories, and support routing.',
  },
  {
    slug: 'nocturne-ai-hotel',
    title: 'Nocturne AI Hotel',
    url: 'https://nocturne-ai-hotel.netlify.app/',
    category: 'Voice AI',
    purpose:
      'AI hotel concierge environment with generated scenes, guided workflows, synthetic guest handling, and audit-safe copy.',
  },
  {
    slug: 'y22-ai-sales-roleplay',
    title: 'Y22 AI Sales Roleplay',
    url: 'https://y22-ai-sales-roleplay.netlify.app/',
    category: 'Voice AI',
    purpose:
      'Sales roleplay cockpit with persona prompts, call-state progression, coaching surfaces, and scorecard-ready feedback.',
  },
  {
    slug: 'elevenlabs-forward-deployed-engineer',
    title: 'Forward Deployed Voice AI Console',
    url: 'https://elevenlabs-forward-deployed-engineer.netlify.app/',
    category: 'Voice AI',
    purpose:
      'Launch-room console for voice AI pilots: readiness, blockers, stakeholder status, safety controls, and replayable evidence.',
  },
  {
    slug: 'vapi-pilot-command-center',
    title: 'Vapi Pilot Command Center',
    url: 'https://vapi-pilot-command-center.netlify.app/',
    category: 'Voice AI',
    purpose:
      'Forward-deployed pilot operating surface for scope, UAT, launch blockers, stakeholder updates, and reusable deployment kits.',
  },
  {
    slug: 'gp-agentic-revenue-ops',
    title: 'Agentic Revenue Ops Workbench',
    url: 'https://gp-agentic-revenue-ops.netlify.app/',
    category: 'Revenue AI',
    purpose:
      'Agentic revenue workflow for buyer-intent signals, ICP scoring, campaign drafting, and human-approved agent runs.',
  },
  {
    slug: 'flux-atlas-demo',
    title: 'Flux Atlas Demo',
    url: 'https://flux-atlas-demo.netlify.app/',
    category: 'Creative Systems',
    purpose:
      'Interactive generative canvas with responsive controls, motion settings, and production smoke-test evidence.',
  },
]

export const demoCategories = ['All', 'Security AI', 'Voice AI', 'Revenue AI', 'Creative Systems'] as const

export const systemSteps: SystemStep[] = [
  {
    title: 'Model the response path',
    body: 'Start with the analyst or operator journey, then identify where enrichment, triage, routing, and reporting can be made deterministic.',
  },
  {
    title: 'Instrument every boundary',
    body: 'Expose health, data provenance, function behavior, and user-visible outcomes so reviewers can inspect what the system did.',
  },
  {
    title: 'Keep approval gates visible',
    body: 'AI can draft, classify, and summarize, but sensitive security or business actions need explicit human checkpoints.',
  },
  {
    title: 'Ship proof artifacts',
    body: 'Pair the live UI with tests, docs, threat model, release evidence, and a contact workflow that keeps private details out of the public surface.',
  },
]

export const evidenceItems: EvidenceItem[] = [
  {
    label: 'Frontend release gate',
    method: 'Vitest, TypeScript, ESLint, Vite build',
    status: 'Production verified',
  },
  {
    label: 'User journey coverage',
    method: 'Playwright desktop and mobile pass',
    status: 'Production verified',
  },
  {
    label: 'Backend contract',
    method: '/api/health and /api/contact Netlify Functions',
    status: 'Production functions verified',
  },
  {
    label: 'Sensitive data boundary',
    method: 'Data provenance and threat model docs',
    status: 'Public-safe by design',
  },
]

export const excludedFromPublicSurface = [
  'phone',
  'exact address',
  'date of birth',
  'identity documents',
  'private recruiter details',
  'compensation',
  'API keys',
  'client-sensitive details',
] as const
