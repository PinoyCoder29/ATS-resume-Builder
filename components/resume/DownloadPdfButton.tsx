"use client";

import dynamic from "next/dynamic";
import { ResumeData } from "@/types/resume";
import ResumePDFDocument from "./ResumePDFDocument";

const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then(
      ({ PDFDownloadLink }) => PDFDownloadLink,
    ),
  {
    ssr: false,
    loading: () => (
      <button type="button" className="btn btn-sage px-4" disabled>
        Naglo-load ng PDF engine...
      </button>
    ),
  },
);

function fileNameFor(data: ResumeData): string {
  const fullName = data.personalInfo?.fullName ?? "";

  const safeName =
    fullName
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "") || "Resume";

  return `${safeName}_ATS_Resume.pdf`;
}

interface DownloadPdfButtonProps {
  data: ResumeData;
}

export default function DownloadPdfButton({ data }: DownloadPdfButtonProps) {
  const fileName = fileNameFor(data);

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument data={data} />}
      fileName={fileName}
      className="btn btn-sage px-4"
    >
      Download PDF
    </PDFDownloadLink>
  );
}
