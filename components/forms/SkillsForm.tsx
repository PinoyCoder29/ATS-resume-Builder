"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import FormNav from "@/components/FormNav";
import {
  SKILL_CATEGORIES,
  CATEGORY_PLACEHOLDERS,
  SkillCategoryName,
} from "@/data/skillCategories";
import { SkillCategory } from "@/types/resume";

export default function SkillsForm() {
  const { data, addSkill, removeSkill, goNext, goBack } = useResume();

  const [categoryName, setCategoryName] = useState<SkillCategoryName>(
    "Frontend Development",
  );

  const [customSkill, setCustomSkill] = useState("");

  const skills = data.skills || [];

  const skillExists = (skillName: string) => {
    return skills.some(
      (skill) => skill.name.toLowerCase() === skillName.toLowerCase(),
    );
  };

  const addSkillToResume = (skillName: string) => {
    const trimmedName = skillName.trim();

    if (!trimmedName) {
      return;
    }

    if (skillExists(trimmedName)) {
      return;
    }

    const category: SkillCategory = categoryName;

    addSkill({
      id: crypto.randomUUID(),
      name: trimmedName,
      category,
    });
  };

  const handleAddCustomSkill = () => {
    addSkillToResume(customSkill);
    setCustomSkill("");
  };

  const handleCustomSkillKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddCustomSkill();
    }
  };

  const canContinue = skills.length > 0;

  return (
    <div className="panel">
      <h2 className="panel-title">Skills</h2>

      <p className="panel-subtitle">
        Select a category and add the skills that best describe your experience.
      </p>

      <div className="mb-4">
        <label htmlFor="skillCategory" className="form-label fw-semibold">
          Skill Category
        </label>

        <select
          id="skillCategory"
          className="form-select"
          value={categoryName}
          onChange={(event) =>
            setCategoryName(event.target.value as SkillCategoryName)
          }
        >
          {Object.keys(SKILL_CATEGORIES).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Suggested Skills</label>

        <div className="d-flex flex-wrap gap-2">
          {SKILL_CATEGORIES[categoryName].map((skill) => {
            const alreadyAdded = skillExists(skill);

            return (
              <button
                key={skill}
                type="button"
                className={`btn ${
                  alreadyAdded ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => addSkillToResume(skill)}
                disabled={alreadyAdded}
              >
                {alreadyAdded ? "✓ " : "+ "}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="customSkill" className="form-label fw-semibold">
          Add Custom Skill
        </label>

        <div className="input-group">
          <input
            id="customSkill"
            type="text"
            className="form-control"
            value={customSkill}
            onChange={(event) => setCustomSkill(event.target.value)}
            onKeyDown={handleCustomSkillKeyDown}
            placeholder={CATEGORY_PLACEHOLDERS[categoryName]}
          />

          <button
            type="button"
            className="btn btn-dark"
            onClick={handleAddCustomSkill}
            disabled={!customSkill.trim()}
          >
            Add Skill
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Selected Skills</label>

        {skills.length === 0 ? (
          <div className="border rounded p-4 text-center text-muted">
            No skills added yet.
          </div>
        ) : (
          <div className="border rounded p-3">
            {Object.entries(
              skills.reduce((groups: Record<string, typeof skills>, skill) => {
                if (!groups[skill.category]) {
                  groups[skill.category] = [];
                }

                groups[skill.category].push(skill);

                return groups;
              }, {}),
            ).map(([category, categorySkills]) => (
              <div key={category} className="mb-3">
                <div className="fw-semibold mb-2">{category}</div>

                <div className="d-flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="badge bg-dark d-flex align-items-center gap-2"
                    >
                      {skill.name}

                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label={`Remove ${skill.name}`}
                        onClick={() => removeSkill(skill.id)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormNav onBack={goBack} onNext={goNext} nextDisabled={!canContinue} />
    </div>
  );
}
