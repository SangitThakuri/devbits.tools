import { CopyButton } from "../../components/ui/CopyButton"

interface CodecOutputProps {
  value: string
}

export function CodecOutput({ value }: CodecOutputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
        <CopyButton text={value} />
      </div>
      <textarea
        value={value}
        readOnly
        rows={8}
        placeholder="Result will appear here..."
        className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
      />
    </div>
  )
}
