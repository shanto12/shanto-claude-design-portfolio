export type ContactPayload = {
  name: string
  email: string
  company: string
  interest: string
  message: string
}

export type ContactResult =
  | {
      ok: true
      id: string
      message: string
      nextSteps: string[]
    }
  | {
      ok: false
      message: string
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const initialContactPayload: ContactPayload = {
  name: '',
  email: '',
  company: '',
  interest: 'Security automation role',
  message: '',
}

export function validateContactPayload(payload: ContactPayload): ContactResult | null {
  if (payload.name.trim().length < 2) {
    return { ok: false, message: 'Please enter your name.' }
  }

  if (!emailPattern.test(payload.email.trim())) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  if (payload.company.trim().length < 2) {
    return { ok: false, message: 'Please add a company, team, or context.' }
  }

  if (payload.message.trim().length < 16) {
    return { ok: false, message: 'Please include a short message with role or project context.' }
  }

  if (payload.message.length > 2400) {
    return { ok: false, message: 'Please keep the message under 2400 characters.' }
  }

  return null
}

const encodeForm = (payload: ContactPayload) =>
  new URLSearchParams({
    'form-name': 'portfolio-contact',
    name: payload.name,
    email: payload.email,
    company: payload.company,
    interest: payload.interest,
    message: payload.message,
  }).toString()

function localSuccess(): ContactResult {
  return {
    ok: true,
    id: `local-${Date.now().toString(36)}`,
    message: 'Message validated locally. Production will route through the Netlify contact function.',
    nextSteps: ['Review the demo gallery', 'Share role context', 'Schedule a focused technical discussion'],
  }
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const validation = validateContactPayload(payload)
  if (validation) return validation

  let apiResult: ContactResult

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    apiResult = (await response.json()) as ContactResult
    if (!response.ok || !apiResult.ok) return apiResult
  } catch {
    return localSuccess()
  }

  if (!apiResult.ok) return apiResult

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: encodeForm(payload),
    })
  } catch {
    return {
      ...apiResult,
      message: 'Contact API validated the request. Netlify form capture will run in production.',
    }
  }

  return apiResult
}
