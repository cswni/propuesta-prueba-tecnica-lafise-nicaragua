import * as React from 'react';

// Assets
import LogoLafise from '@/assets/images/logo-lafise.svg'
import Tablero from '@/assets/images/sidebar/tablero.svg'
import Transferir from '@/assets/images/sidebar/transferir.svg'
import Pagar from '@/assets/images/sidebar/pagar.svg'
import Mistransacciones from '@/assets/images/sidebar/mistransacciones.svg'
import Gestionar from '@/assets/images/sidebar/gestionar.svg'
import Cheque from '@/assets/images/sidebar/cheque.svg'
import Administrar from '@/assets/images/sidebar/administrar.svg'
import Paganet from '@/assets/images/sidebar/paganet.svg'
import Ahorro from '@/assets/images/sidebar/ahorro.svg'
import Configuracion from '@/assets/images/sidebar/configuracion.svg'

import { type Icon,} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar/sidebar.tsx';
import {Link} from "react-router-dom";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.tsx";
import { Toggle } from '@/components/ui/toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import {useSettings} from "@/providers/settings/use-settings.ts";

type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: string;
    icon?: Icon;
    svg?: string;
  }[]
};

const data: SidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Tablero',
      url: '#',
      svg: Tablero
    },
    {
      title: 'Transferir',
      url: '#',
      svg: Transferir
    },
    {
      title: 'Pagar',
      url: '#',
      svg: Pagar
    },
    {
      title: 'Mis transacciones',
      url: '#',
      svg: Mistransacciones,
    },
    {
      title: 'Gestionar',
      url: '#',
      svg: Gestionar,
    },
    {
      title: 'Cheques',
      url: '#',
      svg: Cheque,
    },
    {
      title: 'Paganet',
      url: '#',
      svg: Paganet,
    },
    {
      title: 'Administrar',
      url: '#',
      svg: Administrar,
    },
    {
      title: 'Ahorro automático',
      url: '#',
      svg: Ahorro,
    },
    {
      title: 'Configuración',
      url: '#',
      svg: Configuracion,
    },
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isFullWidth, toggleFullWidth } = useSettings();
  const isMobile = useIsMobile();
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="#">
              <img
                  className="w-auto mx-auto"
                  src={LogoLafise}
                  alt="Logo Lafise"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* Toggle for full width mode, only if not mobile */}
      {!isMobile && (
        <div className="flex items-center justify-center py-2 border-t">
          <Toggle
            pressed={isFullWidth}
            onPressedChange={toggleFullWidth}
            aria-label={isFullWidth ? 'Set to Squared' : 'Set to Full Width'}
          >
            {isFullWidth ? 'Cuadrado' : 'Ancho completo'}
          </Toggle>
        </div>
      )}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
