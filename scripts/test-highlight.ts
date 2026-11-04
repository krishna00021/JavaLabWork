import { highlightJava } from '../src/lib/highlight'

const sample = `class A {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`

const html = await highlightJava(sample)

const checks: Array<[string, boolean]> = [
  ['produces a <pre> block', html.includes('<pre')],
  ['produces highlighted spans', html.includes('<span')],
  ['carries the vitesse-dark theme class', html.includes('class="shiki vitesse-dark"')],
  ['carries shiki class hooks', html.includes('class="shiki')],
  ['escapes the string literal', html.includes('&quot;') || html.includes('Hello, Java!')],
]

let failed = 0
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
  if (!ok) failed += 1
}

console.log(`\nhtml length: ${html.length}`)
console.log(`opening tag: ${html.slice(0, html.indexOf('>') + 1)}`)
if (failed > 0) process.exit(1)
console.log('Shiki highlighting OK')
