"use client";

import Image from "next/image";
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
            <Image
              src="/logo.jpg"
              alt="ResumeForge PH"
              width={40}
              height={40}
              className="rounded"
            />

            <span className="fw-semibold">RESUME FORGE PH</span>
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

      <footer className="border-top bg-white py-4 mt-5">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-md-6 text-center text-md-start">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <Image
                  src="/logo.jpg"
                  alt="ResumeForge PH"
                  width={32}
                  height={32}
                  className="rounded"
                />

                <span className="fw-semibold">RESUME FORGE PH</span>
              </div>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <small className="text-secondary">
                © {new Date().getFullYear()} Resume Forge PH. All rights
                reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
