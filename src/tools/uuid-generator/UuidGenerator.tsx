import { useState, useCallback } from "react"
import { Helmet } from "react-helmet-async"
import { RefreshCw, Clipboard, Check } from "lucide-react"
import { CopyButton } from "../../components/ui/CopyButton"
import { ToolSeoSection } from "../../components/ui/ToolSeoSection"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const QUANTITIES = [1, 5, 10, 50, 100] as const
type Quantity = (typeof QUANTITIES)[number]

function buildUUID(uppercase: boolean, braces: boolean): string {
  const raw: string = crypto.randomUUID()
  let uuid = uppercase ? raw.toUpperCase() : raw
  if (braces) uuid = `{${uuid}}`
  return uuid
}

function reformat(raw: string, uppercase: boolean, braces: boolean): string {
  const stripped = raw.replace(/^\{/, "").replace(/\}$/, "")
  let result = uppercase ? stripped.toUpperCase() : stripped.toLowerCase()
  if (braces) result = `{${result}}`
  return result
}

export default function UuidGenerator() {
  const [quantity, setQuantity] = useState<Quantity>(5)
  const [uppercase, setUppercase] = useState(false)
  const [braces, setBraces] = useState(false)
  const [uuids, setUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => buildUUID(false, false)),
  )
  const { copy: copyAll, copied: copiedAll } = useCopyToClipboard()

  const regenerate = useCallback(
    (q = quantity, uc = uppercase, br = braces) => {
      setUuids(Array.from({ length: q }, () => buildUUID(uc, br)))
    },
    [quantity, uppercase, braces],
  )

  const handleQuantity = (q: Quantity) => {
    setQuantity(q)
    setUuids(Array.from({ length: q }, () => buildUUID(uppercase, braces)))
  }

  const handleUppercase = (val: boolean) => {
    setUppercase(val)
    setUuids((prev) => prev.map((u) => reformat(u, val, braces)))
  }

  const handleBraces = (val: boolean) => {
    setBraces(val)
    setUuids((prev) => prev.map((u) => reformat(u, uppercase, val)))
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Helmet>
        <title>Bulk UUID / GUID Generator Online | DevBits</title>
        <meta
          name="description"
          content="Generate secure, random Version 4 UUIDs and GUIDs in bulk. Customize formatting with uppercase toggles or braces."
        />
      </Helmet>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          UUID / GUID Generator
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Generate cryptographically secure random Version 4 UUIDs instantly.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
          {QUANTITIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleQuantity(q)}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                quantity === q
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleUppercase(!uppercase)}
          className={`cursor-pointer rounded-lg border px-4 py-1.5 text-sm font-medium font-mono transition-colors ${
            uppercase
              ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          UPPERCASE
        </button>

        <button
          type="button"
          onClick={() => handleBraces(!braces)}
          className={`cursor-pointer rounded-lg border px-4 py-1.5 text-sm font-medium font-mono transition-colors ${
            braces
              ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {"{ }"} braces
        </button>

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => regenerate()}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>

          <button
            type="button"
            onClick={() => copyAll(uuids.join("\n"))}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              copiedAll
                ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-400"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {copiedAll ? (
              <Check className="h-4 w-4" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
            {copiedAll ? "Copied!" : "Copy All"}
          </button>
        </div>
      </div>

      {/* UUID list */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-2.5 last:border-0 dark:border-gray-700"
          >
            <span className="flex-1 select-all font-mono text-sm text-gray-800 dark:text-gray-200">
              {uuid}
            </span>
            <CopyButton text={uuid} />
          </div>
        ))}
      </div>

      <ToolSeoSection
        steps={[
          "Select the quantity (1, 5, 10, 50, or 100) using the pill selector.",
          "Toggle UPPERCASE to switch between lowercase and uppercase hex characters.",
          'Toggle "{ } braces" to wrap each UUID in curly braces — the standard Microsoft GUID format.',
          'Click "Regenerate" for a fresh batch, or "Copy All" to copy every UUID at once, one per line.',
        ]}
        faqs={[
          {
            q: "What is a UUID / GUID?",
            a: "A UUID (Universally Unique Identifier) is a 128-bit label standardized by RFC 4122. A GUID (Globally Unique Identifier) is Microsoft's name for the same concept. Version 4 UUIDs are randomly generated.",
          },
          {
            q: "Are these UUIDs cryptographically secure?",
            a: "Yes. This tool uses the browser's built-in crypto.randomUUID() API, which relies on a CSPRNG (cryptographically secure pseudo-random number generator). They are suitable for database primary keys, session tokens, and identifiers.",
          },
          {
            q: "Is any data sent to a server?",
            a: "No. All generation happens entirely in your browser. No UUIDs or any other data leave your machine.",
          },
          {
            q: "Can the same UUID be generated twice?",
            a: "The probability of a collision between two UUID v4s is approximately 1 in 5.3×10³⁶. For all practical purposes, each UUID generated is globally unique.",
          },
        ]}
      />
    </div>
  )
}
