import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';

export type SidebarMenuItemProps = React.ComponentProps<'li'> & {
  showRightArrow?: boolean;
};

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  className,
  showRightArrow = false,
  children,
  ...props
}) => {
  const location = useLocation();
  
  // Check if any child Link is active
  const isActive = React.Children.toArray(children).some(child => {
    if (React.isValidElement(child) && child.type === 'a') {
      // Check for React Router Link component
      return (child.props as { to?: string }).to === location.pathname;
    }
    return false;
  });

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(
        'hover:bg-[var(--base-soft-green)] hover:cursor-pointer group/menu-item py-2 px-1 relative font-semibold min-h-[48px]',
        isActive && 'bg-[var(--base-soft-green)] cursor-pointer',
        className
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

export default SidebarMenuItem;
