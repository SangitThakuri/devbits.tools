import { useCallback, useMemo } from "react"
import { Suspense } from "react"
import { ShellLayout } from "./components/layout/ShellLayout"
import { useHash } from "./hooks/useHash"
import { tools } from "./registry/tools"

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Welcome to DevBits
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Select a tool from the sidebar to get started.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={`#${tool.id}`}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {tool.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {tool.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Tool not found
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        <a href="#/" className="text-blue-600 hover:underline dark:text-blue-400">
          Go home
        </a>
      </p>
    </div>
  )
}

export default function App() {
  const [hash, setHash] = useHash()
  const activeId = hash || ""

  const currentTool = useMemo(
    () => tools.find((t) => t.id === activeId),
    [activeId],
  )

  const handleToolSelect = useCallback(
    (id: string) => {
      setHash(id)
    },
    [setHash],
  )

  return (
    <ShellLayout activeToolId={activeId} onToolSelect={handleToolSelect}>
      {!activeId ? (
        <WelcomePage />
      ) : currentTool ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          }
        >
          <currentTool.component />
        </Suspense>
      ) : (
        <NotFound />
      )}
    </ShellLayout>
  )
}
