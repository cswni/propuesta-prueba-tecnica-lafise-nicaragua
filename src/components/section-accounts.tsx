import { toast } from "sonner"
import NicaraguaFlag from '@/assets/images/flags/nicaragua-flag.svg'
import UsaFlag from '@/assets/images/flags/usa-flag.svg'
import CopyIcon from '@/assets/images/icons/copy.svg'
import { useSelector } from 'react-redux'

const flagByCurrency: Record<string, string> = {
  NIO: NicaraguaFlag,
  USD: UsaFlag,
}

function AccountCard({
  alias,
  accountNumber,
  balance,
  flag: FlagIcon,
  currency,
  id
}: {
  alias?: string
  accountNumber: string
  balance: string | number
  flag: string
  currency: string
  id: string | number
}) {
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber)
    toast.success("Banco Lafise", {
      description: "Número de cuenta copiado: " + accountNumber,
    })
  }

  return (
    <div className="relative rounded-xl shadow-md p-6 bg-white border border-gray-200 flex flex-col justify-between min-h-[160px] sm:max-w-[353px]">
      {/* Flag in top right corner */}
      <div className="absolute top-4 right-4">
        <img
          src={FlagIcon}
          alt={`${currency} flag`}
          className="w-12 h-12 rounded-full"
        />
      </div>
      {/* Card content */}
      <div className="flex flex-col justify-between h-full gap-4">
        {/* Alias or fallback title */}
        <div className="font-bold text-gray-900 text-lg">
          {alias || `${currency} ${id}`}
        </div>
        {/* Account number */}
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md">
            {accountNumber}
          </span>
          <button
            onClick={handleCopyAccountNumber}
            className="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
            title="Copiar número de cuenta"
          >
            <img
              src={CopyIcon}
              alt="Copiar"
              className="w-4 h-4"
            />
          </button>
        </div>
        {/* Balance */}
        <div className="font-bold text-gray-900 text-xl">
          {currency} {balance}
        </div>
      </div>
    </div>
  )
}

export function SectionAccounts() {
  const userSlice = useSelector((state: any) => state.user);
  const accounts = userSlice.accounts || [];

  console.log('SectionAccounts Redux:', userSlice);

  console.log(accounts)

  // Add a third mocked account if less than 3 (optional, for demo)
  let displayAccounts = accounts;
  if (accounts.length < 3) {
    displayAccounts = [
      ...accounts,
      {
        id: 'MOCKED-123456',
        alias: 'Cuenta Mock',
        accountNumber: 'MOCKED-123456',
        balance: '5,000',
        flag: UsaFlag,
        currency: 'USD',
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {displayAccounts.map((account: any) => (
        <AccountCard
          key={account.id}
          alias={account.alias}
          accountNumber={account.id?.toString()}
          balance={account.balance}
          flag={flagByCurrency[account.currency] || NicaraguaFlag}
          currency={account.currency}
          id={account.id}
        />
      ))}
    </div>
  );
} 
