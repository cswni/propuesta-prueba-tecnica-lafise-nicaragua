import TransferWizardPage from '@/app/transfer/transfer-wizard-page.tsx';
import DashboardPage from '@/app/dashboard/index.tsx';
import TransactionsPage from '@/app/transactions/index.tsx';
import { Error404Page } from '@/app/error-404-page.tsx';


export const routes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/transferir', element: <TransferWizardPage /> },
  { path: '/transacciones', element: <TransactionsPage /> },
  // Fallback 404 route
  { path: '*', element: <Error404Page /> },
];
