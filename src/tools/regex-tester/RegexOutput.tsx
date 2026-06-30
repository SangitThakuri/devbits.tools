import { useMemo } from "react"
import type { MatchResult } from "./types"

interface RegexOutputProps {
  testText: string
  pattern: string
  flags: string
  matches: MatchResult[]
  matchCount: number
  regexError: string | null
}

export function RegexOutput({
  testText,
  pattern,
  flags,
  matches,
  matchCount,
  regexError,
}: RegexOutputProps) {
  const highlighted = useMemo(() => {
    if (!testText || !pattern || regexError) {
      return <span className="text-gray-900 dark:text-gray-100">{testText}</span>
    }
    try {
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let m: RegExpExecArray | null
      let key = 0

      const globalRe = new RegExp(pattern, flags.includes("g") ? flags : flags + "g")
      while ((m = globalRe.exec(testText)) !== null) {
        if (m.index > lastIndex) {
          parts.push(
            <span key={key++} className="text-gray-900 dark:text-gray-100">
              {testText.slice(lastIndex, m.index)}
            </span>,
          )
        }
        parts.push(
          <mark
            key={key++}
            className="rounded bg-yellow-200 text-gray-900 dark:bg-yellow-700 dark:text-gray-100"
          >
            {m[0]}
          </mark>,
        )
        lastIndex = m.index + m[0].length
        if (!globalRe.global) break
        if (m.index === globalRe.lastIndex) globalRe.lastIndex++
      }
      if (lastIndex < testText.length) {
        parts.push(
          <span key={key++} className="text-gray-900 dark:text-gray-100">
            {testText.slice(lastIndex)}
          </span>,
        )
      }
      return parts.length > 0 ? parts : (
        <span className="text-gray-900 dark:text-gray-100">{testText}</span>
      )
    } catch {
      return <span className="text-gray-900 dark:text-gray-100">{testText}</span>
    }
  }, [testText, pattern, flags, regexError])

  if (!testText) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 p-8 dark:border-gray-700">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Enter test text to see matches highlighted
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Matches
        </label>
        {!regexError && pattern && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {matchCount} match{matchCount !== 1 ? "es" : ""}
          </span>
        )}
      </div>
      <div className="min-h-[120px] overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm leading-relaxed dark:border-gray-700 dark:bg-gray-800">
        {highlighted}
      </div>

      {matches.length > 0 && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-1.5 pr-4 font-medium text-gray-500 dark:text-gray-400">#</th>
                <th className="py-1.5 pr-4 font-medium text-gray-500 dark:text-gray-400">Match</th>
                <th className="py-1.5 pr-4 font-medium text-gray-500 dark:text-gray-400">Index</th>
                {matches[0]?.groups.length ? (
                  <th className="py-1.5 font-medium text-gray-500 dark:text-gray-400">Groups</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {matches.map((m, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 font-mono dark:border-gray-800"
                >
                  <td className="py-1.5 pr-4 text-gray-400">{i + 1}</td>
                  <td className="py-1.5 pr-4 text-gray-900 dark:text-gray-100">{m.full}</td>
                  <td className="py-1.5 pr-4 text-gray-500">{m.index}</td>
                  {m.groups.length ? (
                    <td className="py-1.5 text-gray-500">{m.groups.join(", ")}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
