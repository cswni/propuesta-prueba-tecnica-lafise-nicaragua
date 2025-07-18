import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import UsaFlag from '@/assets/images/flags/usa-flag.svg';
import CopyIcon from '@/assets/images/icons/copy.svg';
import type { RootState } from '@/store';
import type { AccountUI } from '@/types/accounts';

function AccountCard({ alias, accountNumber, balance, flag, currency, id }: AccountUI) {
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast.success('Banco Lafise', {
      description: 'Número de cuenta copiado: ' + accountNumber,
    });
  };

  return (
    <div className="relative rounded-xl shadow-md p-6 bg-white border border-gray-200 flex flex-col justify-between min-h-[160px] sm:max-w-[353px]">
      <div className="absolute top-4 right-4">
        <img src={flag} alt={`${currency} flag`} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="font-bold text-gray-900 text-lg">{alias || `${currency} ${id}`}</div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md">
            {accountNumber}
          </span>
          <button
            onClick={handleCopyAccountNumber}
            className="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
            title="Copiar número de cuenta"
          >
            <img src={CopyIcon} alt="Copiar" className="w-4 h-4" />
          </button>
        </div>
        <div className="font-bold text-gray-900 text-xl">
          {currency} {balance}
        </div>
      </div>
    </div>
  );
}

export function SectionAccounts() {
  const accounts: AccountUI[] = useSelector((state: RootState) => state.user.accounts);

  // If accounts are lower than 3, mock one in USD currency and add to existing accounts array
  let displayAccounts = accounts;
  if (accounts.length < 3) {
    displayAccounts = [
      ...accounts,
      {
        id: 'MOCK-USD-1',
        alias: 'Cuenta Mock USD',
        account_number: 99999999,
        balance: 10000,
        currency: 'USD',
        flag: UsaFlag,
        accountNumber: '99999999',
      },
    ];
  }

  // If no accounts are loaded, show a loading state or empty state
  if (!accounts || accounts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        <div className="rounded-xl shadow-md p-6 bg-white border border-gray-200 flex flex-col justify-center items-center min-h-[160px]">
          <div className="text-gray-500 text-center">
            <div className="text-lg font-semibold mb-2">Cargando cuentas...</div>
            <div className="text-sm">Espera mientras cargamos tu información</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {displayAccounts.map((account: AccountUI) => (
        <AccountCard key={account.id} {...account} />
      ))}
    </div>
  );
}
