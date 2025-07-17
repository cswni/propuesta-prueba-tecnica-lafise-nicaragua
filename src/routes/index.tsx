import { Navigate } from 'react-router-dom';
import DashboardPage from '../app/dashboard/index';
import TransactionsPage from "@/app/transactions";
import WorkingProgress from '@/components/WorkingProgress';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/transferir',
    element: <WorkingProgress 
      title="Transferir" 
      description="Próximamente podrás realizar transferencias de forma rápida y segura." 
    />
  },
  {
    path: '/pagar',
    element: <WorkingProgress 
      title="Pagar" 
      description="Estamos desarrollando una plataforma de pagos moderna y eficiente." 
    />
  },
  {
    path: '/transacciones',
    element: <TransactionsPage />
  },
  {
    path: '/gestionar',
    element: <WorkingProgress 
      title="Gestionar"
      description="Herramientas de gestión avanzadas estarán disponibles pronto." 
    />
  },
  {
    path: '/cheques',
    element: <WorkingProgress 
      title="Cheques" 
      description="Sistema de gestión de cheques en desarrollo." 
    />
  },
  {
    path: '/paganet',
    element: <WorkingProgress 
      title="Paganet" 
      description="Integración con Paganet en proceso de desarrollo." 
    />
  },
  {
    path: '/administrar',
    element: <WorkingProgress 
      title="Administrar" 
      description="Panel de administración avanzado en construcción." 
    />
  },
  {
    path: '/ahorro',
    element: <WorkingProgress 
      title="Ahorro Automático" 
      description="Funcionalidades de ahorro automático estarán disponibles próximamente." 
    />
  },
  {
    path: '/configuracion',
    element: <WorkingProgress 
      title="Configuración" 
      description="Panel de configuración personalizada en desarrollo."
    />
  }
];

