export type ImageKind = 'command-prompt' | 'gui' | 'browser' | 'installer' | 'editor'

export interface ImageAsset {
  src: string
  width: number
  height: number
  bytes: number
  kind: ImageKind
}

export interface CodeBlock {
  language: 'java'
  code: string
  /** Present only when the source document explicitly names the file. */
  fileName?: string
}

export interface KnownIssue {
  title: string
  detail: string
}

export interface Snippet {
  /** Label such as "Sample Output" or "Output", preserved from the source document. */
  label?: string
  code: string
}

export type StepEntry =
  | { type: 'text'; text: string }
  | { type: 'code'; code: string; label?: string }
  | { type: 'image'; image: ImageAsset }

export interface Step {
  title: string
  /** Ordered exactly as the document reads: text, commands, output and images interleaved. */
  entries: StepEntry[]
}

export interface Program {
  id: string
  /** Program identifier exactly as written in the source document. */
  ref?: string
  /** Public class name read from the code, used where the document names no file. */
  className?: string
  title: string
  /** True when the title was derived from the code rather than stated as a heading. */
  titleDerived?: boolean
  groupId: string
  problemStatement?: string
  code?: CodeBlock
  /** Verbatim output text from the source document. Empty when the document has none. */
  outputs: string[]
  screenshots: ImageAsset[]
  notes: string[]
  /** Set when the source code is only visible inside a screenshot. */
  screenshotOnlySource?: boolean
  knownIssues?: KnownIssue[]
  /** Explicitly labelled as NOT the original source. */
  correctedCode?: string
  sourceLine: number
}

export type Block =
  | {
      kind: 'prose'
      id: string
      title?: string
      paragraphs?: string[]
      /** Ordered flat content: prose, commands, output and images interleaved as in the document. */
      entries?: StepEntry[]
      steps?: Step[]
      listItems?: string[]
      callouts?: Callout[]
      sourceLine: number
    }
  | {
      kind: 'table'
      id: string
      title: string
      columns: string[]
      rows: string[][]
      sourceLine: number
    }
  | {
      kind: 'programs'
      id: string
      title?: string
      programIds: string[]
      sourceLine: number
    }

export interface Callout {
  tone: 'note' | 'omitted' | 'source'
  title: string
  body: string
}

export interface Group {
  id: string
  title: string
  summary?: string
  blocks: Block[]
  sourceLine: number
}

export interface Section {
  id: string
  title: string
  order: number
  description?: string
  groups: Group[]
  sourceLine: number
}

export interface SiteStats {
  programs: number
  exercises: number
  groups: number
  tables: number
  images: number
  commandPromptImages: number
}
