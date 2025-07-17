import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useFormContext, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function StepMontoTransferir({ getError }: { getError?: (field: string) => string | undefined }) {
  const { control, watch, setError, clearErrors } = useFormContext();
  const monto = watch('monto') || '';
  const cuentaOrigenBalance = Number(watch('cuentaOrigenBalance') || 0);
  const cuentaOrigenCurrency = watch('cuentaOrigenCurrency') || 'NIO';
  const cuentaOrigenLabel = watch('cuentaOrigenLabel') || '-';
  const cuentaDestinoLabel = watch('cuentaDestinoLabel') || '-';
  const error = getError ? getError('monto') : undefined;

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
      setError('monto', { type: 'manual', message: `El monto excede el saldo disponible (${cuentaOrigenCurrency} ${cuentaOrigenBalance})` });
      toast.error('El monto excede el saldo disponible de la cuenta de origen.');
    } else {
      clearErrors('monto');
    }
  }, [monto, cuentaOrigenBalance, cuentaOrigenCurrency, setError, clearErrors]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
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
          <div className="font-bold text-base text-[var(--green)]">{cuentaOrigenLabel}</div>
          <div className="text-black font-normal text-sm mt-2 mb-1">Cuenta destino:</div>
          <div className="font-bold text-base text-[var(--green)]">{cuentaDestinoLabel}</div>
        </div>
      </div>
    </div>
  );
} 
