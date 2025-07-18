import { RecentTransactions } from '@/app/dashboard/components/recent-transactions';
import { SectionAccounts } from '@/app/dashboard/components/section-accounts';
import { SectionCards } from '@/app/dashboard/components/section-cards';
import HeadingLine from '@/components/ui/heading-line';

const DashboardPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <HeadingLine text={'Mis tarjetas'} />
          <SectionCards />
          <HeadingLine text={'Cuentas'} />
          <SectionAccounts />
          <RecentTransactions accountId={import.meta.env.VITE_USER_ID_MOCK} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
