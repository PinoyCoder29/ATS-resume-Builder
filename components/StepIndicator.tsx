"use client";

import { WizardStep, STEP_LABELS } from "@/types/resume";

interface StepIndicatorProps {
  steps: WizardStep[];
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="step-rail" role="list" aria-label="Resume builder progress">
      {steps.map((step, idx) => {
        const isCurrent = step === currentStep;

        return (
          <div className="step-rail-item" key={step} role="listitem">
            {idx > 0 && <div className="step-connector" />}

            <button
              type="button"
              className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2"
              onClick={() => onStepClick?.(step)}
              disabled={!onStepClick}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Go to Step ${idx + 1}: ${STEP_LABELS[step]}`}
            >
              <span className={`step-node ${isCurrent ? "is-current" : ""}`}>
                {idx + 1}
              </span>

              <span
                className={`step-label d-none d-md-inline ${
                  isCurrent ? "is-current" : ""
                }`}
              >
                {STEP_LABELS[step]}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
