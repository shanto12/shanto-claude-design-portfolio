import { describe, expect, it } from 'vitest'
import { validateContactPayload, type ContactPayload } from './contact'

const validPayload: ContactPayload = {
  name: 'Avery Reviewer',
  email: 'avery@example.com',
  company: 'Security platform team',
  interest: 'Security automation role',
  message: 'I would like to discuss an AI security automation role with Shanto.',
}

describe('contact validation', () => {
  it('accepts a complete public-safe payload', () => {
    expect(validateContactPayload(validPayload)).toBeNull()
  })

  it('rejects malformed email and short messages', () => {
    expect(validateContactPayload({ ...validPayload, email: 'avery' })).toEqual({
      ok: false,
      message: 'Please enter a valid email address.',
    })
    expect(validateContactPayload({ ...validPayload, message: 'Too short' })).toEqual({
      ok: false,
      message: 'Please include a short message with role or project context.',
    })
  })
})
