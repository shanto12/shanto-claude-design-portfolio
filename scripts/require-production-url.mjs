const target = process.env.PLAYWRIGHT_BASE_URL

if (!target) {
  console.error('Set PLAYWRIGHT_BASE_URL to the deployed Netlify URL before running production e2e.')
  process.exit(1)
}

try {
  const url = new URL(target)
  if (!/^https:\/\/.+/.test(url.href)) {
    throw new Error('Production target must be an HTTPS URL.')
  }
} catch (error) {
  console.error(`Invalid PLAYWRIGHT_BASE_URL: ${error.message}`)
  process.exit(1)
}
