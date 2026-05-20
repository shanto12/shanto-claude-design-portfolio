import { expect, test, type Page } from '@playwright/test'

const productionTarget = Boolean(process.env.PLAYWRIGHT_BASE_URL)

function collectFailures(page: Page) {
  const failures: string[] = []

  page.on('pageerror', (error) => failures.push(`pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (!productionTarget && message.text().includes('Failed to load resource')) return
    if (message.type() === 'error') failures.push(`console: ${message.text()}`)
  })
  page.on('requestfailed', (request) => {
    const url = new URL(request.url())
    if (!productionTarget && ['/api/contact', '/api/health'].includes(url.pathname)) return
    failures.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })
  page.on('response', (response) => {
    const url = new URL(response.url())
    if (!productionTarget && ['/api/contact', '/api/health'].includes(url.pathname)) return
    if (url.origin === new URL(page.url()).origin && response.status() >= 400) {
      failures.push(`http ${response.status()}: ${response.url()}`)
    }
  })

  return failures
}

test('portfolio primary workflows pass on desktop and mobile', async ({ page, isMobile }) => {
  const failures = collectFailures(page)
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Shanto Mathew' })).toBeVisible()
  await expect(page.getByRole('link', { name: /View demo gallery/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Review proof surface/i })).toBeVisible()
  await page.getByRole('link', { name: /Review proof surface/i }).click()
  await expect(page.getByText('Production verified').first()).toBeVisible()
  await expect(page.getByText('Production functions verified')).toBeVisible()

  if (!isMobile) {
    const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' })
    for (const section of ['Achievements', 'Skills', 'Demos', 'Approach', 'Proof', 'Contact']) {
      await primaryNav.getByRole('link', { name: section, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}`))
    }
  }

  await page.getByRole('link', { name: /View demo gallery/i }).click()
  await expect(page.getByRole('heading', { name: /Nine public Netlify demos/i })).toBeInViewport()
  await expect(page.getByRole('link', { name: /Open live demo/i })).toHaveCount(9)

  await page.getByRole('button', { name: 'Security AI' }).click()
  await expect(page.getByRole('heading', { name: 'Security Ops Playbook Analyzer' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Grok Medical Frontdesk' })).toHaveCount(0)

  await page.getByRole('button', { name: 'Voice AI' }).click()
  await expect(page.getByRole('heading', { name: 'Grok Medical Frontdesk' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Security Ops Playbook Analyzer' })).toHaveCount(0)

  await page.getByRole('button', { name: 'Revenue AI' }).click()
  await expect(page.getByRole('heading', { name: 'Agentic Revenue Ops Workbench' })).toBeVisible()

  await page.getByRole('button', { name: 'Creative Systems' }).click()
  await expect(page.getByRole('heading', { name: 'Flux Atlas Demo' })).toBeVisible()

  await page.getByRole('button', { name: 'All' }).click()
  await expect(page.getByRole('link', { name: /Open live demo/i })).toHaveCount(9)

  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }).click()
  await expect(page.getByRole('heading', { name: /Contact workflow/i })).toBeInViewport()
  await page.getByLabel('Name').fill('Avery Reviewer')
  await page.getByLabel('Email').fill('avery@example.com')
  await page.getByLabel('Company or context').fill('Security platform team')
  await page.getByLabel('Message').fill('I would like to discuss an AI security automation role with Shanto.')
  await page.getByRole('button', { name: /Send message/i }).click()
  await expect(page.getByRole('status')).toContainText(/Message validated|Production follow-up|Netlify contact/i)

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth)

  if (productionTarget) {
    const health = await page.request.get('/api/health')
    expect(health.status()).toBe(200)
    expect(health.headers()['content-type']).toMatch(/application\/json/)
    const healthBody = await health.json()
    const releaseEvidence = healthBody.capabilities.find((item: { name: string }) => item.name === 'Release evidence')
    expect(releaseEvidence.status).toBe('production-verified')
    const contact = await page.request.post('/api/contact', {
      data: {
        name: 'Avery Reviewer',
        email: 'avery@example.com',
        company: 'Security platform team',
        interest: 'Security automation role',
        message: 'I would like to discuss the portfolio evidence and role fit.',
      },
    })
    expect(contact.status()).toBe(200)
  }

  expect(failures).toEqual([])
})
