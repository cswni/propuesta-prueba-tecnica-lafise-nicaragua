import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store';
import { useGetUserQuery } from '@/store/services/api';

const UserLoader = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetUserQuery(import.meta.env.VITE_USER_ID_MOCK);
  // Use a ref to ensure setUser is only dispatched once
  const hasDispatched = useRef(false);

  useEffect(() => {
    if (user && !hasDispatched.current) {
      dispatch(setUser(user));
      hasDispatched.current = true;
    }
  }, [user, dispatch]);

  return null;
};

export default UserLoader;
