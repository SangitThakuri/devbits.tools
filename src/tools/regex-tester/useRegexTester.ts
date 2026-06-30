import { useState, useMemo } from "react"
import type { RegexState, MatchResult } from "./types"

export function useRegexTester() {
  const [state, setState] = useState<RegexState>({
    pattern: "",
    flags: "g",
    testText: "",
  })

  const setPattern = (pattern: string) => setState((prev) => ({ ...prev, pattern }))
  const setFlags = (flags: string) => setState((prev) => ({ ...prev, flags }))
  const setTestText = (testText: string) => setState((prev) => ({ ...prev, testText }))

  const regexError: string | null = useMemo(() => {
    if (!state.pattern) return null
    try {
      new RegExp(state.pattern, state.flags)
      return null
    } catch (e) {
      return (e as SyntaxError).message
    }
  }, [state.pattern, state.flags])

  const matches: MatchResult[] = useMemo(() => {
    if (!state.pattern || !state.testText || regexError) return []
    try {
      const re = new RegExp(state.pattern, state.flags)
      const results: MatchResult[] = []
      let m: RegExpExecArray | null
      while ((m = re.exec(state.testText)) !== null) {
        results.push({
          full: m[0],
          groups: m.slice(1),
          index: m.index,
        })
        if (!re.global && !re.sticky) break
        if (m.index === re.lastIndex) re.lastIndex++
      }
      return results
    } catch {
      return []
    }
  }, [state.pattern, state.flags, state.testText, regexError])

  const matchCount = matches.length

  return { state, setPattern, setFlags, setTestText, regexError, matches, matchCount }
}
