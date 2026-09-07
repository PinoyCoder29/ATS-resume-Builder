import { ResumeData } from "@/types/resume";

function bulletsFromDescription(description: string) {
  return description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// Plain, single-column, ATS-safe layout — intentionally mirrors
// ResumePDFDocument.tsx so what the user sees is what they download.
export default function ResumePreview({ data }: { data: ResumeData }) {
  const {
    personalInfo,
    experience,
    internship,
    education,
    skills,
    hasExperience,
    projects,
    certifications,
    trainings,
  } = data;

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.portfolio,
  ].filter(Boolean);

  const skillsByCategory = {
    technical: skills.filter((s) => s.category === "technical"),
    soft: skills.filter((s) => s.category === "soft"),
    language: skills.filter((s) => s.category === "language"),
    certification: skills.filter((s) => s.category === "certification"),
  };

  return (
    <div className="resume-preview">
      <h1>{personalInfo.fullName || "Your Name"}</h1>
      {personalInfo.jobTitle && <div className="resume-title">{personalInfo.jobTitle}</div>}
      {contactParts.length > 0 && (
        <div className="resume-contact">{contactParts.join("  |  ")}</div>
      )}

      {personalInfo.summary && (
        <>
          <div className="resume-section-title">Professional Summary</div>
          <p style={{ fontSize: "0.85rem" }}>{personalInfo.summary}</p>
        </>
      )}

      {hasExperience === "yes" && experience.length > 0 && (
        <>
          <div className="resume-section-title">Work Experience</div>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">
                  {exp.position} — {exp.company}
                </span>
                <span className="resume-entry-sub mb-0">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              {exp.location && <div className="resume-entry-sub">{exp.location}</div>}
              {bulletsFromDescription(exp.description).length > 0 && (
                <ul>
                  {bulletsFromDescription(exp.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {internship.length > 0 && (
        <>
          <div className="resume-section-title">Internship / OJT</div>
          {internship.map((intern) => (
            <div key={intern.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">
                  {intern.position} — {intern.company}
                </span>
                <span className="resume-entry-sub mb-0">
                  {intern.startDate} – {intern.endDate}
                </span>
              </div>
              {(intern.department || intern.location) && (
                <div className="resume-entry-sub">
                  {[intern.department, intern.location].filter(Boolean).join(" · ")}
                </div>
              )}
              {bulletsFromDescription(intern.description).length > 0 && (
                <ul>
                  {bulletsFromDescription(intern.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <div className="resume-section-title">Education</div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">{edu.degree}</span>
                <span className="resume-entry-sub mb-0">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="resume-entry-sub">
                {edu.school}
                {edu.honors ? `  ·  ${edu.honors}` : ""}
              </div>
              {edu.summary && (
                <p style={{ fontSize: "0.82rem", marginTop: "0.2rem" }}>{edu.summary}</p>
              )}
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <div className="resume-section-title">Skills</div>
          {skillsByCategory.technical.length > 0 && (
            <p style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              <strong>Technical:</strong> {skillsByCategory.technical.map((s) => s.name).join(", ")}
            </p>
          )}
          {skillsByCategory.soft.length > 0 && (
            <p style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              <strong>Soft Skills:</strong> {skillsByCategory.soft.map((s) => s.name).join(", ")}
            </p>
          )}
          {skillsByCategory.language.length > 0 && (
            <p style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              <strong>Languages:</strong> {skillsByCategory.language.map((s) => s.name).join(", ")}
            </p>
          )}
          {skillsByCategory.certification.length > 0 && (
            <p style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              <strong>Certifications:</strong>{" "}
              {skillsByCategory.certification.map((s) => s.name).join(", ")}
            </p>
          )}
        </>
      )}

      {projects.length > 0 && (
        <>
          <div className="resume-section-title">Projects</div>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">{proj.name}</span>
                {proj.date && <span className="resume-entry-sub mb-0">{proj.date}</span>}
              </div>
              {(proj.role || proj.organization) && (
                <div className="resume-entry-sub">
                  {[proj.role, proj.organization].filter(Boolean).join(" · ")}
                </div>
              )}
              {proj.description && (
                <p style={{ fontSize: "0.85rem" }}>{proj.description}</p>
              )}
              {proj.skillsUsed && (
                <p style={{ fontSize: "0.82rem" }}>
                  <strong>Skills/Tools:</strong> {proj.skillsUsed}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <div className="resume-section-title">Certifications</div>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">{cert.name}</span>
                {cert.issueDate && (
                  <span className="resume-entry-sub mb-0">{cert.issueDate}</span>
                )}
              </div>
              <div className="resume-entry-sub">
                {cert.issuer}
                {cert.credentialId ? `  ·  ID: ${cert.credentialId}` : ""}
              </div>
            </div>
          ))}
        </>
      )}

      {trainings.length > 0 && (
        <>
          <div className="resume-section-title">Training &amp; Workshops</div>
          {trainings.map((training) => (
            <div key={training.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="resume-entry-title">{training.name}</span>
                {training.date && (
                  <span className="resume-entry-sub mb-0">{training.date}</span>
                )}
              </div>
              {training.provider && (
                <div className="resume-entry-sub">{training.provider}</div>
              )}
              {training.description && (
                <p style={{ fontSize: "0.82rem" }}>{training.description}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
