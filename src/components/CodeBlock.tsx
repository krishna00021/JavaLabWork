import { useEffect, useState } from 'react'
import { highlightJava } from '../lib/highlight'

interface Props {
  code: string
  fileName?: string
  /** Rendered above the code when the block is not the original source. */
  banner?: { title: string; body: string; tone: 'warning' | 'muted' }
  label?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function CodeBlock({ code, fileName, banner, label }: Props) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    highlightJava(code)
      .then((result) => {
        if (active) setHtml(result)
      })
      .catch(() => {
        if (active) setHtml(null)
      })
    return () => {
      active = false
    }
  }, [code])

  const lineCount = code.split('\n').length

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      {(fileName || label || banner) && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/60 px-4 py-2">
          <span className="truncate font-mono text-xs text-slate-400">
            {fileName ?? label ?? ''}
          </span>
          <span className="shrink-0 text-xs text-slate-600">{lineCount} lines</span>
        </div>
      )}

      {banner && (
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-amber-300">{banner.title}</p>
          <p className="mt-1 text-sm text-amber-200/80">{banner.body}</p>
        </div>
      )}

      {html ? (
        <div
          className="scroll-slim overflow-x-auto text-[13px] leading-relaxed [&_pre]:!p-4 [&_pre]:font-mono"
          // Shiki output is generated locally from the document's own source text.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="scroll-slim overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-slate-300">
          <code dangerouslySetInnerHTML={{ __html: escapeHtml(code) }} />
        </pre>
      )}
    </div>
  )
}
