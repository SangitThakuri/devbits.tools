import { useCallback } from "react"
import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { useSearchFilter } from "../../hooks/useSearchFilter"
import { tools } from "../../registry/tools"

interface ShellLayoutProps {
  activeToolId: string
  onToolSelect: (id: string) => void
  children: ReactNode
}

export function ShellLayout({ activeToolId, onToolSelect, children }: ShellLayoutProps) {
  const { query, setQuery, filtered } = useSearchFilter(tools)

  const handleSelect = useCallback(
    (id: string) => {
      onToolSelect(id)
      setQuery("")
    },
    [onToolSelect, setQuery],
  )

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={false}
        onToggle={() => {}}
        items={filtered}
        activeId={activeToolId}
        onSelect={handleSelect}
      />
      <div className="flex flex-1 flex-col">
        <TopBar searchQuery={query} onSearchChange={setQuery} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  )
}
