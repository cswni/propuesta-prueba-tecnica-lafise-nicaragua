import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import AccountsLoader from '@/app/dashboard/components/accounts-loader';
import UserLoader from '@/app/dashboard/components/user-loader';

import App from './App';
import { store } from './store';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserLoader />
      <AccountsLoader />
      <App />
    </Provider>
  </StrictMode>
);
