import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { setUserAccounts } from "@/store";
import { useGetAccountQuery } from "@/store/services/api.ts";
import { store } from '@/store';

const AccountFetcher = ({ id, onData }: { id: string, onData: (data: any) => void }) => {
  const { data } = useGetAccountQuery(id);
  useEffect(() => {
    if (data) {
      console.log('[AccountFetcher] Loaded data for', id, data);
      onData({
        id, // Always use the id prop as the unique key
        currency: data.currency,
        balance: data.balance,
        alias: data.alias,
      });
    }
  }, [data, id, onData]);
  return null;
};

const AccountsLoader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);

  // Memoize accountIds so the array is stable
  const accountIds = useMemo(
    () => (user?.products || []).filter((p: any) => p.type === 'Account').map((p: any): string => p.id as string),
    [user]
  );

  const [loadedAccounts, setLoadedAccounts] = useState<{ [id: string]: any }>({});

  const onData = (account: any) => {
    console.log('[AccountsLoader] onData called for', account.id, account);
    setLoadedAccounts(prev => {
      if (prev[account.id]) return prev; // Prevent infinite loop
      const updated = { ...prev, [account.id]: account };
      if (Object.keys(updated).length === accountIds.length) {
        // Deep clone to avoid storing Proxy/draft objects
        const accountsArray = Object.values(updated).map(acc => JSON.parse(JSON.stringify(acc)));
        console.log('[AccountsLoader] About to dispatch accounts:', accountsArray);
        dispatch(setUserAccounts(accountsArray));
        setTimeout(() => {
          console.log('[AccountsLoader] Redux after dispatch:', store.getState().user.accounts);
        }, 100);
      }
      return updated;
    });
  };

  // Reset loadedAccounts if accountIds change
  useEffect(() => {
    setLoadedAccounts({});
  }, [accountIds]);

  if (!user || !user.products) return null;

  // Minimal test button to dispatch a test account
  const testDispatch = () => {
    dispatch(setUserAccounts([{id: 'test', currency: 'NIO', balance: 100, alias: 'Test'}]));
    setTimeout(() => {
      console.log('[AccountsLoader] Redux after manual test dispatch:', store.getState().user.accounts);
    }, 100);
  };

  return (
    <>
      <button onClick={testDispatch} style={{margin: 8, padding: 8, background: '#eee'}}>Test Manual Dispatch</button>
      {accountIds.map((id: string) => (
        <AccountFetcher key={id} id={id} onData={onData} />
      ))}
    </>
  );
};

export default AccountsLoader;
