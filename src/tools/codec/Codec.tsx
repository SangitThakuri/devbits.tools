import { useCodec } from "./useCodec"
import { CodecInput } from "./CodecInput"
import { CodecOutput } from "./CodecOutput"

export default function Codec() {
  const { state, handleInputChange, setType, setMode } = useCodec()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Base64 & URL Encoder / Decoder
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Instantly encode or decode Base64 and URL-encoded strings.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setType("base64")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              state.type === "base64"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            Base64
          </button>
          <button
            type="button"
            onClick={() => setType("url")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              state.type === "url"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            URL
          </button>
        </div>

        <div className="flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              state.mode === "encode"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              state.mode === "decode"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CodecInput
          value={state.input}
          onChange={handleInputChange}
          placeholder={
            state.mode === "encode"
              ? state.type === "base64"
                ? "Enter text to Base64 encode..."
                : "Enter text to URL encode..."
              : state.type === "base64"
                ? "Enter Base64 to decode..."
                : "Enter URL-encoded string to decode..."
          }
        />
        <CodecOutput value={state.output} />
      </div>
    </div>
  )
}
