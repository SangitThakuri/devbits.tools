import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const CHEAT_ITEMS = [
  { pattern: ".", description: "Any character (except newline)" },
  { pattern: "\\d", description: "Digit (0-9)" },
  { pattern: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
  { pattern: "\\s", description: "Whitespace character" },
  { pattern: "^", description: "Start of string" },
  { pattern: "$", description: "End of string" },
  { pattern: "*", description: "Zero or more repetitions" },
  { pattern: "+", description: "One or more repetitions" },
  { pattern: "?", description: "Zero or one repetition" },
  { pattern: "{n,m}", description: "Between n and m repetitions" },
  { pattern: "[abc]", description: "Any character in set" },
  { pattern: "[^abc]", description: "Any character not in set" },
  { pattern: "(x|y)", description: "Alternation (x or y)" },
  { pattern: "(x)", description: "Capturing group" },
  { pattern: "\\b", description: "Word boundary" },
  { pattern: "\\B", description: "Non-word boundary" },
]

export function RegexCheatSheet() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Regex Cheat Sheet
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {CHEAT_ITEMS.map((item) => (
              <div
                key={item.pattern}
                className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <code className="min-w-[56px] rounded bg-gray-100 px-2 py-0.5 text-center font-mono text-sm text-blue-600 dark:bg-gray-700 dark:text-blue-400">
                  {item.pattern}
                </code>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
