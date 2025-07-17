import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';

export type SidebarMenuItemProps = React.ComponentProps<'li'> & {
  showRightArrow?: boolean;
  avoidActive?: boolean;
};

const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const {className, showRightArrow = false, avoidActive = false, children, ...rest  } = props;
  const location = useLocation();
  
  // Verificar la ruta activa
  const isActive = React.Children.toArray(children).some(child => {
    if (React.isValidElement(child) && 'to' in (child.props as any)) {
      return (child.props as any).to === location.pathname;
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
        className
      )}
      {...rest}
    >
      {children}
      {showRightArrow && (
        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
      )}
    </li>
  );
};

export default SidebarMenuItem;
