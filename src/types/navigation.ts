export interface NavLinkItem {
  name: string
  url: string
  icon: string
  description?: string
}

export interface NavCategory {
  id: string
  title: string
  icon?: string
  links: NavLinkItem[]
}
