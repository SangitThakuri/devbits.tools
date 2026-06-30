import type { ComponentType, LazyExoticComponent } from "react"

export interface RegistryEntry {
  id: string
  name: string
  description: string
  icon: string
  component: LazyExoticComponent<ComponentType>
}
