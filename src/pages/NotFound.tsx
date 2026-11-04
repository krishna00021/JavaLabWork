import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="space-y-4">
      <p className="text-sm tracking-wide text-amber-400 uppercase">404</p>
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Page not found</h1>
      <p className="max-w-2xl leading-relaxed text-slate-300">
        This address does not match anything in the document. Use the sidebar or search to find
        the topic you were looking for.
      </p>
      <Link
        to="/"
        className="inline-block rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-amber-500/60 hover:text-amber-300"
      >
        Back to home
      </Link>
    </div>
  )
}
