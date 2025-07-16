import {cn} from "@/lib/utils.ts";
import * as React from "react";
import { useSettings } from '@/providers/settings/SettingsProvider.tsx';

const MainLayout = ({ className, children, ...props }: React.ComponentProps<'main'>) => {
    const { isFullWidth } = useSettings();
    // Expect children: [<AppSidebar />, ...content]
    const [sidebar, ...content] = React.Children.toArray(children);
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                'bg-background relative flex flex-1 flex-row',
                isFullWidth ? 'w-screen max-w-none' : 'w-full max-w-[1440px] mx-auto',
                'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
                className
            )}
            {...props}
        >
            {sidebar}
            <div className="flex-1 flex flex-col min-w-0">
                {content}
            </div>
        </main>
    );
}
export default MainLayout;
