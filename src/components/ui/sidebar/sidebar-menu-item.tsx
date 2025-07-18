import ChevronRight from 'lucide-react/icons/chevron-right';
import React, { type FC } from 'react';
import { useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

export type SidebarMenuItemProps = React.ComponentProps<'li'> & {
  showRightArrow?: boolean;
  avoidActive?: boolean;
};

export const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  showRightArrow = false,
  avoidActive = false,
  ...props
}) => {
  const location = useLocation();

  // Verificar la ruta activa
  const isActive = React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child) && 'to' in (child.props as { to: string })) {
      return (child.props as { to: string }).to === location.pathname;
    }
    return false;
  });

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(
        'hover:bg-[var(--base-soft-green)] hover:cursor-pointer group/menu-item py-2 px-1 relative font-semibold min-h-[48px]',
        isActive && !avoidActive && 'bg-[var(--base-soft-green)]',
        props.className
      )}
      {...props}
    >
      {children}
      {showRightArrow && (
        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
      )}
    </li>
  );
};
