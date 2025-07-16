import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar/sidebar.tsx"
import { Bell, Search as SearchIcon } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          {/* Icono de notificaciones */}
          <Button variant="ghost" size="icon" aria-label="Notificaciones">
            <Bell />
          </Button>
          {/* Búsqueda */}
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar"
              className="pl-8 rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* User avatar */}
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
