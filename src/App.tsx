import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { SearchBox } from './components/SearchBox'
import { prewarmHighlighter } from './lib/highlight'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    prewarmHighlighter()
  }, [])

  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-950 lg:block">
        <div className="border-b border-slate-800 px-4 py-4">
          <Link to="/" className="block">
            <span className="text-lg font-bold text-white">Java Lab</span>
            <span className="block text-xs text-slate-500">from combined.docx</span>
          </Link>
        </div>
        <div className="h-[calc(100%-4.5rem)]">
          <Sidebar />
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/80"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
              <span className="text-lg font-bold text-white">Java Lab</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded border border-slate-700 px-2 py-1 text-sm text-slate-300"
              >
                Close
              </button>
            </div>
            <div className="flex-1">
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded border border-slate-700 px-3 py-1.5 text-sm text-slate-300 lg:hidden"
              aria-label="Open navigation"
            >
              Menu
            </button>
            <div className="min-w-0 flex-1">
              <SearchBox />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-800 px-4 py-6">
          <div className="mx-auto max-w-5xl text-sm text-slate-600">
            Content reproduced from <span className="font-mono">combined.docx</span>. Screenshots
            are unmodified extracts from the document.
          </div>
        </footer>
      </div>
    </div>
  )
}
