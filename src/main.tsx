import './index.css';
import App from './App.tsx';
import { Provider, useDispatch } from 'react-redux'
import { store } from './store'
import { useGetUserQuery } from './store/services/api'
import { setUser } from './store'
import { useEffect } from 'react'

function UserLoader() {
  const dispatch = useDispatch()
  const { data } = useGetUserQuery('1134948394')
  useEffect(() => {
    if (data) dispatch(setUser(data))
  }, [data, dispatch])
  return null
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserLoader />
      <App />
    </Provider>
  </StrictMode>
);
