"use client";

import { WizardStep, STEP_LABELS } from "@/types/resume";

interface StepIndicatorProps {
  steps: WizardStep[];
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

// Fully reusable: pass any subset/order of steps (the wizard already
// filters out "experience-entries" when it's not needed) and it just works.
export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="step-rail" role="list" aria-label="Resume builder progress">
      {steps.map((step, idx) => {
        const isDone = idx < currentIndex;
        const isCurrent = step === currentStep;
        return (
          <div className="step-rail-item" key={step} role="listitem">
            {idx > 0 && <div className="step-connector" />}
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2"
              onClick={() => onStepClick?.(step)}
              disabled={!onStepClick || idx > currentIndex}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={`step-node ${isDone ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`}
              >
                {isDone ? "✓" : idx + 1}
              </span>
              <span className={`step-label d-none d-md-inline ${isCurrent ? "is-current" : ""}`}>
                {STEP_LABELS[step]}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
