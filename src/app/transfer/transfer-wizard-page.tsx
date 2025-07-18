import { Button } from '@/components/ui/button';
import { Stepper } from './stepper.tsx';
import { useStepper } from './use-stepper.ts';
import type { StepDef } from './use-stepper.ts';
import { StepAccountFrom } from './steps/step-account-from.tsx';
import { StepAccountTo } from './steps/step-account-to.tsx';
import { StepTransferAmount } from './steps/step-transfer-amount.tsx';
import { StepInfoSummary } from './steps/step-info-summary.tsx';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTransactionMutation } from '@/store/services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

// Zod schema for POST /transactions
const transferSchema = z.object({
  cuentaOrigenId: z.string().optional(),
  cuentaDestinoId: z.string().optional(),
  monto: z.string().optional(),
  transactionType: z.string().optional(),
  debitConcept: z.string().optional(),
  creditConcept: z.string().optional(),
  reference: z.string().optional(),
  confirmation: z.string().optional(),
  cuentaOrigenLabel: z.string().optional(),
  cuentaDestinoLabel: z.string().optional(),
  cuentaOrigenBalance: z.string().optional(),
  cuentaOrigenCurrency: z.string().optional(),
});

type TransferFormType = z.infer<typeof transferSchema>;
type StepFieldMap = (keyof TransferFormType)[][];

const stepDefs: StepDef[] = [
  { label: 'Cuenta origen', component: StepAccountFrom },
  { label: 'Cuenta destino', component: StepAccountTo },
  { label: 'Monto a transferir', component: StepTransferAmount },
  { label: 'Datos adicionales', component: StepInfoSummary },
];

// stepFieldMap: For each step, list only the required fields. All other fields are optional.
const stepFieldMap: StepFieldMap = [['cuentaOrigenId'], ['cuentaDestinoId'], ['monto'], []];

export default function TransferWizardPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const methods = useForm<TransferFormType>({
    resolver: zodResolver(transferSchema),
    mode: 'onChange',
    defaultValues: {},
  });
  const { currentStep, isFirstStep, isLastStep, nextStep, prevStep, step, steps } =
    useStepper(stepDefs);
  const StepComponent = step.component;
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const { formState } = methods;

  // Disable continue if any required field for the current step is empty or invalid
  const requiredFields: (keyof TransferFormType)[] = stepFieldMap[currentStep];
  let disableContinue = false;
  const allValues = methods.getValues();
  for (const field of requiredFields) {
    const value = allValues[field];
    if (!value || value.trim() === '') {
      disableContinue = true;
      break;
    }
  }

  async function onStepSubmit(data: TransferFormType) {
    const fields: (keyof TransferFormType)[] = stepFieldMap[currentStep];
    const valid = await methods.trigger(fields);
    if (!valid) return;
    if (!isLastStep) {
      nextStep();
      return;
    }
    // Prepare data for API
    const payload = {
      origin: data.cuentaOrigenId,
      destination: data.cuentaDestinoId,
      amount: {
        currency: 'NIO',
        value: Number(data.monto),
      },
      transactionType: data.transactionType,
      debitConcept: data.debitConcept,
      creditConcept: data.creditConcept,
      reference: data.reference,
      confirmation: data.confirmation,
    };
    try {
      await createTransaction(payload).unwrap();
      methods.reset();
      setShowModal(true);
    } catch (err) {
      console.error('Error creating transaction:', err);
      toast.error('Ocurrió un error al realizar la transferencia.');
    }
  }

  const getError = (field: keyof TransferFormType) => {
    const err = formState.errors[field];
    if (!err) return undefined;
    if (typeof err.message === 'string') return err.message;
    return 'Campo inválido';
  };

  return (
    <div className="p-6 overflow-y-auto max-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transferir</h1>
      <div className="bg-white rounded-sm mb-8 border-2 border-gray-100">
        <Stepper steps={steps} currentStep={currentStep} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onStepSubmit)}>
            <div className="min-h-[400px] p-6">
              <StepComponent
                key={currentStep}
                getError={getError}
                disableContinue={disableContinue}
              />
            </div>
            <div className="flex justify-center gap-4 my-8">
              <Button
                type="button"
                variant="outline"
                className="h-10 px-6 border-2 border-[var(--green)] text-[var(--green)] font-medium text-base bg-white hover:bg-green-50"
                onClick={prevStep}
                disabled={isFirstStep}
              >
                Atrás
              </Button>
              <Button
                type="submit"
                onClick={() => console.log('Submit button clicked')}
                className="h-10 px-6 bg-[var(--green)] text-white font-medium text-base hover:bg-[var(--green)]/90"
                disabled={isLoading || disableContinue}
              >
                {isLastStep ? 'Enviar' : 'Continuar'}
              </Button>
            </div>
          </form>
        </FormProvider>
        {/* Modal de confirmación */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
              <div className="flex flex-col items-center gap-4">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#3B8668" />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-[var(--green)]">¡Transferencia exitosa!</h2>
                <p className="text-gray-700">Tu transferencia ha sido realizada correctamente.</p>
                <button
                  className="mt-4 px-6 py-2 bg-[var(--green)] text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  onClick={() => {
                    setShowModal(false);
                    navigate('/transacciones');
                  }}
                >
                  Ver transacciones
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
