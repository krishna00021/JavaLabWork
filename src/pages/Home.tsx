import { Link } from 'react-router-dom'
import { programIdsInSection, sections, stats } from '../content'
import { StudentCard } from '../components/StudentCard'

const highlights = [
  { label: 'Java programs with source code', value: stats.programs },
  { label: 'Screenshot-only exercises', value: stats.exercises },
  { label: 'Command Prompt screenshots', value: stats.commandPromptImages },
  { label: 'Comparison table', value: stats.tables },
]

export function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm tracking-wide text-amber-400 uppercase">Java Lab</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Java programs, experiments and setup guides
        </h1>
        {/* <p className="max-w-3xl leading-relaxed text-slate-300">
          A direct conversion of the combined.docx laboratory record. Every listing, table and
          screenshot here comes from that document; nothing has been added to it. Where the
          document has no title, no output text or no code, that absence is stated on the page
          rather than filled in.
        </p> */}

        <StudentCard />

        <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3"
            >
              <dt className="text-xs text-slate-400">{item.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-amber-300 tabular-nums">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Browse by topic</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {sections.map((section) => {
            const count = programIdsInSection(section.id).length
            return (
              <li key={section.id}>
                <Link
                  to={`/section/${section.id}`}
                  className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-amber-500/50 hover:bg-slate-900"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold text-slate-100 group-hover:text-amber-300">
                      {section.title}
                    </h3>
                    {count > 0 && (
                      <span className="shrink-0 text-xs text-slate-500 tabular-nums">
                        {count} programs
                      </span>
                    )}
                  </div>
                  {section.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {section.description}
                    </p>
                  )}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {section.groups.map((group) => (
                      <li
                        key={group.id}
                        className="rounded bg-slate-800/70 px-2 py-0.5 text-xs text-slate-400"
                      >
                        {group.title}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
