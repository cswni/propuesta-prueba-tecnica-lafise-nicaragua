import { TransactionsList } from '@/app/transactions/transaction-list';
import HeadingLine from '@/components/ui/heading-line';
const TransactionsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <HeadingLine text={'Mis transacciones'} />
          <TransactionsList />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
