import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  flatPrograms,
  groups,
  images,
  programs,
  sections,
  stats,
} from '../src/content'

const imageDir = join(process.cwd(), 'public', 'images')

const problems: string[] = []
const note = (message: string) => problems.push(message)

/* ---------- unique ids ---------- */
function assertUnique(label: string, values: string[]) {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) note(`duplicate ${label} id: ${value}`)
    seen.add(value)
  }
  return seen
}

assertUnique('program', programs.map((p) => p.id))
assertUnique('group', groups.map((g) => g.id))
assertUnique('section', sections.map((s) => s.id))

/* ---------- every referenced program resolves ---------- */
for (const section of sections) {
  for (const group of section.groups) {
    for (const block of group.blocks) {
      if (block.kind !== 'programs') continue
      for (const id of block.programIds) {
        if (!programs.some((p) => p.id === id)) {
          note(`block "${block.id}" references unknown program "${id}"`)
        }
      }
    }
  }
}

/* ---------- groupId on each program points at a real group ---------- */
const groupIds = new Set(groups.map((g) => g.id))
for (const program of programs) {
  if (!groupIds.has(program.groupId)) {
    note(`program "${program.id}" points at unknown group "${program.groupId}"`)
  }
}

/* ---------- images: referenced assets exist, and every file is used ---------- */
const referenced = new Set<string>()
const allImages = Object.values(images)
for (const program of programs) {
  for (const shot of program.screenshots) referenced.add(shot.src)
}
function walkEntries(entries: unknown): void {
  if (!Array.isArray(entries)) return
  for (const entry of entries) {
    if (entry && typeof entry === 'object' && 'type' in entry) {
      const e = entry as { type: string; image?: { src: string } }
      if (e.type === 'image' && e.image) referenced.add(e.image.src)
    }
  }
}
for (const section of sections) {
  for (const group of section.groups) {
    for (const block of group.blocks) {
      if (block.kind !== 'prose') continue
      walkEntries(block.entries)
      for (const step of block.steps ?? []) walkEntries(step.entries)
    }
  }
}

for (const asset of allImages) {
  if (!existsSync(join(imageDir, asset.src.replace('/images/', '')))) {
    note(`missing file on disk for ${asset.src}`)
  }
}
for (const src of referenced) {
  if (!allImages.some((a) => a.src === src)) note(`unknown image referenced: ${src}`)
}

const onDisk = readdirSync(imageDir).filter((f) => f.endsWith('.png'))
for (const file of onDisk) {
  if (!referenced.has(`/images/${file}`)) note(`image on disk never referenced: ${file}`)
}

/* ---------- duplicate ids across the two "super keyword" programs ---------- */
const superPrograms = programs.filter(
  (p) => p.className === 'SuperKeywordDemo' || p.code?.fileName === 'SuperKeywordDemo.java',
)
if (superPrograms.length !== 2) {
  note(`expected 2 distinct SuperKeywordDemo programs, found ${superPrograms.length}`)
}

/* ---------- known-issues program keeps verbatim source ---------- */
const p22 = programs.find((p) => p.ref === 'program2_2')
if (!p22) note('program2_2 missing')
else {
  if (!p22.code?.code.includes('Student[i]=new Student(roll,name);')) {
    note('program2_2 verbatim source was altered')
  }
  if (!p22.code?.code.includes('\nsc.close();\n}')) {
    note('program2_2 misplaced sc.close() no longer present in verbatim source')
  }
  if (!p22.knownIssues || p22.knownIssues.length !== 2) {
    note('program2_2 should carry exactly 2 known issues')
  }
  if (!p22.correctedCode) note('program2_2 corrected version missing')
}

/* ---------- the 15 exercises must have no transcribed code ---------- */
const exercises = programs.filter((p) => p.screenshotOnlySource)
for (const exercise of exercises) {
  if (exercise.code) note(`exercise "${exercise.id}" must not carry code text`)
  if (exercise.screenshots.length === 0) note(`exercise "${exercise.id}" has no screenshot`)
}

/* ---------- report ---------- */
const lines: string[] = []
lines.push('CONTENT PARITY AUDIT')
lines.push('======================')
lines.push(`sections                  ${sections.length}`)
lines.push(`groups                    ${groups.length}`)
lines.push(`programs with code        ${stats.programs}`)
lines.push(`screenshot-only exercises ${stats.exercises}`)
lines.push(`program entries total     ${programs.length}`)
lines.push(`flat navigation entries   ${flatPrograms.length}`)
lines.push(`tables                    ${stats.tables}`)
lines.push(`images on disk            ${onDisk.length}`)
lines.push(`images in manifest        ${allImages.length}`)
lines.push(`images referenced         ${referenced.size}`)
lines.push(`  command-prompt          ${allImages.filter((i) => i.kind === 'command-prompt').length}`)
lines.push(`  other (gui/browser/etc) ${allImages.filter((i) => i.kind !== 'command-prompt').length}`)
lines.push('')
lines.push('Per section:')
for (const section of sections) {
  const ids = flatPrograms.filter((f) => f.section.id === section.id)
  lines.push(
    `  ${section.order}. ${section.title.padEnd(24)} groups=${section.groups.length} programs=${ids.length}`,
  )
}
lines.push('')
lines.push(`image17 referenced by: ${
  programs.filter((p) => p.screenshots.some((s) => s.src === '/images/image17.png')).length
} exercises`)

if (problems.length > 0) {
  lines.push('')
  lines.push(`PROBLEMS (${problems.length}):`)
  for (const problem of problems) lines.push(`  - ${problem}`)
  console.error(lines.join('\n'))
  process.exit(1)
}

console.log(lines.join('\n'))
