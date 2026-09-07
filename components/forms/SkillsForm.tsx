"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import FormNav from "@/components/FormNav";
import { SkillCategory } from "@/types/resume";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: "Technical / Professional",
  soft: "Soft Skills",
  language: "Languages",
  certification: "Certifications",
};

const CATEGORY_PLACEHOLDERS: Record<SkillCategory, string> = {
  technical: "e.g. React, Microsoft Excel, Bookkeeping",
  soft: "e.g. Communication, Leadership",
  language: "e.g. English, Filipino, Japanese",
  certification: "e.g. AWS Certified Cloud Practitioner",
};

export default function SkillsForm() {
  const { data, addSkill, removeSkill, goNext, goBack } = useResume();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("technical");

  const handleAdd = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    // Prevent duplicate skills
    const alreadyExists = data.skills.some(
      (skill) => skill.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) {
      return;
    }

    addSkill({
      id: crypto.randomUUID(),
      name: trimmedName,
      category,
    });

    setName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const canContinue = data.skills.length > 0;

  const skillsByCategory = {
    technical: data.skills.filter((skill) => skill.category === "technical"),
    soft: data.skills.filter((skill) => skill.category === "soft"),
    language: data.skills.filter((skill) => skill.category === "language"),
    certification: data.skills.filter(
      (skill) => skill.category === "certification",
    ),
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Skills</h2>

      <p className="panel-subtitle">
        Add skills that are relevant to your target job. These keywords can help
        your resume match ATS requirements.
      </p>

      {/* Existing Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <div className="d-flex flex-column gap-3">
            {(
              Object.entries(skillsByCategory) as [
                SkillCategory,
                typeof data.skills,
              ][]
            ).map(([categoryKey, skills]) => {
              if (skills.length === 0) return null;

              return (
                <div key={categoryKey}>
                  <div className="fw-semibold mb-2">
                    {CATEGORY_LABELS[categoryKey]}
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="badge rounded-pill text-bg-light border d-flex align-items-center gap-2 py-2 px-3"
                      >
                        <span>{skill.name}</span>

                        <button
                          type="button"
                          className="btn-close btn-close-sm"
                          style={{
                            fontSize: "0.6rem",
                          }}
                          aria-label={`Remove ${skill.name}`}
                          onClick={() => removeSkill(skill.id)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Skill */}
      <div className="row g-3 border-top pt-3">
        <div className="col-md-6">
          <label htmlFor="skill-name" className="form-label">
            Skill
          </label>

          <input
            id="skill-name"
            type="text"
            className="form-control"
            value={name}
            placeholder={CATEGORY_PLACEHOLDERS[category]}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="skill-category" className="form-label">
            Category
          </label>

          <select
            id="skill-category"
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
          <button
            type="button"
            className="btn btn-outline-ink w-100"
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Hint */}
      <div className="mt-3 small text-secondary">
        <strong>Tip:</strong> Add skills that are relevant to the position you
        are applying for.
      </div>

      {/* Navigation */}
      <FormNav onBack={goBack} onNext={goNext} nextDisabled={!canContinue} />
    </div>
  );
}
