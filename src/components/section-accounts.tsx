import { toast } from "sonner"
import NicaraguaFlag from '@/assets/images/flags/nicaragua-flag.svg'
import UsaFlag from '@/assets/images/flags/usa-flag.svg'
import CopyIcon from '@/assets/images/icons/copy.svg'

const accounts = [
  {
    title: "NIO Cuenta",
    accountNumber: "10424667",
    balance: "C$ 38,456",
    flag: NicaraguaFlag,
    currency: "NIO"
  },
  {
    title: "USD Cuenta",
    accountNumber: "10239849",
    balance: "USD 22,380",
    flag: UsaFlag,
    currency: "USD"
  },
  {
    title: "USD Cuenta",
    accountNumber: "10635657",
    balance: "USD 12,400",
    flag: UsaFlag,
    currency: "USD"
  }
]

function AccountCard({
  title,
  accountNumber,
  balance,
  flag: FlagIcon,
  currency
}: {
  title: string
  accountNumber: string
  balance: string
  flag: string
  currency: string
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
        {/* Title */}
        <div className="font-bold text-gray-900 text-lg">
          {title}
        </div>
        
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
          {balance}
        </div>
      </div>
    </div>
  )
}

export function SectionAccounts() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {accounts.map((account, idx) => (
        <AccountCard key={idx} {...account} />
      ))}
    </div>
  )
} 
