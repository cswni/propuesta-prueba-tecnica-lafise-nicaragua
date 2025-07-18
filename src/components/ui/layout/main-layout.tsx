import * as React from 'react';

import { cn } from '@/lib/utils';
import { useSettings } from '@/providers/settings/use-settings';
import { useSidebar } from '@/providers/sidebar/use-sidebar';

const MainLayout = ({ className, children, ...props }: React.ComponentProps<'main'>) => {
  const { isFullWidth } = useSettings();
  const { state } = useSidebar();
  const isSidebarCollapsed = state === 'collapsed';

  const [sidebar, ...content] = React.Children.toArray(children);

  return (
    <div
      className="transition-all duration-500 ease-in-out relative h-screen overflow-hidden"
      style={{
        width: isFullWidth ? '100vw' : '1440px',
        margin: isFullWidth ? '0' : '0 auto',
        transformOrigin: 'left top',
      }}
    >
      {/* Sidebar positioned absolutely to stay in place */}
      <div className="absolute left-0 top-0 z-10 h-full">{sidebar}</div>

      <main
        data-slot="sidebar-inset"
        className={cn(
          'bg-background relative flex flex-1 flex-row h-full pb-10',
          'w-full',
          className
        )}
        {...props}
      >
        {/* Spacer for sidebar width - only on desktop and when sidebar is expanded */}
        <div
          className="flex-shrink-0 hidden md:block transition-all duration-200 ease-linear"
          style={{
            width: isSidebarCollapsed ? '0' : 'var(--sidebar-width, 16rem)',
            overflow: 'hidden',
          }}
        ></div>
        <div className="flex-1 flex flex-col min-w-0">{content}</div>
      </main>
    </div>
  );
};
export default MainLayout;
