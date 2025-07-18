import { useState } from 'react';
import type React from 'react';

export type StepDef = {
  label: string;
  component: React.ComponentType<{
    getError?: (field: string) => string | undefined;
    disableContinue?: boolean;
  }>;
};

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
