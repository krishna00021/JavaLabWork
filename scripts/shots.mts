/**
 * Captures desktop and mobile screenshots of representative routes.
 *
 * Requires the Playwright browser binary:
 *   npx playwright install chromium
 *
 * The dev server must already be running; override the target with BASE_URL.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = process.env.BASE_URL ?? 'http://localhost:5199'
const outDir = 'node_modules/.tmp/shots'
mkdirSync(outDir, { recursive: true })

const pages = [
  { name: '01-home', path: '/' },
  { name: '02-comparison-table', path: '/topic/comparison-table' },
  { name: '03-install-oracle', path: '/topic/install-java-oracle' },
  { name: '04-oop-list', path: '/topic/oop-source-collection' },
  { name: '05-program2-2', path: '/program/program2_2' },
  { name: '06-exercise-04', path: '/program/fundamentals-04' },
  { name: '07-strings', path: '/program/strings-stringbufferdemo' },
  { name: '08-exceptions-3', path: '/program/exceptions-3' },
  { name: '09-threads-12', path: '/program/threads-12' },
  { name: '10-reference', path: '/topic/supporting-files' },
]

const browser = await chromium.launch()
const errors: string[] = []

for (const viewport of [
  { tag: 'desktop', width: 1440, height: 1000 },
  { tag: 'mobile', width: 390, height: 844 },
]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[${viewport.tag}] ${page.url()} :: ${message.text()}`)
  })
  page.on('pageerror', (error) => {
    errors.push(`[${viewport.tag}] ${page.url()} :: ${error.message}`)
  })

  for (const target of pages) {
    await page.goto(`${base}${target.path}`, { waitUntil: 'networkidle' })

    // Screenshots use loading="lazy"; walk the page so every image is actually
    // requested before a full-page capture, otherwise below-fold images come out blank.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
      await Promise.all(
        [...document.images]
          .filter((img) => !img.complete)
          .map((img) => new Promise((r) => { img.onload = r; img.onerror = r })),
      )
    })
    await page.waitForTimeout(600)

    await page.screenshot({
      path: `${outDir}/${viewport.tag}-${target.name}.png`,
      fullPage: viewport.tag === 'desktop',
    })
  }

  await context.close()
}

await browser.close()

console.log(`captured ${pages.length * 2} screenshots into ${outDir}`)
if (errors.length > 0) {
  console.error(`\nBROWSER ERRORS (${errors.length}):`)
  for (const error of [...new Set(errors)]) console.error(`  - ${error}`)
  process.exit(1)
}
console.log('no console or page errors')
