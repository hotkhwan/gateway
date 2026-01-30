export type SidebarChild = {
    id: string
    text: string
    url?: string
    action?: string
    children?: SidebarChild[]
}

export type SidebarMenuHeader = {
    kind: 'header'
    id: string
    text: string
}

export type SidebarMenuDivider = {
    kind: 'divider'
    id: string
}

export type SidebarMenuLink = {
    kind: 'link'
    id: string
    text: string
    icon?: string
    url?: string
    highlight?: boolean
    children?: SidebarChild[]
}

export type SidebarMenu = SidebarMenuHeader | SidebarMenuDivider | SidebarMenuLink
