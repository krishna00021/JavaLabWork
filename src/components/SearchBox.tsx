import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { flatPrograms, groups, sections } from '../content'

interface Hit {
  to: string
  kind: 'Section' | 'Topic' | 'Program'
  label: string
  detail?: string
  haystack: string
}

function buildIndex(): Hit[] {
  const hits: Hit[] = []
  for (const section of sections) {
    hits.push({
      to: `/section/${section.id}`,
      kind: 'Section',
      label: section.title,
      detail: section.description,
      haystack: `${section.title} ${section.description ?? ''}`.toLowerCase(),
    })
  }
  for (const group of groups) {
    hits.push({
      to: `/topic/${group.id}`,
      kind: 'Topic',
      label: group.title,
      detail: group.summary,
      haystack: `${group.title} ${group.summary ?? ''}`.toLowerCase(),
    })
  }
  for (const { program, group } of flatPrograms) {
    hits.push({
      to: `/program/${program.id}`,
      kind: 'Program',
      label: program.title,
      detail: [program.ref, program.className, group.title].filter(Boolean).join(' · '),
      haystack: [
        program.title,
        program.ref ?? '',
        program.className ?? '',
        program.code?.fileName ?? '',
        program.problemStatement ?? '',
        program.code?.code ?? '',
      ]
        .join(' ')
        .toLowerCase(),
    })
  }
  return hits
}

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const index = useMemo(() => buildIndex(), [])
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return index
      .filter((hit) => hit.haystack.includes(q))
      .slice(0, 12)
  }, [index, query])

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) {
            navigate(results[0].to)
            setOpen(false)
          }
          if (event.key === 'Escape') setOpen(false)
        }}
        placeholder="Search programs, topics, code…"
        aria-label="Search the site"
        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-amber-500/60 focus:outline-none"
      />

      {open && results.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 shadow-xl">
          {results.map((hit) => (
            <li key={hit.to}>
              <Link
                to={hit.to}
                onClick={() => {
                  setOpen(false)
                  setQuery('')
                }}
                className="block px-3 py-2 hover:bg-slate-800"
              >
                <span className="text-xs text-slate-500">{hit.kind}</span>
                <p className="text-sm text-slate-200">{hit.label}</p>
                {hit.detail && <p className="truncate text-xs text-slate-500">{hit.detail}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
