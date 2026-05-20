import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('renders the required portfolio sections and all demo links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Shanto Mathew' })).toBeInTheDocument()
    expect(screen.getByText(/Senior AI Security Automation Engineer/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Security automation outcomes/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Skills mapped to delivery surfaces/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Nine public Netlify demos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Systems approach/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Proof and evidence layer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Contact workflow/i })).toBeInTheDocument()

    const demoLinks = screen.getAllByRole('link', { name: /Open live demo/i })
    expect(demoLinks).toHaveLength(9)
    expect(demoLinks.map((link) => link.getAttribute('href'))).toContain(
      'https://flux-atlas-demo.netlify.app/',
    )
  })

  it('filters demos by category', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Security AI' }))
    expect(screen.getByRole('heading', { name: 'Security Ops Playbook Analyzer' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Grok Medical Frontdesk' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Voice AI' }))
    expect(screen.getByRole('heading', { name: 'Grok Medical Frontdesk' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Agentic Revenue Ops Workbench' })).not.toBeInTheDocument()
  })

  it('submits contact workflow through the backend helper', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            ok: true,
            id: 'contact-test',
            message: 'Message validated. Production follow-up can proceed without exposing sensitive details.',
            nextSteps: ['Review demos'],
          }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        ),
      )
      .mockResolvedValueOnce(new Response('', { status: 200 }))

    render(<App />)

    await user.type(screen.getByLabelText('Name'), 'Avery Reviewer')
    await user.type(screen.getByLabelText('Email'), 'avery@example.com')
    await user.type(screen.getByLabelText('Company or context'), 'Security platform team')
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss an AI security automation role.')
    await user.click(screen.getByRole('button', { name: /Send message/i }))

    expect(await screen.findByRole('status')).toHaveTextContent(/Message validated/i)
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
  })
})
