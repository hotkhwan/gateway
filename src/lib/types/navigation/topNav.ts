// src/lib/types/navigation/topNav.ts
export interface TopNavMenu {
    url?: string
    text: string
    icon?: string
    action?: string
    highlight?: boolean
    children?: TopNavMenu[]
}
