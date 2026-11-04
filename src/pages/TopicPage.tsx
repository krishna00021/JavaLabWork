import { Link, useParams } from 'react-router-dom'
import { getGroup, programsInGroup, sectionOfGroup } from '../content'
import { BlockList } from '../components/BlockList'
import { ProgramCard } from '../components/ProgramCard'
import { NotFound } from './NotFound'

export function TopicPage() {
  const { topicId } = useParams()
  const group = getGroup(topicId ?? '')

  if (!group) return <NotFound />

  const section = sectionOfGroup(group.id)
  const programs = programsInGroup(group.id)
  const hasProgramBlock = group.blocks.some((block) => block.kind === 'programs')

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <nav className="text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>
          {section && (
            <>
              <span className="px-2">/</span>
              <Link to={`/section/${section.id}`} className="hover:text-slate-300">
                {section.title}
              </Link>
            </>
          )}
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{group.title}</h1>
        {group.summary && <p className="max-w-3xl leading-relaxed text-slate-300">{group.summary}</p>}
        {programs.length > 0 && (
          <p className="text-sm text-slate-500">
            {programs.length} program{programs.length === 1 ? '' : 's'}
          </p>
        )}
      </header>

      <BlockList blocks={group.blocks} />

      {!hasProgramBlock && programs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Programs</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {programs.map((program) => (
              <li key={program.id}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
