import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppSidebar } from '@/components/ui/layout/app-sidebar';
import MainLayout from '@/components/ui/layout/main-layout';
import { SiteHeader } from '@/components/ui/layout/site-header';
import { Toaster } from '@/components/ui/sonner';
import { SettingsProvider } from '@/providers/settings/settings-provider';
import { SidebarProvider } from '@/providers/sidebar/sidebar-provider';
import { routes } from '@/routes';

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
