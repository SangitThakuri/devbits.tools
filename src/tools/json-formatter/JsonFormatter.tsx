import { useJsonFormatter } from "./useJsonFormatter"
import { JsonInput } from "./JsonInput"
import { JsonOutput } from "./JsonOutput"

export default function JsonFormatter() {
  const { state, handleInputChange, handleFormat } = useJsonFormatter()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          JSON Formatter & Validator
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Paste, format, and validate your JSON instantly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <JsonInput
          value={state.input}
          onChange={handleInputChange}
          onFormat={handleFormat}
        />
        <JsonOutput formatted={state.formatted} error={state.error} />
      </div>
    </div>
  )
}
