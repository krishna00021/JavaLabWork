import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import java from 'shiki/langs/java.mjs'
import vitesseDark from 'shiki/themes/vitesse-dark.mjs'

const THEME = 'vitesse-dark'

let instance: Promise<HighlighterCore> | null = null

/**
 * Only the Java grammar and one theme are imported, so the bundle carries a single
 * TextMate grammar instead of the full Shiki language set.
 */
export function getHighlighter(): Promise<HighlighterCore> {
  instance ??= createHighlighterCore({
    themes: [vitesseDark],
    langs: [java],
    engine: createJavaScriptRegexEngine(),
  })
  return instance
}

/** Warms the highlighter up so the first code block does not flash unstyled. */
export function prewarmHighlighter(): void {
  void getHighlighter().catch(() => {
    instance = null
  })
}

export async function highlightJava(code: string): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, { lang: 'java', theme: THEME })
}
