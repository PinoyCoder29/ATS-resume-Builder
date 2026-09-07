"use client";

import { useResume } from "@/context/ResumeContext";
import TextField from "@/components/fields/TextField";
import TextAreaField from "@/components/fields/TextAreaField";
import FormNav from "@/components/FormNav";

export default function PersonalInfoForm() {
  const { data, updatePersonalInfo, goNext } = useResume();
  const info = data.personalInfo;

  const canContinue =
    info.fullName.trim() !== "" && info.email.trim() !== "" && info.phone.trim() !== "";

  return (
    <div className="panel">
      <h2 className="panel-title">Personal Information</h2>
      <p className="panel-subtitle">
        Ito ang lalabas sa taas ng iyong resume. Gamitin ang buong pangalan at aktibong
        email/number na madali kang ma-contact.
      </p>

      <div className="row g-3">
        <TextField
          label="Full Name"
          value={info.fullName}
          onChange={(v) => updatePersonalInfo({ fullName: v })}
          placeholder="Juan Dela Cruz"
          required
          colClass="col-md-6"
        />
        <TextField
          label="Target Job Title"
          value={info.jobTitle}
          onChange={(v) => updatePersonalInfo({ jobTitle: v })}
          placeholder="Customer Service Representative"
          colClass="col-md-6"
          helpText="Ang position na target mong i-apply-an."
        />
        <TextField
          label="Email Address"
          value={info.email}
          onChange={(v) => updatePersonalInfo({ email: v })}
          placeholder="juan.delacruz@email.com"
          type="email"
          required
          colClass="col-md-6"
        />
        <TextField
          label="Phone Number"
          value={info.phone}
          onChange={(v) => updatePersonalInfo({ phone: v })}
          placeholder="0917 123 4567"
          required
          colClass="col-md-6"
        />
        <TextField
          label="Location"
          value={info.location}
          onChange={(v) => updatePersonalInfo({ location: v })}
          placeholder="Lipa City, Batangas"
          colClass="col-md-6"
        />
        <TextField
          label="LinkedIn (optional)"
          value={info.linkedin ?? ""}
          onChange={(v) => updatePersonalInfo({ linkedin: v })}
          placeholder="linkedin.com/in/juandelacruz"
          colClass="col-md-6"
        />
        <TextAreaField
          label="Professional Summary"
          value={info.summary}
          onChange={(v) => updatePersonalInfo({ summary: v })}
          placeholder="2-3 sentences na buod: sino ka, ilang taon ng experience, at ano ang idudulot mo sa employer."
          rows={4}
          colClass="col-12"
        />
      </div>

      <FormNav onNext={goNext} nextDisabled={!canContinue} hideBack />
    </div>
  );
}
