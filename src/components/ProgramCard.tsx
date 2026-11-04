import { Link } from 'react-router-dom'
import type { Program } from '../content/types'
import { sectionOfGroup } from '../content'

interface Props {
  program: Program
}

export function ProgramCard({ program }: Props) {
  const section = sectionOfGroup(program.groupId)

  return (
    <Link
      to={`/program/${program.id}`}
      className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-amber-500/50 hover:bg-slate-900"
    >
      <div className="flex items-start gap-3">
        {program.ref && (
          <span className="mt-0.5 shrink-0 rounded bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-300">
            {program.ref}
          </span>
        )}
        <h3 className="flex-1 font-medium text-slate-100 group-hover:text-amber-300">
          {program.title}
        </h3>
      </div>

      {program.className && (
        <p className="mt-2 font-mono text-xs text-slate-500">{program.className}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
        {program.screenshotOnlySource && (
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-300/90">
            Screenshot-only source
          </span>
        )}
        {program.screenshots.length > 0 && (
          <span>{program.screenshots.length} screenshot</span>
        )}
        {program.knownIssues && (
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-300/90">
            Known issues
          </span>
        )}
      </div>

      {section && (
        <p className="mt-auto pt-3 text-xs text-slate-600">{section.title}</p>
      )}
    </Link>
  )
}
