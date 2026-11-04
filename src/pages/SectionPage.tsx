import { Link, useParams } from 'react-router-dom'
import { getSection, programIdsInSection } from '../content'
import { NotFound } from './NotFound'

export function SectionPage() {
  const { sectionId } = useParams()
  const section = getSection(sectionId ?? '')

  if (!section) return <NotFound />

  const programCount = programIdsInSection(section.id).length

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <nav className="text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h1>
        {section.description && (
          <p className="max-w-3xl leading-relaxed text-slate-300">{section.description}</p>
        )}
        {programCount > 0 && (
          <p className="text-sm text-slate-500">
            {programCount} program{programCount === 1 ? '' : 's'} in this topic
          </p>
        )}
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {section.groups.map((group) => (
          <li key={group.id}>
            <Link
              to={`/topic/${group.id}`}
              className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-amber-500/50 hover:bg-slate-900"
            >
              <h2 className="font-semibold text-slate-100 group-hover:text-amber-300">
                {group.title}
              </h2>
              {group.summary && (
                <p className="mt-1 text-sm text-slate-400">{group.summary}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
