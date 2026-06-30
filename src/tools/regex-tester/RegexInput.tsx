interface RegexInputProps {
  pattern: string
  flags: string
  testText: string
  onPatternChange: (value: string) => void
  onFlagsChange: (value: string) => void
  onTestTextChange: (value: string) => void
  regexError: string | null
}

export function RegexInput({
  pattern,
  flags,
  testText,
  onPatternChange,
  onFlagsChange,
  onTestTextChange,
  regexError,
}: RegexInputProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Regular Expression
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-gray-400">
              /
            </span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => onPatternChange(e.target.value)}
              placeholder="[a-z]+"
              className={`w-full rounded-lg border py-2 pl-7 pr-3 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 dark:text-gray-100 dark:placeholder:text-gray-500 ${
                regexError
                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100 dark:border-red-700 dark:bg-red-950 dark:focus:border-red-500 dark:focus:ring-red-900"
                  : "border-gray-200 bg-white focus:border-blue-400 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-500 dark:focus:ring-blue-900"
              }`}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm text-gray-400">
              /
            </span>
          </div>
          <input
            type="text"
            value={flags}
            onChange={(e) => onFlagsChange(e.target.value.replace(/[^gimsuyd]/g, ""))}
            placeholder="gim"
            className="w-16 rounded-lg border border-gray-200 bg-white py-2 text-center font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900"
          />
        </div>
        {regexError && (
          <p className="mt-1.5 font-mono text-xs text-red-500">{regexError}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Test Text
        </label>
        <textarea
          value={testText}
          onChange={(e) => onTestTextChange(e.target.value)}
          placeholder="Enter text to test against..."
          rows={6}
          className="w-full resize-y rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900"
        />
      </div>
    </div>
  )
}
