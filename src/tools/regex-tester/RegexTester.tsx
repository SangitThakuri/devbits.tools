import { useRegexTester } from "./useRegexTester"
import { RegexInput } from "./RegexInput"
import { RegexOutput } from "./RegexOutput"
import { RegexCheatSheet } from "./RegexCheatSheet"

export default function RegexTester() {
  const {
    state,
    setPattern,
    setFlags,
    setTestText,
    regexError,
    matches,
    matchCount,
  } = useRegexTester()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Regex Tester
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Test regular expressions with real-time match highlighting.
        </p>
      </div>

      <div className="mb-6">
        <RegexCheatSheet />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegexInput
          pattern={state.pattern}
          flags={state.flags}
          testText={state.testText}
          onPatternChange={setPattern}
          onFlagsChange={setFlags}
          onTestTextChange={setTestText}
          regexError={regexError}
        />
        <RegexOutput
          testText={state.testText}
          pattern={state.pattern}
          flags={state.flags}
          matches={matches}
          matchCount={matchCount}
          regexError={regexError}
        />
      </div>
    </div>
  )
}
