import type { Group, Program, Section, SiteStats } from './types'
import { comparisonSection } from './comparison'
import { gettingStartedSection } from './getting-started'
import { fundamentalsSection, fundamentalsPrograms } from './fundamentals'
import { oopSection, oopPrograms } from './oop-programs'
import { stringsSection, stringPrograms } from './strings'
import {
  inheritanceSection,
  inheritanceExperimentPrograms,
  inheritanceStatementPrograms,
} from './inheritance'
import { exceptionHandlingSection, exceptionPrograms } from './exception-handling'
import {
  fileIoSection,
  byteStreamPrograms,
  charStreamPrograms,
} from './file-io'
import { threadsSection, threadPrograms } from './threads'
import { referenceSection } from './reference'
import { images } from './images'

export const sections: Section[] = [
  comparisonSection,
  gettingStartedSection,
  fundamentalsSection,
  oopSection,
  stringsSection,
  inheritanceSection,
  exceptionHandlingSection,
  fileIoSection,
  threadsSection,
  referenceSection,
].sort((a, b) => a.order - b.order)

export const programs: Program[] = [
  ...fundamentalsPrograms,
  ...oopPrograms,
  ...stringPrograms,
  ...inheritanceExperimentPrograms,
  ...inheritanceStatementPrograms,
  ...exceptionPrograms,
  ...byteStreamPrograms,
  ...charStreamPrograms,
  ...threadPrograms,
]

export const groups: Group[] = sections.flatMap((s) => s.groups)

const programIndex = new Map(programs.map((p) => [p.id, p]))
const groupIndex = new Map(groups.map((g) => [g.id, g]))
const sectionIndex = new Map(sections.map((s) => [s.id, s]))

const groupToSection = new Map<string, string>()
for (const s of sections) for (const g of s.groups) groupToSection.set(g.id, s.id)

export function getProgram(id: string): Program | undefined {
  return programIndex.get(id)
}

export function getGroup(id: string): Group | undefined {
  return groupIndex.get(id)
}

export function getSection(id: string): Section | undefined {
  return sectionIndex.get(id)
}

export function sectionOfGroup(groupId: string): Section | undefined {
  const id = groupToSection.get(groupId)
  return id ? sectionIndex.get(id) : undefined
}

export function programsInGroup(groupId: string): Program[] {
  return programs.filter((p) => p.groupId === groupId)
}

/** Every program id referenced by a `programs` block, in document order. */
export function programIdsInSection(sectionId: string): string[] {
  const section = sectionIndex.get(sectionId)
  if (!section) return []
  const ids: string[] = []
  for (const g of section.groups) {
    for (const b of g.blocks) {
      if (b.kind === 'programs') ids.push(...b.programIds)
    }
  }
  return ids
}

export interface FlatProgram {
  program: Program
  section: Section
  group: Group
  index: number
  total: number
}

const flat: FlatProgram[] = []
for (const section of sections) {
  const ids = programIdsInSection(section.id)
  ids.forEach((id, i) => {
    const program = programIndex.get(id)
    const group = program ? groupIndex.get(program.groupId) : undefined
    if (program && group) {
      flat.push({ program, section, group, index: i, total: ids.length })
    }
  })
}

export const flatPrograms = flat

export function flatNeighbours(id: string): { prev?: FlatProgram; next?: FlatProgram } {
  const i = flat.findIndex((f) => f.program.id === id)
  if (i === -1) return {}
  return { prev: flat[i - 1], next: flat[i + 1] }
}

export function flatPosition(id: string): FlatProgram | undefined {
  return flat.find((f) => f.program.id === id)
}

const allImages = Object.values(images)

export const stats: SiteStats = {
  programs: programs.filter((p) => p.code).length,
  exercises: programs.filter((p) => !p.code).length,
  groups: groups.length,
  tables: sections
    .flatMap((s) => s.groups)
    .flatMap((g) => g.blocks)
    .filter((b) => b.kind === 'table').length,
  images: allImages.length,
  commandPromptImages: allImages.filter((i) => i.kind === 'command-prompt').length,
}

export { images }
