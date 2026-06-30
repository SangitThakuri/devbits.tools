import { ChevronLeft, ChevronRight, Code2 } from "lucide-react"
import type { RegistryEntry } from "../../registry/types"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  items: RegistryEntry[]
  activeId: string
  onSelect: (id: string) => void
}

export function Sidebar({ collapsed, onToggle, items, activeId, onSelect }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
        <Code2 className="h-6 w-6 shrink-0 text-blue-600" />
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            DevBits
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {items.map((tool) => {
          const isActive = tool.id === activeId
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelect(tool.id)}
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Code2 className="h-4 w-4" />
              </span>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{tool.name}</div>
                  <div className="truncate text-xs text-gray-400 dark:text-gray-500">
                    {tool.description}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="border-t border-gray-200 p-2 dark:border-gray-800">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
