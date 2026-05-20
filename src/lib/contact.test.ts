import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitContact, validateContactPayload, type ContactPayload } from './contact'

const validPayload: ContactPayload = {
  name: 'Avery Reviewer',
  email: 'avery@example.com',
  company: 'Security platform team',
  interest: 'Security automation role',
  message: 'I would like to discuss an AI security automation role with Shanto.',
}

describe('contact validation', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  it('submits only to the contact API after validation succeeds', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          id: 'contact-test',
          message: 'Message validated.',
          nextSteps: ['Review demo evidence'],
        }),
        { headers: { 'content-type': 'application/json' }, status: 200 },
      ),
    )

    await expect(submitContact(validPayload)).resolves.toMatchObject({ ok: true, id: 'contact-test' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
  })
})
