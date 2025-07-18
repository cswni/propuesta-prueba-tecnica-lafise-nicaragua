import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { setUserAccounts } from '@/store';
import { useGetAccountQuery } from '@/store/services/api.ts';
import type { AccountUI } from '@/types/accounts';
import type { User } from '@/types/user';
import NicaraguaFlag from '@/assets/images/flags/nicaragua-flag.svg';
import UsaFlag from '@/assets/images/flags/usa-flag.svg';

const flagByCurrency: Record<string, string> = {
  NIO: NicaraguaFlag,
  USD: UsaFlag,
};

const AccountFetcher = ({ id, onData }: { id: string; onData: (data: AccountUI) => void }) => {
  const { data } = useGetAccountQuery(id);
  useEffect(() => {
    if (data) {
      onData({
        id,
        alias: data.alias,
        account_number: data.account_number,
        balance: data.balance,
        currency: data.currency,
        flag: flagByCurrency[data.currency] || NicaraguaFlag,
        accountNumber: String(data.account_number),
      });
    }
  }, [data, id, onData]);
  return null;
};

const AccountsLoader = () => {
  const dispatch = useDispatch();
  const user: User | null = useSelector(
    (state: { user: { data: User | null } }) => state.user.data
  );

  const accountIds: string[] = useMemo(
    () => (user?.products || []).filter((p) => p.type === 'Account').map((p) => p.id as string),
    [user]
  );

  const [loadedAccounts, setLoadedAccounts] = useState<{ [id: string]: AccountUI }>({});

  const onData = (account: AccountUI) => {
    setLoadedAccounts((prev) => {
      if (prev[account.id]) return prev;
      const updated = { ...prev, [account.id]: account };
      if (Object.keys(updated).length === accountIds.length) {
        const accountsArray = Object.values(updated);
        dispatch(setUserAccounts(accountsArray));
      }
      return updated;
    });
  };

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
