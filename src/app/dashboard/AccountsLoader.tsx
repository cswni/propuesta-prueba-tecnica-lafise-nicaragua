import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { setUserAccounts } from "@/store";
import { useGetAccountQuery } from "@/store/services/api.ts";

const AccountFetcher = ({ id, onData }: { id: string, onData: (data: any) => void }) => {
  const { data } = useGetAccountQuery(id);
  useEffect(() => {
    if (data) {
      onData({
        id,
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

  const accountIds = useMemo(
    () => (user?.products || []).filter((p: any) => p.type === 'Account').map((p: any): string => p.id as string),
    [user]
  );

  const [loadedAccounts, setLoadedAccounts] = useState<{ [id: string]: any }>({});

  const onData = (account: any) => {
    setLoadedAccounts(prev => {
      if (prev[account.id]) return prev;
      const updated = { ...prev, [account.id]: account };
      if (Object.keys(updated).length === accountIds.length) {
        const accountsArray = Object.values(updated).map(acc => JSON.parse(JSON.stringify(acc)));
        dispatch(setUserAccounts(accountsArray));
      }
      return updated;
    });
  };

  // Reset loadedAccounts if accountIds change
  useEffect(() => {
    setLoadedAccounts({});
  }, [accountIds]);

  if (!user || !user.products) return null;

  return (
    <>
      {accountIds.map((id: string) => (
        <AccountFetcher key={id} id={id} onData={onData} />
      ))}
    </>
  );
};

export default AccountsLoader;
