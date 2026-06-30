import { SearchBar } from "./SearchBar"
import { ThemeToggle } from "./ThemeToggle"

interface TopBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      <ThemeToggle />
    </header>
  )
}
