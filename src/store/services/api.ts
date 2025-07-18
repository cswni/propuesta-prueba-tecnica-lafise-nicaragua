import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig } from 'axios';
import type { User } from '@/types/user';
import type { AccountApi } from '@/types/accounts';
import type { Transaction, TransactionsApiResponse } from '@/types/transactions';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'get', data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_URL_API }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId) => ({ url: `users/${userId}` }),
    }),
    getAccount: builder.query<AccountApi, string>({
      query: (accountId) => ({ url: `accounts/${accountId}` }),
    }),
    getAccountTransactions: builder.query<TransactionsApiResponse, string>({
      query: (accountId) => ({ url: `accounts/${accountId}/transactions` }),
      providesTags: (_result, _error, accountId) => [{ type: 'Transactions', id: accountId }],
    }),
    createTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: (transaction) => ({
        url: 'transactions',
        method: 'post',
        data: transaction,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Transactions', id: arg.origin }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAccountQuery,
  useGetAccountTransactionsQuery,
  useCreateTransactionMutation,
} = api;
