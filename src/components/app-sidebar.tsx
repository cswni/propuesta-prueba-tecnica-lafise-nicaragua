import * as React from 'react';

// Assets
import LogoLafise from '@/assets/images/logo-lafise.svg';
import Tablero from '@/assets/images/sidebar/tablero.svg';
import Transferir from '@/assets/images/sidebar/transferir.svg';
import Pagar from '@/assets/images/sidebar/pagar.svg';
import Mistransacciones from '@/assets/images/sidebar/mistransacciones.svg';
import Gestionar from '@/assets/images/sidebar/gestionar.svg';
import Cheque from '@/assets/images/sidebar/cheque.svg';
import Administrar from '@/assets/images/sidebar/administrar.svg';
import Paganet from '@/assets/images/sidebar/paganet.svg';
import Ahorro from '@/assets/images/sidebar/ahorro.svg';
import Configuracion from '@/assets/images/sidebar/configuracion.svg';

import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar/sidebar.tsx';
import { Link } from 'react-router-dom';
import { SidebarMenuItem } from '@/components/ui/sidebar/sidebar-menu-item.tsx';
import { Toggle } from '@/components/ui/toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/providers/settings/use-settings.ts';
import { ExchangeRate } from '@/components/ui/sidebar/exchange-rate.tsx';
import { ServerInfo } from '@/components/ui/sidebar/server-info.tsx';
import type { LucideIcon } from 'lucide-react';

type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: string;
    icon?: LucideIcon;
    svg?: string;
  }[];
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
      url: '/dashboard',
      svg: Tablero,
    },
    {
      title: 'Transferir',
      url: '/transferir',
      svg: Transferir,
    },
    {
      title: 'Pagar',
      url: '/pagar',
      svg: Pagar,
    },
    {
      title: 'Mis transacciones',
      url: '/transacciones',
      svg: Mistransacciones,
    },
    {
      title: 'Gestionar',
      url: '/gestionar',
      svg: Gestionar,
    },
    {
      title: 'Cheques',
      url: '/cheques',
      svg: Cheque,
    },
    {
      title: 'Paganet',
      url: '/paganet',
      svg: Paganet,
    },
    {
      title: 'Administrar',
      url: '/administrar',
      svg: Administrar,
    },
    {
      title: 'Ahorro automático',
      url: '/ahorro',
      svg: Ahorro,
    },
    {
      title: 'Configuración',
      url: '/configuracion',
      svg: Configuracion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isFullWidth, toggleFullWidth } = useSettings();
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem avoidActive>
            <Link to="/dashboard">
              <img className="w-auto mx-auto" src={LogoLafise} alt="Logo Lafise" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-4 p-1 border-t">
          <ExchangeRate />
          <ServerInfo />
        </div>
        {/* Esto es una implementacion para que la vista considere las dimensiones del archivo en Figma */}
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
      </SidebarFooter>
    </Sidebar>
  );
}
