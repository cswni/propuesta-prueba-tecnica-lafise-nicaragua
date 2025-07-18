import DashboardPage from '@/app/dashboard/index';
import { Error404Page } from '@/app/error-404-page';
import TransactionsPage from '@/app/transactions/index';
import TransferWizardPage from '@/app/transfer/transfer-wizard-page';


export const routes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/transferir', element: <TransferWizardPage /> },
  { path: '/transacciones', element: <TransactionsPage /> },
  // Fallback 404 route
  { path: '*', element: <Error404Page /> },
];
