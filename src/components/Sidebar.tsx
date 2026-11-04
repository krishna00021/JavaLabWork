import { NavLink } from 'react-router-dom'
import { programIdsInSection, programsInGroup, sections } from '../content'

function linkClass({ isActive }: { isActive: boolean }): string {
  return `block rounded-md px-3 py-1.5 text-sm transition ${
    isActive
      ? 'bg-amber-500/15 font-medium text-amber-300'
      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
  }`
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="scroll-slim h-full overflow-y-auto px-3 py-4" aria-label="Main">
      <ul className="space-y-5">
        {sections.map((section) => {
          const sectionCount = programIdsInSection(section.id).length
          return (
            <li key={section.id}>
              <NavLink
                to={`/section/${section.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-baseline justify-between gap-2 ${
                    isActive ? 'text-amber-300' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                <span className="font-semibold">{section.title}</span>
                {sectionCount > 0 && (
                  <span className="shrink-0 text-xs text-slate-600 tabular-nums">
                    {sectionCount}
                  </span>
                )}
              </NavLink>

              <ul className="mt-1.5 space-y-0.5 border-l border-slate-800 pl-2">
                {section.groups.map((group) => {
                  const count = programsInGroup(group.id).length
                  return (
                    <li key={group.id}>
                      <NavLink
                        to={`/topic/${group.id}`}
                        onClick={onNavigate}
                        className={linkClass}
                      >
                        <span className="flex items-baseline justify-between gap-2">
                          <span>{group.title}</span>
                          {count > 0 && (
                            <span className="shrink-0 text-xs text-slate-600 tabular-nums">
                              {count}
                            </span>
                          )}
                        </span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
