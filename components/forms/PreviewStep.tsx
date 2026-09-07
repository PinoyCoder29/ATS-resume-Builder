"use client";

import { useResume } from "@/context/ResumeContext";
import ResumePreview from "@/components/resume/ResumePreview";
import DownloadPdfButton from "@/components/resume/DownloadPdfButton";
import FormNav from "@/components/FormNav";

interface ChecklistItem {
  label: string;
  passed: boolean;
}

export default function PreviewStep() {
  const { data, goBack, resetAll } = useResume();

  const checklist: ChecklistItem[] = [
    {
      label: "Full name and contact information are provided",
      passed: !!data.personalInfo.fullName && !!data.personalInfo.email,
    },
    {
      label: "Professional summary is provided",
      passed: data.personalInfo.summary.trim().length > 10,
    },
    {
      label:
        data.hasExperience === "no"
          ? "No work experience added yet (that's okay, this section was skipped)"
          : "At least one work experience entry is provided",
      passed: data.hasExperience === "no" || data.experience.length > 0,
    },
    {
      label: "At least one education entry is provided",
      passed: data.education.length > 0,
    },
    {
      label: "At least 5 skills are provided",
      passed: data.skills.length >= 5,
    },
  ];

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="panel">
          <h2 className="panel-title">Preview & Download</h2>

          <p className="panel-subtitle">
            Review your resume before downloading. This layout uses plain text
            without tables or columns, making it highly compatible with ATS
            (Applicant Tracking System) software.
          </p>

          <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
            {checklist.map((item) => (
              <li key={item.label} className="d-flex align-items-start gap-2">
                <span
                  className={item.passed ? "text-success" : "text-secondary"}
                >
                  {item.passed ? "✓" : "○"}
                </span>

                <span className="small">{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column gap-2">
            <DownloadPdfButton data={data} />

            <button
              type="button"
              className="btn btn-outline-danger btn-sm mt-2"
              onClick={resetAll}
            >
              Start Over (Clear Form)
            </button>
          </div>

          <FormNav onBack={goBack} hideNext />
        </div>
      </div>

      <div className="col-lg-7">
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
