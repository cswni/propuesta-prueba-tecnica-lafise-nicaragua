import React from 'react';

interface StepperProps {
  steps: { label: string }[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const circleSize = 26;
  return (
    <div className="relative w-full my-8" style={{ height: 64 }}>
      {/* Connecting line */}
      <div
        className="absolute bg-[var(--green)] h-1 z-0"
        style={{
          top: circleSize / 2,
          left: `calc(12.5% + ${circleSize / 2}px)`,
          right: `calc(12.5% + ${circleSize / 2}px)`,
        }}
      />
      <div className="grid grid-cols-4 relative z-10 text-center">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex flex-col items-center">
            <div
              className={
                idx < currentStep
                  ? "bg-[var(--green)] text-white rounded-full flex items-center justify-center"
                  : idx === currentStep
                  ? "border-2 border-transparent bg-white rounded-full flex items-center justify-center shadow-lg"
                  : "border-2 border-gray-300 bg-white rounded-full flex items-center justify-center"
              }
              style={{ width: circleSize, height: circleSize }}
            >
              {idx < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : idx === currentStep ? (
                <span className="w-3 h-3 bg-[var(--green)] rounded-full block"></span>
              ) : null}
            </div>
            <span className={`mt-2 text-sm font-medium text-[var(--gray)]`}>Paso {idx + 1}</span>
            <span className={`text-lg font-medium ${idx <= currentStep ? "text-black" : "text-gray-400"}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 