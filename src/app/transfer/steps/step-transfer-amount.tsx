import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RootState } from '@/store';
import { useGetAccountQuery } from '@/store/services/api';
import type { AccountUI } from '@/types/accounts';

export function StepTransferAmount({
  getError,
}: {
  getError?: (field: string) => string | undefined;
}) {
  const { control, watch, setError, clearErrors } = useFormContext();
  const monto = watch('monto') || '';
  const cuentaOrigenId = watch('cuentaOrigenId') || '';
  const cuentaDestinoId = watch('cuentaDestinoId') || '';
  const error = getError ? getError('monto') : undefined;

  // Redux fallback
  const accounts: AccountUI[] = useSelector((state: RootState) => state.user.accounts);

  // API queries
  const { data: origenData } = useGetAccountQuery(cuentaOrigenId, { skip: !cuentaOrigenId });
  const { data: destinoData } = useGetAccountQuery(cuentaDestinoId, { skip: !cuentaDestinoId });

  // Use API or fallback to redux for balance/currency
  const cuentaOrigenCurrency =
    origenData?.currency ||
    accounts.find((a: AccountUI) => a.id === cuentaOrigenId)?.currency ||
    'NIO';
  const cuentaOrigenBalance =
    origenData?.balance ?? accounts.find((a: AccountUI) => a.id === cuentaOrigenId)?.balance ?? 0;
  const cuentaDestinoCurrency =
    destinoData?.currency ||
    accounts.find((a: AccountUI) => a.id === cuentaDestinoId)?.currency ||
    'NIO';

  const placeholder = `Ingrese el monto (Max: ${cuentaOrigenCurrency} ${cuentaOrigenBalance})`;

  useEffect(() => {
    if (!monto) {
      clearErrors('monto');
      return;
    }
    const value = Number(monto);
    if (value < 0) {
      setError('monto', { type: 'manual', message: `El monto no puede ser negativo.` });
      toast.error('Por favor, ingrese un monto válido. No se permiten valores negativos.');
    } else if (value > cuentaOrigenBalance) {
      setError('monto', {
        type: 'manual',
        message: `El monto excede el saldo disponible (${cuentaOrigenCurrency} ${cuentaOrigenBalance})`,
      });
      toast.error('El monto excede el saldo disponible de la cuenta de origen.');
    } else {
      clearErrors('monto');
    }
  }, [monto, cuentaOrigenBalance, cuentaOrigenCurrency, setError, clearErrors]);

  return (
    <div className="grid  -m-6 grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
      <div className="flex flex-col gap-3">
        <Label className="font-normal text-sm">Monto a transferir</Label>
        <Controller
          name="monto"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              min={0}
              step="0.01"
              value={field.value || ''}
              onChange={field.onChange}
              placeholder={placeholder}
              className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full"
            />
          )}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>
      <div className="flex flex-col gap-3">
        <Label className="font-normal text-sm">Resumen</Label>
        <div className="p-4 bg-white border rounded-md">
          <div className="text-black font-normal text-sm mb-1">Cuenta origen:</div>
          <div className="font-bold text-base text-[var(--green)]">
            {cuentaOrigenId ? `${cuentaOrigenCurrency} ${cuentaOrigenId}` : '-'}
          </div>
          <div className="text-black font-normal text-sm mt-2 mb-1">Cuenta destino:</div>
          <div className="font-bold text-base text-[var(--green)]">
            {cuentaDestinoId ? `${cuentaDestinoCurrency} ${cuentaDestinoId}` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}
