import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar/sidebar.tsx"
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    svg?: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem showRightArrow key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon className={'text-[#3B8668]'} />}
                {item.svg && <img src={item.svg} alt={item.title} />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
