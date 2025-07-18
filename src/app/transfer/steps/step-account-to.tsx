import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { AccountUI } from '@/types/accounts';
import { useFormContext, Controller } from 'react-hook-form';
import { useGetAccountQuery } from '@/store/services/api';
import { useEffect } from 'react';

export function StepAccountTo({ getError }: { getError?: (field: string) => string | undefined }) {
  const accounts: AccountUI[] = useSelector((state: RootState) => state.user.accounts);
  const { control, watch, setValue } = useFormContext();
  const cuentaDestinoId = watch('cuentaDestinoId') || '';
  const cuentaDestinoLabel = watch('cuentaDestinoLabel') || '';
  const cuentaDestinoBalance = watch('cuentaDestinoBalance') || '';
  const cuentaOrigenId = watch('cuentaOrigenId') || '';
  const error = getError ? getError('cuentaDestinoId') : undefined;

  // Fetch account details from API when cuentaDestinoId changes
  const { data: accountData } = useGetAccountQuery(cuentaDestinoId, { skip: !cuentaDestinoId });

  useEffect(() => {
    if (accountData) {
      setValue('cuentaDestinoBalance', accountData.balance?.toString() || '');
      setValue('cuentaDestinoLabel', `${accountData.currency || 'NIO'} ${accountData.id}`);
    } else if (cuentaDestinoId) {
      // fallback to redux data if API not available
      const acc = accounts.find((a: AccountUI) => a.id === cuentaDestinoId);
      setValue('cuentaDestinoLabel', acc?.alias || '');
      setValue('cuentaDestinoBalance', acc?.balance || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData, cuentaDestinoId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start -m-6 mt-2 bg-gray-50 p-6 border-y-2">
      <div className="flex flex-col gap-3">
        <Label className="font-normal text-sm">Selecciona la cuenta destino</Label>
        <Controller
          name="cuentaDestinoId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || ''}
              onValueChange={v => {
                field.onChange(v);
                field.onBlur();
              }}
            >
              <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
                <SelectValue placeholder="Cuenta destino" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc: AccountUI) => (
                  <SelectItem key={acc.id} value={String(acc.id)} disabled={acc.id === cuentaOrigenId}>
                    <div className="flex flex-col justify-start items-start gap-1">
                      <span className="text-base font-bold text-[var(--green)]">{acc.alias}</span>
                      <span className="text-black font-normal text-xs">{`${acc.id} - ${acc.balance}`}</span>
                      {acc.id === cuentaOrigenId && (
                        <span className="text-xs text-red-400">No puedes seleccionar la misma cuenta de origen</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>
      {cuentaDestinoId && (accountData || cuentaDestinoLabel) && (
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Detalle de la cuenta</Label>
          <div className="p-4 bg-white border rounded-md">
            <div className="font-bold text-base text-[var(--green)]">{cuentaDestinoLabel}</div>
            <div className="text-black font-normal">Saldo: {accountData ? `${accountData.currency || 'NIO'} ${accountData.balance}` : cuentaDestinoBalance}</div>
          </div>
        </div>
      )}
    </div>
  );
} 
