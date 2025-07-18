import { z } from 'zod';

export const TransactionsSchema = z.object({
  id: z.number(),
  fecha: z.string(),
  descripcion: z.string(),
  debitoUSD: z.number(),
  balanceUSD: z.number(),
});
