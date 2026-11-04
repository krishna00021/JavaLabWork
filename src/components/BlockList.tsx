import type { Block, Group, Program, StepEntry } from '../content/types'
import { getProgram } from '../content'
import { Callout } from './Callout'
import { ComparisonTable } from './ComparisonTable'
import { Screenshot } from './Screenshot'
import { ProgramCard } from './ProgramCard'

/**
 * Renders document-ordered entries. Images are numbered among themselves rather than
 * by their position in the entry list, so text and code in between do not inflate the
 * "Screenshot n of m" counter.
 */
function EntryList({ entries, context }: { entries: StepEntry[]; context: string }) {
  const imageOrdinals = new Map<number, number>()
  let total = 0
  for (const [i, entry] of entries.entries()) {
    if (entry.type === 'image') imageOrdinals.set(i, total++)
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => {
        if (entry.type === 'text') {
          return (
            <p key={i} className="leading-relaxed text-slate-300">
              {entry.text}
            </p>
          )
        }

        if (entry.type === 'code') {
          return (
            <div key={i}>
              {entry.label && (
                <p className="mb-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
                  {entry.label}
                </p>
              )}
              <pre className="scroll-slim overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 font-mono text-[13px] text-slate-200">
                <code>{entry.code}</code>
              </pre>
            </div>
          )
        }

        return (
          <Screenshot
            key={i}
            image={entry.image}
            context={context}
            index={imageOrdinals.get(i) ?? 0}
            total={total}
          />
        )
      })}
    </div>
  )
}

function Prose({ block }: { block: Extract<Block, { kind: 'prose' }> }) {
  const context = block.title ?? 'this topic'
  return (
    <div className="space-y-5">
      {block.title && <h2 className="text-xl font-semibold text-white">{block.title}</h2>}

      {block.callouts?.map((callout) => <Callout key={callout.title} callout={callout} />)}

      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-slate-300">
          {paragraph}
        </p>
      ))}

      {block.listItems && (
        <ul className="space-y-1.5 border-l-2 border-slate-800 pl-4">
          {block.listItems.map((item) => (
            <li key={item} className="leading-relaxed text-slate-300">
              {item}
            </li>
          ))}
        </ul>
      )}

      {block.entries && <EntryList entries={block.entries} context={context} />}

      {block.steps && (
        <ol className="space-y-6">
          {block.steps.map((step, s) => (
            <li key={step.title} className="relative pl-8">
              <span className="absolute top-0.5 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-xs font-semibold text-amber-300">
                {s + 1}
              </span>
              <h3 className="pt-0.5 font-semibold text-slate-100">{step.title}</h3>
              <div className="mt-3">
                <EntryList entries={step.entries} context={step.title} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function ProgramsBlock({ programIds }: { programIds: string[] }) {
  const items = programIds
    .map((id) => getProgram(id))
    .filter((p): p is Program => Boolean(p))

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((program) => (
        <li key={program.id}>
          <ProgramCard program={program} />
        </li>
      ))}
    </ul>
  )
}

export function BlockList({ blocks }: { blocks: Group['blocks'] }) {
  return (
    <div className="space-y-10">
      {blocks.map((block) => {
        if (block.kind === 'prose') return <Prose key={block.id} block={block} />
        if (block.kind === 'table') {
          return (
            <section key={block.id} className="space-y-3">
              <h2 className="text-xl font-semibold text-white">{block.title}</h2>
              <ComparisonTable columns={block.columns} rows={block.rows} />
            </section>
          )
        }
        return (
          <section key={block.id} id={block.id} className="space-y-4">
            {block.title && (
              <h2 className="text-xl font-semibold text-white">{block.title}</h2>
            )}
            <ProgramsBlock programIds={block.programIds} />
          </section>
        )
      })}
    </div>
  )
}
