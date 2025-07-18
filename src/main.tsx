import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AccountsLoader from '@/app/dashboard/components/accounts-loader.tsx';
import UserLoader from '@/app/dashboard/components/user-loader.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserLoader />
      <AccountsLoader />
      <App />
    </Provider>
  </StrictMode>
);
