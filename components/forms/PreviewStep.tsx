"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import FormNav from "@/components/FormNav";
import ResumePreview from "@/components/resume/ResumePreview";
import DownloadPdfButton from "@/components/resume/DownloadPdfButton";

export default function PreviewStep() {
  const { data, goBack } = useResume();
  const [showDownload, setShowDownload] = useState(false);

  const handleContinue = () => {
    setShowDownload(true);
  };

  if (showDownload) {
    return (
      <div className="panel">
        {" "}
        <h2 className="panel-title">Resume Ready </h2>
        <p className="panel-subtitle">
          Your resume is ready. You can now download your PDF.
        </p>
        <div className="border rounded p-4 bg-light text-center">
          <h4 className="mb-3">Your resume is ready!</h4>

          <p className="text-muted mb-4">
            Click the button below to download your resume as a PDF.
          </p>

          <DownloadPdfButton data={data} />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowDownload(false)}
          >
            Back to Preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      {" "}
      <h2 className="panel-title">Preview & Download </h2>
      <p className="panel-subtitle">Preview your resume before downloading.</p>
      <div
        style={{
          overflowX: "auto",
          padding: "20px 0",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ResumePreview data={data} />
      </div>
      <FormNav onBack={goBack} onNext={handleContinue} nextDisabled={false} />
    </div>
  );
}
