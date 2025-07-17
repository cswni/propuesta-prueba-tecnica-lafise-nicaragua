import { SectionCards } from '@/components/section-cards';
import { SectionAccounts } from '@/components/section-accounts';
import HeadingLine from "@/components/ui/heading-line.tsx";
import { RecentTransactions } from '@/components/recent-transactions';

const DashboardPage = () => {
  return (
      <div className="flex flex-1 flex-col h-full overflow-y-auto">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <HeadingLine text={'Mis tarjetas'}  />
                <SectionCards />
              <HeadingLine text={'Cuentas'}  />
                <SectionAccounts />
              <RecentTransactions accountId={import.meta.env.VITE_USER_ID_MOCK} />
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
