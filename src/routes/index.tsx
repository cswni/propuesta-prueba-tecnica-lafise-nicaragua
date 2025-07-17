import { Navigate } from 'react-router-dom';
import DashboardPage from '../app/dashboard/index';
import TransactionsPage from "@/app/transactions";

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
    path: '/transacciones',
    element: <TransactionsPage />
  }
];

