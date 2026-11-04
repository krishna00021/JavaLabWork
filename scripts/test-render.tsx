import { renderToString } from 'react-dom/server'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { Home } from '../src/pages/Home'
import { SectionPage } from '../src/pages/SectionPage'
import { TopicPage } from '../src/pages/TopicPage'
import { ProgramPage } from '../src/pages/ProgramPage'
import { NotFound } from '../src/pages/NotFound'
import { flatPrograms, groups, programs, sections } from '../src/content'

function routes() {
  return [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'section/:sectionId', element: <SectionPage /> },
        { path: 'topic/:topicId', element: <TopicPage /> },
        { path: 'program/:programId', element: <ProgramPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
}

const failures: string[] = []
let checked = 0

function render(path: string): string {
  const router = createMemoryRouter(routes(), { initialEntries: [path] })
  return renderToString(<RouterProvider router={router} />)
}

function expect(label: string, condition: boolean, detail = '') {
  checked += 1
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ''}`)
}

/* ---------- every route renders without throwing ---------- */
const paths: Array<[string, string]> = [
  ['/', 'home'],
  ...sections.map((s) => [`/section/${s.id}`, `section ${s.id}`] as [string, string]),
  ...groups.map((g) => [`/topic/${g.id}`, `topic ${g.id}`] as [string, string]),
  ...programs.map((p) => [`/program/${p.id}`, `program ${p.id}`] as [string, string]),
  ['/program/does-not-exist', 'unknown program'],
  ['/section/does-not-exist', 'unknown section'],
]

for (const [path, label] of paths) {
  try {
    const html = render(path)
    expect(`${label} renders`, html.length > 500, `only ${html.length} chars`)
    expect(`${label} has no error page`, !html.includes('Page not found') || path.includes('does-not-exist'))
  } catch (error) {
    failures.push(`${label} threw: ${(error as Error).message}`)
    checked += 1
  }
}

/* ---------- spot-check that key content actually reaches the markup ---------- */
const home = render('/')
expect('home lists Java Lab', home.includes('Java Lab'))
expect('home reports 62 programs', home.includes('62'))

/* ---------- student details appear on the home page ---------- */
expect('home shows the student name', home.includes('Nagula Venkata Sri Krishna Teja'))
expect('home shows the section', home.includes('AIML-2'))
expect('home shows the roll number', home.includes('25EU02102'))
expect('home labels the card for screen readers', home.includes('aria-labelledby="student-card-heading"'))

/* ---------- student details must not leak into the document content pages ---------- */
for (const [path, label] of paths) {
  if (path === '/') continue // the home page is where the student card belongs
  const html = render(path)
  expect(
    `${label} carries no student details`,
    !html.includes('Nagula Venkata Sri Krishna Teja') && !html.includes('25EU02102'),
  )
}

const table = render('/topic/comparison-table')
expect('comparison table renders', table.includes('James Gosling') && table.includes('Bjarne Stroustrup'))
expect('comparison table has 20 rows', table.includes('Single-threaded by default'))
expect('comparison notes the omitted conclusion', table.includes('Not present in the source document'))

const oracle = render('/topic/install-java-oracle')
expect('oracle guide shows JAVA_HOME', oracle.includes('JAVA_HOME'))
expect('oracle guide shows JAVA 25 output', oracle.includes('java 25 2026-09-15'))

const openjdk = render('/topic/install-java-openjdk')
expect('openjdk guide keeps JAVAOPEN_HOME', openjdk.includes('JAVAOPEN_HOME'))
expect('openjdk guide keeps the openlogic URL', openjdk.includes('openlogic.com'))
expect('openjdk heading typo is corrected', openjdk.includes('INSTALLATION OF JAVA') && !openjdk.includes('INSTALATION'))

const p22 = render('/program/program2_2')
expect('program2_2 keeps the verbatim line', p22.includes('Student[i]'))
expect('program2_2 flags the array name issue', p22.includes('students'))
expect('program2_2 shows known issues section', p22.includes('Known Issues in Source Document'))
expect('program2_2 labels the corrected version', p22.includes('Corrected Version'))

const exercise = render('/program/fundamentals-04')
expect('exercise marks screenshot-only source', exercise.includes('Screenshot-only source'))
expect('exercise reuses the shared image', exercise.includes('/images/image17.png'))

const shared = flatPrograms.filter(
  (f) => f.program.screenshots.some((s) => s.src === '/images/image17.png'),
)
expect('image17 belongs to exactly two exercises', shared.length === 2, `found ${shared.length}`)

const derivation = render('/program/program2_1')
expect('oop program shows id and title together', derivation.includes('program2_1'))
expect('oop program explains derived title', derivation.includes('derived from what this'))

console.log(`render checks run: ${checked}`)
if (failures.length > 0) {
  console.error(`\nFAILURES (${failures.length}):`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}
console.log('all routes render correctly')
