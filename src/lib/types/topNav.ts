// src/lib/types/topNav.ts
export interface TopNavMenu {
    url?: string
    text: string
    icon?: string
    action?: string
    highlight?: boolean
    children?: TopNavMenu[]
}
