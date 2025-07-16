import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar/sidebar.tsx";
import { routes } from './routes/index';
import { AppSidebar } from '@/components/app-sidebar';
import MainLayout from '@/components/ui/layout/MainLayout';
import {SiteHeader} from "@/components/site-header.tsx";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppSidebar variant="inset" />
        <MainLayout>
          <SiteHeader />
          <Routes>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
