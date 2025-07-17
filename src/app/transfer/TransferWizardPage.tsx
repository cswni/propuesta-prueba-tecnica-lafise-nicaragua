import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Stepper } from './Stepper';
import { useStepper } from './useStepper';
import type { StepDef } from './useStepper';
import { StepCuentaOrigen } from './steps/StepCuentaOrigen';
import { StepCuentaDestino } from './steps/StepCuentaDestino';
import { StepMontoTransferir } from './steps/StepMontoTransferir';
import { StepDatosAdicionales } from './steps/StepDatosAdicionales';

const stepDefs: StepDef[] = [
  { label: 'Cuenta origen', component: StepCuentaOrigen },
  { label: 'Cuenta destino', component: StepCuentaDestino },
  { label: 'Monto a transferir', component: StepMontoTransferir },
  { label: 'Datos adicionales', component: StepDatosAdicionales },
];

export default function TransferWizardPage() {
  const [formData, setFormData] = React.useState<any>({});
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    step,
    steps,
  } = useStepper(stepDefs);

  const StepComponent = step.component;

  function handleChange(newData: any) {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      // Submit logic here
      alert('Formulario enviado: ' + JSON.stringify(formData, null, 2));
    } else {
      nextStep();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transferir</h1>
      <div className="bg-white rounded-sm mb-8 border-2 border-gray-100">
        <Stepper steps={steps} currentStep={currentStep} />
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <StepComponent formData={formData} onChange={handleChange} />
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
              className="h-10 px-6 bg-[var(--green)] text-white font-medium text-base hover:bg-[var(--green)]/90"
            >
              {isLastStep ? 'Enviar' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 
