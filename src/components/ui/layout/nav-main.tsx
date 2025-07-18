import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar/sidebar';
import { SidebarMenuItem } from '@/components/ui/sidebar/sidebar-menu-item';
import { useSidebar } from '@/providers/sidebar/use-sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    svg?: string;
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();

  const handleMenuClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.url === location.pathname;
            return (
              <SidebarMenuItem showRightArrow key={item.title}>
                <Link to={item.url} className="w-full block" onClick={handleMenuClick}>
                  <SidebarMenuButton tooltip={item.title} className="w-full" isActive={isActive}>
                    {item.icon && (
                      <item.icon className={isActive ? 'text-[#3B8668]' : 'text-black'} />
                    )}
                    {item.svg && (
                      <img
                        src={item.svg}
                        alt={item.title}
                        style={{
                          filter: isActive
                            ? 'invert(38%) sepia(77%) saturate(363%) hue-rotate(110deg) brightness(92%) contrast(92%)'
                            : 'none',
                        }}
                      />
                    )}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
