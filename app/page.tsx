"use client";

import { useResume } from "@/context/ResumeContext";
import StepIndicator from "@/components/StepIndicator";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ExperienceQuestion from "@/components/forms/ExperienceQuestion";
import ExperienceForm from "@/components/forms/ExperienceForm";
import InternshipForm from "@/components/forms/InternshipForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import CertificationsForm from "@/components/forms/CertificationsForm";
import PreviewStep from "@/components/forms/PreviewStep";
import { WizardStep } from "@/types/resume";

// Maps each step id to the component that renders it. Adding a new step
// later is just: add it to types/resume.ts's WizardStep + ALL_STEPS, then
// add one line here.
const STEP_COMPONENTS: Record<WizardStep, React.ComponentType> = {
  "personal-info": PersonalInfoForm,
  "experience-question": ExperienceQuestion,
  "experience-entries": ExperienceForm,
  internship: InternshipForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  preview: PreviewStep,
};

export default function Home() {
  const { currentStep, visibleSteps, goToStep } = useResume();
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="app-shell">
      <header className="app-header py-3">
        <div className="container">
          <div className="d-flex align-items-center gap-2">
            <span className="brand-mark">RB</span>
            <span className="brand-name">ATS Resume Builder</span>
          </div>
        </div>
      </header>

      <main className="container py-4 py-md-5 flex-grow-1">
        <div className="mb-4">
          <StepIndicator
            steps={visibleSteps}
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        </div>

        <StepComponent />
      </main>

      <footer className="app-footer">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="brand-mark">RB</span>
              <span className="fw-semibold">ATS Resume Builder</span>
            </div>

            <span className="text-secondary small">
              © {new Date().getFullYear()} ATS Resume Builder. All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
