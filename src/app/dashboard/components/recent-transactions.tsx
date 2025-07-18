import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAccountTransactionsQuery } from '@/store/services/api';
import type { RecentTransactionsProps, TransactionsApiResponse } from '@/types/transactions';

export function RecentTransactions({ accountId }: RecentTransactionsProps) {
  const { data, isLoading, isError } = useGetAccountTransactionsQuery(accountId) as {
    data?: TransactionsApiResponse;
    isLoading: boolean;
    isError: boolean;
  };
  const recentTransactions = data?.items?.slice(0, 3) || [];

  function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-NI', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  function formatAmount(amount: { currency: string; value: number }) {
    if (!amount) return '-';
    return `${amount.currency} ${amount.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  return (
    <div className="space-y-4 p-4 md:p-6 rounded-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transacciones recientes</h3>
        <Link to="/transacciones" className="text-sm text-muted-foreground hover:underline">
          Ver todas
        </Link>
      </div>
      <div className="rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-medium">Fecha</TableHead>
              <TableHead className="text-sm font-medium">Descripción</TableHead>
              <TableHead className="text-sm font-medium">Monto</TableHead>
              <TableHead className="text-sm font-medium">N° Transacción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                  Error al cargar transacciones
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && recentTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay transacciones recientes
                </TableCell>
              </TableRow>
            )}
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.transaction_number}>
                <TableCell className="text-sm">
                  {formatDate(transaction.transaction_date)}
                </TableCell>
                <TableCell className="text-sm">{transaction.description}</TableCell>
                <TableCell className="text-sm">{formatAmount(transaction.amount)}</TableCell>
                <TableCell className="text-sm">{transaction.transaction_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
