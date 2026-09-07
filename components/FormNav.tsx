"use client";

interface FormNavProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
  backLabel?: string;
  nextLabel?: string;
  skipLabel?: string;
  nextDisabled?: boolean;
  hideBack?: boolean;
  hideNext?: boolean;
}

// One reusable footer bar for every step of the wizard, so the
// back/next behavior and styling never drifts between screens.
// onSkip is for the always-optional sections (internship, projects,
// certifications) — it lets the user move on without adding an entry.
export default function FormNav({
  onBack,
  onNext,
  onSkip,
  backLabel = "Back",
  nextLabel = "Continue",
  skipLabel = "Skip this section",
  nextDisabled = false,
  hideBack = false,
  hideNext = false,
}: FormNavProps) {
  if (hideBack && hideNext) return null;

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
      {!hideBack ? (
        <button type="button" className="btn btn-outline-ink px-4" onClick={onBack}>
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <div className="d-flex align-items-center gap-3">
        {onSkip && (
          <button type="button" className="btn btn-link text-secondary p-0" onClick={onSkip}>
            {skipLabel}
          </button>
        )}
        {!hideNext && (
          <button
            type="button"
            className="btn btn-ink px-4"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
