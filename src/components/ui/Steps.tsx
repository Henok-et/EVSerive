import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`relative ${
              index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            }`}
          >
            <div className="flex items-center">
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.number < currentStep
                    ? 'bg-emerald-600'
                    : step.number === currentStep
                    ? 'border-2 border-emerald-600 bg-white'
                    : 'border-2 border-gray-300 bg-white'
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <span
                    className={`text-sm ${
                      step.number === currentStep
                        ? 'text-emerald-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.number}
                  </span>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 h-0.5 w-full ${
                    step.number < currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium">{step.title}</span>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}