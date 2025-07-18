export interface TransactionAmount {
  currency: string;
  value: number;
}

export interface Transaction {
  transaction_number: string;
  description: string;
  bank_description: string;
  transaction_type: string;
  amount: TransactionAmount;
  origin: string;
  destination: string;
  transaction_date: string;
}

export interface TransactionsApiResponse {
  page: number;
  size: number;
  next: number;
  total_count: number;
  items: Transaction[];
}

export interface RecentTransactionsProps {
    accountId: string;
  }