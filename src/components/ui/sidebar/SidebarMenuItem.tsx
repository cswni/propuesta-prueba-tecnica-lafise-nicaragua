import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

export type SidebarMenuItemProps = React.ComponentProps<'li'> & {
  showRightArrow?: boolean;
};

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  className,
  showRightArrow = false,
  ...props
}) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    className={cn('hover:bg-[var(--base-soft-green)] hover:cursor-pointer group/menu-item py-2 px-1 relative font-semibold min-h-[48px]', className)}
    {...props}
  >
      {props.children}
    {showRightArrow && (
      <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
    )}
  </li>
);

export default SidebarMenuItem;
