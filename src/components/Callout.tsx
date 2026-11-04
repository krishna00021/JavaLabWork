import type { Callout as CalloutData } from '../content/types'

const tones = {
  note: {
    wrap: 'border-sky-500/30 bg-sky-500/10',
    title: 'text-sky-300',
    body: 'text-sky-100/75',
  },
  omitted: {
    wrap: 'border-slate-600/50 bg-slate-800/40',
    title: 'text-slate-200',
    body: 'text-slate-300/80',
  },
  source: {
    wrap: 'border-amber-500/30 bg-amber-500/10',
    title: 'text-amber-300',
    body: 'text-amber-100/75',
  },
} as const

export function Callout({ callout }: { callout: CalloutData }) {
  const tone = tones[callout.tone]
  return (
    <aside className={`rounded-lg border px-4 py-3 ${tone.wrap}`}>
      <p className={`text-sm font-semibold ${tone.title}`}>{callout.title}</p>
      <p className={`mt-1 text-sm leading-relaxed ${tone.body}`}>{callout.body}</p>
    </aside>
  )
}
