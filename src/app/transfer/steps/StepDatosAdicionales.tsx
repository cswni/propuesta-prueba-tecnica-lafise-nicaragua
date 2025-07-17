import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function StepDatosAdicionales({ formData, onChange }: any) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Tipo de transacción</Label>
          <Select value={formData.transactionType || ''} onValueChange={v => onChange({ transactionType: v })}>
            <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
              <SelectValue placeholder="Tipo de transacción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Terceros">Terceros</SelectItem>
              <SelectItem value="Propias">Propias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-normal text-sm">Cuenta</Label>
          <Select value={formData.account || ''} onValueChange={v => onChange({ account: v })}>
            <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
              <div className="flex items-center gap-2 text-base font-bold">
                <span className="text-[var(--green)]">{formData.account || ''}</span>
                <span className="text-black font-normal">{formData.accountNumber || ''}</span>
                <span className="text-black font-normal">{formData.balance || ''}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NIO Cuenta">NIO Cuenta</SelectItem>
              <SelectItem value="Cuenta de Ahorros">Cuenta de Ahorros</SelectItem>
              <SelectItem value="Cuenta Corriente">Cuenta Corriente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-8">
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Concepto de débito</Label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
            value={formData.debitConcept || ''}
            onChange={e => onChange({ debitConcept: e.target.value })}
            placeholder="Concepto de débito"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Concepto de crédito</Label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
            value={formData.creditConcept || ''}
            onChange={e => onChange({ creditConcept: e.target.value })}
            placeholder="Concepto de crédito"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Referencia</Label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
            value={formData.reference || ''}
            onChange={e => onChange({ reference: e.target.value })}
            placeholder="Referencia"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal text-sm">Enviar confirmación a:</Label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
            value={formData.confirmation || ''}
            onChange={e => onChange({ confirmation: e.target.value })}
            placeholder="maria@gmail.com"
          />
        </div>
      </div>
    </>
  );
}
