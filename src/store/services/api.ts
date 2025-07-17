import { createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { AxiosRequestConfig } from 'axios'

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<{
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  }, unknown, unknown> =>
  async ({ url, method = 'get', data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5566/' }),
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (userId) => ({ url: `users/${userId}` }),
    }),
    getAccount: builder.query<any, string>({
      query: (accountId) => ({ url: `accounts/${accountId}` }),
    }),
    getAccountTransactions: builder.query<any, string>({
      query: (accountId) => ({ url: `accounts/${accountId}/transactions` }),
    }),
    createTransaction: builder.mutation<any, any>({
      query: (transaction) => ({
        url: 'transactions',
        method: 'post',
        data: transaction,
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetAccountQuery,
  useGetAccountTransactionsQuery,
  useCreateTransactionMutation,
} = api 
