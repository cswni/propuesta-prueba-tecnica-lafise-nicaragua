import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useFormContext, Controller } from 'react-hook-form';

export function StepDatosAdicionales({ getError }: { getError?: (field: string) => string | undefined }) {
  const { register, watch, setValue, control } = useFormContext();
  const formData = watch();

  return (
    <>
      {/* Summary of previous selections */}
      <div className="mb-6 p-4 bg-white border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="font-normal text-xs text-gray-500">Cuenta origen</Label>
          <div className="font-bold text-base text-[var(--green)]">{formData.cuentaOrigenLabel || '-'}</div>
        </div>
        <div>
          <Label className="font-normal text-xs text-gray-500">Cuenta destino</Label>
          <div className="font-bold text-base text-[var(--green)]">{formData.cuentaDestinoLabel || '-'}</div>
        </div>
        <div>
          <Label className="font-normal text-xs text-gray-500">Monto</Label>
          <div className="font-bold text-base text-[var(--green)]">{formData.monto || '-'}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Tipo de transacción</Label>
          <Controller
            name="transactionType"
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
                  <SelectValue placeholder="Tipo de transacción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Terceros">Terceros</SelectItem>
                  <SelectItem value="Propias">Propias</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {getError && getError('transactionType') && <span className="text-red-600 text-xs mt-1">{getError('transactionType')}</span>}
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Cuenta</Label>
          <Input
            value={formData.cuentaOrigenLabel || ''}
            disabled
            className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-8">
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Concepto de débito</Label>
          <Input
            {...register('debitConcept')}
            placeholder="Concepto de débito"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400"
          />
          {getError && getError('debitConcept') && <span className="text-red-600 text-xs mt-1">{getError('debitConcept')}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Concepto de crédito</Label>
          <Input
            {...register('creditConcept')}
            placeholder="Concepto de crédito"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400"
          />
          {getError && getError('creditConcept') && <span className="text-red-600 text-xs mt-1">{getError('creditConcept')}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Referencia</Label>
          <Input
            {...register('reference')}
            placeholder="Referencia"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400"
          />
          {getError && getError('reference') && <span className="text-red-600 text-xs mt-1">{getError('reference')}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Enviar confirmación a:</Label>
          <Input
            {...register('confirmation')}
            placeholder="maria@gmail.com"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400"
          />
          {getError && getError('confirmation') && <span className="text-red-600 text-xs mt-1">{getError('confirmation')}</span>}
        </div>
      </div>
    </>
  );
}
