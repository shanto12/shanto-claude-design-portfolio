const baseHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: baseHeaders,
  })

const asString = (value) => (typeof value === 'string' ? value.trim() : '')
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const blockedTerms = [
  'ssn',
  'social security',
  'passport',
  'driver license',
  'date of birth',
  'api key',
  'secret key',
  'private key',
]

function validate(payload) {
  const name = asString(payload.name)
  const email = asString(payload.email)
  const company = asString(payload.company)
  const interest = asString(payload.interest || 'Security automation role')
  const message = asString(payload.message)
  const normalizedMessage = message.toLowerCase()

  if (name.length < 2) return { error: 'Please enter your name.' }
  if (!validEmail(email)) return { error: 'Please enter a valid email address.' }
  if (company.length < 2) return { error: 'Please add a company, team, or context.' }
  if (message.length < 16) return { error: 'Please include a short message with role or project context.' }
  if (message.length > 2400) return { error: 'Please keep the message under 2400 characters.' }

  const blockedTerm = blockedTerms.find((term) => normalizedMessage.includes(term))
  if (blockedTerm) {
    return {
      error: `Please remove sensitive material such as ${blockedTerm} before submitting.`,
    }
  }

  return { value: { name, email, company, interest, message } }
}

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: baseHeaders })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Use POST for contact submissions.' }, 405)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ ok: false, message: 'Invalid JSON payload.' }, 400)
  }

  const validation = validate(payload)
  if (validation.error) return json({ ok: false, message: validation.error }, 400)

  const safe = validation.value
  const requestId = `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

  console.log(
    JSON.stringify({
      event: 'portfolio_contact_validated',
      requestId,
      emailDomain: safe.email.split('@')[1],
      companyLength: safe.company.length,
      interest: safe.interest,
      messageLength: safe.message.length,
    }),
  )

  return json({
    ok: true,
    id: requestId,
    message: 'Message validated. Production follow-up can proceed without exposing sensitive details.',
    nextSteps: ['Review the most relevant demo links', 'Map role needs to automation evidence', 'Schedule a focused technical discussion'],
  })
}

export const config = {
  path: '/api/contact',
}
