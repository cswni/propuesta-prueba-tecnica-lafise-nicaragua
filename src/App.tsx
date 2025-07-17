import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';
import { AppSidebar } from '@/components/app-sidebar';
import MainLayout from '@/components/ui/layout/main-layout.tsx';
import {SiteHeader} from "@/components/site-header.tsx";
import { SettingsProvider } from '@/providers/settings/settings-provider.tsx';
import {SidebarProvider} from "@/providers/sidebar/sidebar-provider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
  return (
    <SettingsProvider>
      <SidebarProvider>
        <BrowserRouter>
          <MainLayout>
            <AppSidebar />
            <SiteHeader />
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.element} />
              ))}
            </Routes>
            <Toaster />
          </MainLayout>
        </BrowserRouter>
      </SidebarProvider>
    </SettingsProvider>
  );
}

export default App;
