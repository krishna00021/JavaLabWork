import { useEffect, useState } from 'react'
import type { ImageAsset } from '../content/types'

interface Props {
  image: ImageAsset
  /** Context used to build accessible alt text and the visible caption. */
  context: string
  index: number
  total: number
}

const kindLabel: Record<ImageAsset['kind'], string> = {
  'command-prompt': 'Command Prompt',
  gui: 'Windows dialog',
  browser: 'Web browser',
  installer: 'Installer wizard',
  editor: 'Text editor',
}

export function Screenshot({ image, context, index, total }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const alt = `${kindLabel[image.kind]} screenshot for ${context}`

  return (
    <figure className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Enlarge ${alt}`}
      >
        <img
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="block w-full bg-slate-950 object-contain"
        />
      </button>
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-800 bg-slate-950/60 px-4 py-2 text-xs text-slate-400">
        <span className="rounded bg-slate-800 px-2 py-0.5 font-medium text-slate-300">
          {kindLabel[image.kind]}
        </span>
        <span>
          Screenshot {index + 1} of {total}
        </span>
        <span className="text-slate-600">
          {image.width} × {image.height}
        </span>
      </figcaption>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="truncate text-sm text-slate-300">{alt}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:border-slate-500 hover:text-white"
              autoFocus
            >
              Close (Esc)
            </button>
          </div>
          <div className="scroll-slim flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              className="mx-auto block max-w-none rounded border border-slate-800"
            />
          </div>
        </div>
      )}
    </figure>
  )
}
