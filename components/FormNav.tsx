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

  const handleBack = () => {
    onBack?.();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    onNext?.();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSkip = () => {
    onSkip?.();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
      {!hideBack ? (
        <button
          type="button"
          className="btn btn-outline-ink px-4"
          onClick={handleBack}
        >
          {backLabel}{" "}
        </button>
      ) : (
        <span />
      )}
      ```
      <div className="d-flex align-items-center gap-3">
        {onSkip && (
          <button
            type="button"
            className="btn btn-link text-secondary p-0"
            onClick={handleSkip}
          >
            {skipLabel}
          </button>
        )}

        {!hideNext && (
          <button
            type="button"
            className="btn btn-ink px-4"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
