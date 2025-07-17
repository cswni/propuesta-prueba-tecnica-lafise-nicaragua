import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSelector } from 'react-redux';
import { useFormContext, Controller } from 'react-hook-form';

export function StepCuentaOrigen({ getError }: { getError?: (field: string) => string | undefined }) {
  const user = useSelector((state: any) => state.user.data);
  const accounts = (user?.products || [])
    .filter((p: any) => p.type === 'Account')
    .map((p: any) => ({
      id: p.id,
      label: `${p.currency || 'NIO'} ${p.id}`,
      number: p.id,
      balance: p.balance ? `${p.currency || 'NIO'} ${p.balance}` : 'C$ 10,000', // fallback for mock
    }));

  const { control, watch, setValue, getValues } = useFormContext();
  const cuentaOrigenId = watch('cuentaOrigenId') || '';
  const cuentaOrigenLabel = watch('cuentaOrigenLabel') || '';
  const cuentaOrigenBalance = watch('cuentaOrigenBalance') || 'C$ 10,000';
  const error = getError ? getError('cuentaOrigenId') : undefined;

  console.log('Watch', getValues() );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
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
                const acc = accounts.find((a: any) => a.id === v);
                setValue('cuentaOrigenLabel', acc?.label || '');
                setValue('cuentaOrigenBalance', acc?.balance || 'C$ 10,000');
                field.onBlur(); // <-- This is the key!
              }}
            >
              <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
                <SelectValue placeholder="Cuenta de origen" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc: any) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-[var(--green)]">{acc.label}</span>
                      <span className="text-black font-normal text-xs">{acc.balance}</span>
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
