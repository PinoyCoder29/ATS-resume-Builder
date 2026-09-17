import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

import { ResumeData, SkillEntry } from "@/types/resume";

interface ResumePDFDocumentProps {
  data: ResumeData;
}

Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v1/Helvetica-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#111111",
  },

  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#111111",
    paddingBottom: 10,
    marginBottom: 14,
  },

  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    marginBottom: 3,
  },

  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 5,
  },

  contact: {
    fontSize: 8.5,
    lineHeight: 1.5,
  },

  section: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    borderBottomWidth: 0.7,
    borderBottomColor: "#555555",
    paddingBottom: 3,
    marginBottom: 6,
  },

  paragraph: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
  },

  entry: {
    marginBottom: 8,
  },

  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  entryMain: {
    flex: 1,
    paddingRight: 12,
  },

  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },

  entrySubtitle: {
    fontFamily: "Helvetica-Bold",
    marginTop: 1,
    fontSize: 9,
  },

  entryMeta: {
    fontFamily: "Helvetica",
    fontSize: 8,
    textAlign: "right",
    maxWidth: 150,
  },

  entryDescription: {
    marginTop: 3,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
  },

  skillLine: {
    marginBottom: 3,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
  },

  skillCategory: {
    fontFamily: "Helvetica-Bold",
  },

  technologies: {
    fontFamily: "Helvetica-Bold",
  },

  link: {
    fontFamily: "Helvetica",
    color: "#111111",
    textDecoration: "none",
    fontSize: 8.5,
  },
});

export default function ResumePDFDocument({ data }: ResumePDFDocumentProps) {
  const personalInfo = data.personalInfo;

  const skillsByCategory = data.skills.reduce<Record<string, SkillEntry[]>>(
    (groups, skill) => {
      const category = skill.category?.trim() || "Technical";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    },
    {},
  );

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
    <Document>
      {" "}
      <Page size="A4" style={styles.page}>
        {" "}
        <View style={styles.header}>
          {" "}
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Name"}{" "}
          </Text>
          ```
          {personalInfo.jobTitle && (
            <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
          )}
          <Text style={styles.contact}>
            {[
              personalInfo.email,
              personalInfo.phone,
              personalInfo.location,
              personalInfo.linkedin,
              personalInfo.github,
              personalInfo.portfolio,
            ]
              .filter(Boolean)
              .join(" | ")}
          </Text>
        </View>
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>

            <Text style={styles.paragraph}>{personalInfo.summary}</Text>
          </View>
        )}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>

            {data.experience.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{entry.position}</Text>

                    <Text style={styles.entrySubtitle}>{entry.company}</Text>
                  </View>

                  <View style={styles.entryMeta}>
                    <Text>
                      {formatDateRange(entry.startDate, entry.endDate)}
                    </Text>

                    {entry.location && <Text>{entry.location}</Text>}
                  </View>
                </View>

                {entry.description && (
                  <Text style={styles.entryDescription}>
                    {entry.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
        {data.internship.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INTERNSHIP / OJT</Text>

            {data.internship.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{entry.position}</Text>

                    <Text style={styles.entrySubtitle}>{entry.company}</Text>

                    {entry.department && (
                      <Text>Department: {entry.department}</Text>
                    )}
                  </View>

                  <View style={styles.entryMeta}>
                    <Text>
                      {formatDateRange(entry.startDate, entry.endDate)}
                    </Text>

                    {entry.location && <Text>{entry.location}</Text>}
                  </View>
                </View>

                {entry.description && (
                  <Text style={styles.entryDescription}>
                    {entry.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>

            {data.education.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{entry.degree}</Text>

                    <Text style={styles.entrySubtitle}>{entry.school}</Text>

                    {entry.honors && <Text>{entry.honors}</Text>}
                  </View>

                  <View style={styles.entryMeta}>
                    <Text>
                      {formatDateRange(entry.startDate, entry.endDate)}
                    </Text>

                    {entry.location && <Text>{entry.location}</Text>}
                  </View>
                </View>

                {entry.summary && (
                  <Text style={styles.entryDescription}>{entry.summary}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>

            {Object.entries(skillsByCategory).map(
              ([categoryName, categorySkills]) => (
                <Text key={categoryName} style={styles.skillLine}>
                  <Text style={styles.skillCategory}>{categoryName}:</Text>{" "}
                  {categorySkills.map((skill) => skill.name).join(", ")}
                </Text>
              ),
            )}
          </View>
        )}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>

            {data.projects.map((project) => (
              <View key={project.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{project.name}</Text>

                    {project.role && (
                      <Text style={styles.entrySubtitle}>{project.role}</Text>
                    )}

                    {project.organization && (
                      <Text>{project.organization}</Text>
                    )}
                  </View>

                  {project.date && (
                    <Text style={styles.entryMeta}>{project.date}</Text>
                  )}
                </View>

                {project.description && (
                  <Text style={styles.entryDescription}>
                    {project.description}
                  </Text>
                )}

                {project.skillsUsed && (
                  <Text style={styles.entryDescription}>
                    <Text style={styles.technologies}>Technologies:</Text>{" "}
                    {project.skillsUsed}
                  </Text>
                )}

                {project.url && (
                  <Link src={project.url} style={styles.link}>
                    {project.url}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>

            {data.certifications.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{entry.name}</Text>

                    <Text style={styles.entrySubtitle}>{entry.issuer}</Text>
                  </View>

                  {entry.issueDate && (
                    <Text style={styles.entryMeta}>{entry.issueDate}</Text>
                  )}
                </View>

                {entry.expirationDate && (
                  <Text>Expiration: {entry.expirationDate}</Text>
                )}

                {entry.credentialId && (
                  <Text>Credential ID: {entry.credentialId}</Text>
                )}

                {entry.credentialUrl && (
                  <Link src={entry.credentialUrl} style={styles.link}>
                    {entry.credentialUrl}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}
        {data.trainings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TRAINING</Text>

            {data.trainings.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMain}>
                    <Text style={styles.entryTitle}>{entry.name}</Text>

                    {entry.provider && (
                      <Text style={styles.entrySubtitle}>{entry.provider}</Text>
                    )}
                  </View>

                  {entry.date && (
                    <Text style={styles.entryMeta}>{entry.date}</Text>
                  )}
                </View>

                {entry.description && (
                  <Text style={styles.entryDescription}>
                    {entry.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
