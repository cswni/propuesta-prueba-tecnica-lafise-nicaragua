import {cn} from "@/lib/utils.ts";
import * as React from "react";

const MainLayout = ({ className, ...props }: React.ComponentProps<'main'>) => {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                'bg-background relative flex w-full flex-1 flex-col',
                'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
                className
            )}
            {...props}
        />
    );
}
export default MainLayout;
