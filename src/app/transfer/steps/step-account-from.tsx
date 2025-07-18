import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { AccountUI } from '@/types/accounts';
import { useFormContext, Controller } from 'react-hook-form';
import {useGetAccountQuery} from "@/store/services/api.ts";
import {useEffect} from "react";

export function StepAccountFrom({ getError }: { getError?: (field: string) => string | undefined }) {
  const accounts: AccountUI[] = useSelector((state: RootState) => state.user.accounts);

  const { control, watch, setValue } = useFormContext();
  const cuentaOrigenId = watch('cuentaOrigenId') || '';
  const cuentaOrigenLabel = watch('cuentaOrigenLabel') || '';
  const cuentaOrigenBalance = watch('cuentaOrigenBalance') || 'C$ 10,000';
  const error = getError ? getError('cuentaOrigenId') : undefined;

  // Fetch account details when cuentaOrigenId changes
  const { data: accountData } = useGetAccountQuery(cuentaOrigenId, { skip: !cuentaOrigenId });

  useEffect(() => {
    if (accountData) {
      setValue('cuentaOrigenBalance', accountData.balance?.toString() || '0');
      setValue('cuentaOrigenCurrency', accountData.currency || 'NIO');
    }
  }, [accountData, setValue]);

  return (
    <div className="grid  -m-6 grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
      <div className="flex flex-col gap-3">
        <Label className="font-normal text-sm">Selecciona la cuenta de origen</Label>
        <Controller
          name="cuentaOrigenId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || ''}
              onValueChange={v => {
                field.onChange(v);
                const acc = accounts.find((a: AccountUI) => a.id === v);
                setValue('cuentaOrigenLabel', acc?.alias || '');
                field.onBlur();
              }}
            >
              <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
                <SelectValue placeholder="Cuenta de origen" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc: AccountUI) => (
                  <SelectItem key={acc.id} value={String(acc.id)}>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-[var(--green)]">{`${acc.alias} - ${acc.id}`}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>
      {cuentaOrigenId && (
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Detalle de la cuenta</Label>
          <div className="p-4 bg-white border rounded-md">
            <div className="font-bold text-base text-[var(--green)]">{cuentaOrigenLabel}</div>
            <div className="text-black font-normal">Saldo: {cuentaOrigenBalance}</div>
          </div>
        </div>
      )}
    </div>
  );
} 
