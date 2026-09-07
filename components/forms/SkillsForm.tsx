"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import FormNav from "@/components/FormNav";
import { SkillCategory } from "@/types/resume";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: "Technical Skill",
  soft: "Soft Skill",
  language: "Language",
  certification: "Certification",
};

export default function SkillsForm() {
  const { data, addSkill, removeSkill, goNext, goBack } = useResume();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("technical");

  const handleAdd = () => {
    if (!name.trim()) return;
    addSkill({ id: crypto.randomUUID(), name: name.trim(), category });
    setName("");
  };

  const canContinue = data.skills.length > 0;

  return (
    <div className="panel">
      <h2 className="panel-title">Skills</h2>
      <p className="panel-subtitle">
        Ilagay ang mga skills na direktang may kinalaman sa job posting — ito ang mga
        keyword na hinahanap ng ATS software. Magdagdag ng hindi bababa sa 5.
      </p>

      {data.skills.length > 0 && (
        <div className="mb-4 d-flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill.id}
              className="badge rounded-pill text-bg-light border d-flex align-items-center gap-2 py-2 px-3"
            >
              {skill.name}
              <span className="text-secondary" style={{ fontSize: "0.7rem" }}>
                {CATEGORY_LABELS[skill.category]}
              </span>
              <button
                type="button"
                className="btn-close btn-close-sm"
                style={{ fontSize: "0.6rem" }}
                aria-label="Remove skill"
                onClick={() => removeSkill(skill.id)}
              />
            </span>
          ))}
        </div>
      )}

      <div className="row g-3 border-top pt-3">
        <div className="col-md-6">
          <label className="form-label">Skill</label>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Microsoft Excel"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value as SkillCategory)}
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="button" className="btn btn-outline-ink w-100" onClick={handleAdd}>
            + Idagdag
          </button>
        </div>
      </div>

      <FormNav onBack={goBack} onNext={goNext} nextDisabled={!canContinue} />
    </div>
  );
}
