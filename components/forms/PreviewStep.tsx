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
    { label: "May buong pangalan at contact info", passed: !!data.personalInfo.fullName && !!data.personalInfo.email },
    { label: "May professional summary", passed: data.personalInfo.summary.trim().length > 10 },
    {
      label:
        data.hasExperience === "no"
          ? "Wala ka pang idinagdag na work experience (OK lang, na-skip ito)"
          : "May kahit isang work experience",
      passed: data.hasExperience === "no" || data.experience.length > 0,
    },
    { label: "May kahit isang education entry", passed: data.education.length > 0 },
    { label: "May hindi bababa sa 5 skills", passed: data.skills.length >= 5 },
  ];

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="panel">
          <h2 className="panel-title">Preview at Download</h2>
          <p className="panel-subtitle">
            Suriin muna bago i-download. Ang layout na ito — plain text, walang tables o
            columns — ang pinaka-compatible sa ATS (Applicant Tracking System) software.
          </p>

          <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
            {checklist.map((item) => (
              <li key={item.label} className="d-flex align-items-start gap-2">
                <span className={item.passed ? "text-success" : "text-secondary"}>
                  {item.passed ? "✓" : "○"}
                </span>
                <span className="small">{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column gap-2">
            <DownloadPdfButton data={data} />
            <button type="button" className="btn btn-outline-danger btn-sm mt-2" onClick={resetAll}>
              Simulan Ulit (Clear Form)
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
