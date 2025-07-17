import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transaction {
  id: number;
  fecha: string;
  descripcion: string;
  debitoUSD: number;
  balanceUSD: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transacciones recientes</h3>
        <Link
          to="/transacciones"
          className="text-sm text-muted-foreground hover:underline"
        >
          Ver todas
        </Link>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-medium">Fecha</TableHead>
              <TableHead className="text-sm font-medium">Descripción</TableHead>
              <TableHead className="text-sm font-medium">Débito USD</TableHead>
              <TableHead className="text-sm font-medium">Balance USD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-sm">{transaction.fecha}</TableCell>
                <TableCell className="text-sm">{transaction.descripcion}</TableCell>
                <TableCell className="text-sm">{transaction.debitoUSD.toFixed(2)}</TableCell>
                <TableCell className="text-sm">{transaction.balanceUSD.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 