import { useState } from 'react';

export interface StepDef {
  label: string;
  component: React.ComponentType<any>;
}

export function useStepper(steps: StepDef[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  function nextStep() {
    setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
  }
  function prevStep() {
    setCurrentStep((s) => (s > 0 ? s - 1 : s));
  }
  function goToStep(idx: number) {
    if (idx >= 0 && idx < steps.length) setCurrentStep(idx);
  }

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    step: steps[currentStep],
    steps,
  };
}
