import { Navigate } from 'react-router-dom';
import DashboardPage from '../app/dashboard/index';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  }
];

