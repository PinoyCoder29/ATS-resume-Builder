"use client";

import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  if (!data) {
    return (
      <div className="p-5 bg-white text-dark">
        <h1>Resume Preview</h1>
        <p>No resume data available.</p>
      </div>
    );
  }

  const personalInfo = data.personalInfo || {};
  const experience = data.experience || [];
  const internship = data.internship || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certifications = data.certifications || [];
  const trainings = data.trainings || [];

  const groupedSkills: Record<string, typeof skills> = {};

  skills.forEach((skill) => {
    const category = skill.category?.trim() || "Technical";

    if (!groupedSkills[category]) {
      groupedSkills[category] = [];
    }

    groupedSkills[category].push(skill);
  });

  const formatDateRange = (start?: string, end?: string) => {
    if (!start && !end) {
      return "";
    }

    if (start && end) {
      return `${start} - ${end}`;
    }

    return start || end || "";
  };

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        margin: "0 auto",
        padding: "50px",
        backgroundColor: "#ffffff",
        color: "#111111",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          borderBottom: "2px solid #111",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.jobTitle && (
          <div
            style={{
              marginTop: "5px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {personalInfo.jobTitle}
          </div>
        )}

        <div
          style={{
            marginTop: "8px",
            fontSize: "10px",
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}

          {personalInfo.phone && (
            <span>
              {personalInfo.email ? " | " : ""}
              {personalInfo.phone}
            </span>
          )}

          {personalInfo.location && (
            <span>
              {personalInfo.email || personalInfo.phone ? " | " : ""}
              {personalInfo.location}
            </span>
          )}

          {personalInfo.linkedin && (
            <span>
              {" | "}
              {personalInfo.linkedin}
            </span>
          )}

          {personalInfo.github && (
            <span>
              {" | "}
              {personalInfo.github}
            </span>
          )}

          {personalInfo.portfolio && (
            <span>
              {" | "}
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 7px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>

          <p
            style={{
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            WORK EXPERIENCE
          </h2>

          {experience.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div>
                  <strong>{entry.position}</strong>

                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {entry.company}
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontSize: "10px",
                  }}
                >
                  {formatDateRange(entry.startDate, entry.endDate)}

                  {entry.location && <div>{entry.location}</div>}
                </div>
              </div>

              {entry.description && (
                <p
                  style={{
                    margin: "5px 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {internship.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            INTERNSHIP / OJT
          </h2>

          {internship.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div>
                  <strong>{entry.position}</strong>

                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {entry.company}
                  </div>

                  {entry.department && (
                    <div>Department: {entry.department}</div>
                  )}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontSize: "10px",
                  }}
                >
                  {formatDateRange(entry.startDate, entry.endDate)}

                  {entry.location && <div>{entry.location}</div>}
                </div>
              </div>

              {entry.description && (
                <p
                  style={{
                    margin: "5px 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            EDUCATION
          </h2>

          {education.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div>
                  <strong>{entry.degree}</strong>

                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {entry.school}
                  </div>

                  {entry.honors && <div>{entry.honors}</div>}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontSize: "10px",
                  }}
                >
                  {formatDateRange(entry.startDate, entry.endDate)}

                  {entry.location && <div>{entry.location}</div>}
                </div>
              </div>

              {entry.summary && (
                <p
                  style={{
                    margin: "5px 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.summary}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            SKILLS
          </h2>

          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div
              key={category}
              style={{
                marginBottom: "4px",
              }}
            >
              <strong>{category}:</strong>{" "}
              {categorySkills.map((skill) => skill.name).join(", ")}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            PROJECTS
          </h2>

          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div>
                  <strong>{project.name}</strong>

                  {project.role && <div>{project.role}</div>}

                  {project.organization && (
                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {project.organization}
                    </div>
                  )}
                </div>

                {project.date && (
                  <div
                    style={{
                      fontSize: "10px",
                      textAlign: "right",
                    }}
                  >
                    {project.date}
                  </div>
                )}
              </div>

              {project.description && (
                <p
                  style={{
                    margin: "5px 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {project.description}
                </p>
              )}

              {project.skillsUsed && (
                <div>
                  <strong>Technologies:</strong> {project.skillsUsed}
                </div>
              )}

              {project.url && (
                <div
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {project.url}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            CERTIFICATIONS
          </h2>

          {certifications.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "10px",
              }}
            >
              <strong>{entry.name}</strong>

              <div>{entry.issuer}</div>

              {entry.issueDate && <div>{entry.issueDate}</div>}

              {entry.credentialId && (
                <div>Credential ID: {entry.credentialId}</div>
              )}

              {entry.credentialUrl && (
                <div
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {entry.credentialUrl}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {trainings.length > 0 && (
        <section style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "13px",
              margin: "0 0 8px",
              paddingBottom: "4px",
              borderBottom: "1px solid #777",
            }}
          >
            TRAINING
          </h2>

          {trainings.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "10px",
              }}
            >
              <strong>{entry.name}</strong>

              {entry.provider && <div>{entry.provider}</div>}

              {entry.date && <div>{entry.date}</div>}

              {entry.description && (
                <p
                  style={{
                    margin: "4px 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
