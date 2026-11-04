import { Link } from 'react-router-dom'
import type { Program } from '../content/types'
import { flatNeighbours, sectionOfGroup } from '../content'
import { CodeBlock } from './CodeBlock'
import { Screenshot } from './Screenshot'
import { Callout } from './Callout'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-white">{children}</h2>
  )
}

export function ProgramView({ program }: { program: Program }) {
  const { prev, next } = flatNeighbours(program.id)
  const section = sectionOfGroup(program.groupId)
  const context = program.ref ? `${program.ref}: ${program.title}` : program.title

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        {section && (
          <nav className="text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-300">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to={`/section/${section.id}`} className="hover:text-slate-300">
              {section.title}
            </Link>
          </nav>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {program.ref && (
            <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-sm text-slate-200">
              {program.ref}
            </span>
          )}
          {program.className && (
            <span className="rounded bg-slate-800/60 px-2.5 py-1 font-mono text-sm text-slate-400">
              {program.className}
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {program.ref ? `${program.ref} — ${program.title}` : program.title}
        </h1>

        {program.titleDerived && (
          <p className="text-sm text-slate-500">
            The title above is derived from what this program's code demonstrates. The source
            document labels it only by{' '}
            {program.ref ? <span className="font-mono">{program.ref}</span> : 'its position'}.
          </p>
        )}
      </header>

      {program.screenshotOnlySource && (
        <Callout
          callout={{
            tone: 'source',
            title: 'Screenshot-only source',
            body: 'The source document provides no code text for this exercise. The Command Prompt screenshot below is the only record of the code, so the code is shown as an image and is not transcribed here.',
          }}
        />
      )}

      {program.problemStatement && (
        <section className="space-y-2">
          <SectionHeading>Problem Statement</SectionHeading>
          <p className="leading-relaxed text-slate-300">{program.problemStatement}</p>
        </section>
      )}

      {program.code && (
        <section className="space-y-3">
          <SectionHeading>Source Code</SectionHeading>
          <CodeBlock
            code={program.code.code}
            {...(program.code.fileName ? { fileName: program.code.fileName } : {})}
          />
        </section>
      )}

      {program.knownIssues && program.knownIssues.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Known Issues in Source Document</SectionHeading>
          <p className="text-sm text-slate-400">
            The source above is reproduced verbatim from the document. The following problems are
            present in the original text and have not been corrected.
          </p>
          <ul className="space-y-3">
            {program.knownIssues.map((issue) => (
              <li
                key={issue.title}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3"
              >
                <p className="font-mono text-sm font-semibold text-amber-300">{issue.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-amber-100/80">
                  {issue.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {program.correctedCode && (
        <section className="space-y-3">
          <SectionHeading>Corrected Version — Not Original Source</SectionHeading>
          <CodeBlock
            code={program.correctedCode}
            fileName={program.code?.fileName}
            banner={{
              tone: 'warning',
              title: 'Corrected Version — Not Original Source',
              body: 'This listing is a suggested correction prepared for this site. It is not part of the source document. The original text remains available in the Source Code section above.',
            }}
          />
        </section>
      )}

      {program.outputs.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Output</SectionHeading>
          <pre className="scroll-slim overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 font-mono text-[13px] text-slate-200">
            <code>{program.outputs.join('\n')}</code>
          </pre>
        </section>
      )}

      {program.screenshots.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Command Prompt Output</SectionHeading>
          <div className="space-y-4">
            {program.screenshots.map((shot, i) => (
              <Screenshot
                key={shot.src}
                image={shot}
                context={context}
                index={i}
                total={program.screenshots.length}
              />
            ))}
          </div>
        </section>
      )}

      {program.notes.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Notes</SectionHeading>
          <ul className="space-y-2">
            {program.notes.map((note) => (
              <li
                key={note}
                className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm leading-relaxed text-slate-300"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prev || next) && (
        <nav className="grid gap-3 border-t border-slate-800 pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/program/${prev.program.id}`}
              className="rounded-lg border border-slate-800 px-4 py-3 hover:border-slate-600"
            >
              <span className="text-xs text-slate-500">Previous</span>
              <p className="mt-0.5 text-sm text-slate-200">{prev.program.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/program/${next.program.id}`}
              className="rounded-lg border border-slate-800 px-4 py-3 text-right hover:border-slate-600 sm:col-start-2"
            >
              <span className="text-xs text-slate-500">Next</span>
              <p className="mt-0.5 text-sm text-slate-200">{next.program.title}</p>
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
