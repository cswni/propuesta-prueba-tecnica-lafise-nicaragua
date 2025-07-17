import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  'Cuenta origen',
  'Cuenta destino',
  'Monto a transferir',
  'Datos adicionales',
];

export default function TransferWizardPage() {
  const [step, setStep] = React.useState(3); // Step 2 as in the screenshot
  const [transactionType, setTransactionType] = React.useState('Terceros');
  const [account, setAccount] = React.useState('NIO Cuenta');
  const [accountNumber, setAccountNumber] = React.useState('10424667');
  const [balance, setBalance] = React.useState('C$ 38,456');
  const [debitConcept, setDebitConcept] = React.useState('Cancelación de préstamo');
  const [creditConcept, setCreditConcept] = React.useState('');
  const [reference, setReference] = React.useState('');
  const [confirmation, setConfirmation] = React.useState('');

  // Circle size for stepper
  const circleSize = 26; // px

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transferir</h1>
      <div className="bg-white rounded-sm mb-8 border-2 border-gray-100">
        {/* Stepper */}
        <div className="relative w-full my-8" style={{height: 64}}>
          {/* Connecting line */}
          <div
            className="absolute bg-[var(--green)] h-1 z-0"
            style={{
              top: circleSize / 2,
              left: `calc(12.5% + ${circleSize/2}px)`, // 12.5% is half of first grid col (4 cols)
              right: `calc(12.5% + ${circleSize/2}px)`,
            }}
          />
          <div className="grid grid-cols-4 relative z-10 text-center">
            {steps.map((label, idx) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={
                    idx < step
                      ? "bg-[var(--green)] text-white rounded-full flex items-center justify-center"
                      : idx === step
                        ? "border-2 border-transparent bg-white rounded-full flex items-center justify-center shadow-lg"
                        : "border-2 border-gray-300 bg-white rounded-full flex items-center justify-center"
                  }
                  style={{ width: circleSize, height: circleSize }}
                >
                  {idx < step ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : idx === step ? (
                    <span className="w-3 h-3 bg-[var(--green)] rounded-full block"></span>
                  ) : null}
                </div>
                <span className={`mt-2 text-sm font-medium text-[var(--gray)]`}>Paso {idx + 1}</span>
                <span className={`text-lg font-medium ${idx <= step ? "text-black" : "text-gray-400"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-2 bg-gray-50 p-6 border-y-2">
          <div className="flex flex-col gap-3">
            <Label className="font-normal text-sm">Tipo de transacción</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
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
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="border rounded-sm px-3 py-6 h-10 text-sm bg-white w-full">
            <div className="flex items-center gap-2 text-base font-bold">
              <span className="text-[var(--green)]">{account}</span>
              <span className="text-black font-normal">{accountNumber}</span>
              <span className="text-black font-normal">{balance}</span>
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
              value={debitConcept}
              onChange={e => setDebitConcept(e.target.value)}
              placeholder="Concepto de débito"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-sm">Concepto de crédito</Label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
              value={creditConcept}
              onChange={e => setCreditConcept(e.target.value)}
              placeholder="Concepto de crédito"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-sm">Referencia</Label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
              value={reference}
              onChange={e => setReference(e.target.value)}
              placeholder="Referencia"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-sm">Enviar confirmación a:</Label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green)] text-sm placeholder-gray-400"
              value={confirmation}
              onChange={e => setConfirmation(e.target.value)}
              placeholder="maria@gmail.com"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 my-8">
          <Button variant="outline" className="h-10 px-6 border-2 border-[var(--green)] text-[var(--green)] font-medium text-base bg-white hover:bg-green-50">Atrás</Button>
          <Button className="h-10 px-6 bg-[var(--green)] text-white font-medium text-base hover:bg-[var(--green)]/90">Continuar</Button>
        </div>
      </div>
    </div>
  );
} 
