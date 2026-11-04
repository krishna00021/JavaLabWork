import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import { mkdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { createRequire } from 'node:module'

/**
 * Bundles a TypeScript script with esbuild and runs it in this Node process.
 *
 * usage: node scripts/run-ts.mjs <entry.ts> [--cjs]
 *
 * Some dependencies (react-dom/server) ship CommonJS builds that rely on dynamic
 * require(), which an ESM bundle cannot provide. Pass --cjs for those entries.
 */
async function main() {
  const args = process.argv.slice(2)
  const entry = args.find((a) => !a.startsWith('--'))
  const useCjs = args.includes('--cjs')

  if (!entry) {
    console.error('usage: node scripts/run-ts.mjs <entry.ts> [--cjs]')
    process.exit(2)
  }

  mkdirSync('node_modules/.tmp', { recursive: true })
  const name = basename(entry).replace(/\.tsx?$/, '')
  const outfile = `node_modules/.tmp/${name}.${useCjs ? 'cjs' : 'mjs'}`

  await build({
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    format: useCjs ? 'cjs' : 'esm',
    jsx: 'automatic',
    loader: { '.css': 'empty' },
    logLevel: 'warning',
    outfile,
  })

  if (useCjs) {
    createRequire(import.meta.url)(resolve(outfile))
  } else {
    await import(pathToFileURL(outfile).href)
  }
}

main()
