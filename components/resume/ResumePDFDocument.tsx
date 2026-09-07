import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Single-column, plain-text layout on purpose: no tables, columns, icons,
// or text-inside-images. That's what lets an ATS parser read every field
// correctly. Uses the built-in Helvetica font — no external font file
// needed, and it's one of the safest fonts for ATS parsing.
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 1,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  entryBlock: {
    marginBottom: 8,
  },
  entryTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
  },
  entryDates: {
    fontSize: 9,
    color: "#444444",
  },
  entrySub: {
    fontSize: 9.5,
    color: "#333333",
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    fontSize: 9.5,
    flex: 1,
    lineHeight: 1.4,
  },
  skillsLine: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
});

function ContactLine({ data }: { data: ResumeData }) {
  const { email, phone, location, linkedin, portfolio } = data.personalInfo;
  const parts = [email, phone, location, linkedin, portfolio].filter(Boolean);
  return <Text style={styles.contactLine}>{parts.join("  |  ")}</Text>;
}

function bulletsFromDescription(description: string) {
  return description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ResumePDFDocument({ data }: { data: ResumeData }) {
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

  const skillsByCategory = {
    technical: skills.filter((s) => s.category === "technical"),
    soft: skills.filter((s) => s.category === "soft"),
    language: skills.filter((s) => s.category === "language"),
    certification: skills.filter((s) => s.category === "certification"),
  };

  return (
    <Document title={`${personalInfo.fullName} - Resume`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {personalInfo.jobTitle ? (
          <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
        ) : null}
        <ContactLine data={data} />

        {personalInfo.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.paragraph}>{personalInfo.summary}</Text>
          </View>
        ) : null}

        {hasExperience === "yes" && experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>
                    {exp.position} — {exp.company}
                  </Text>
                  <Text style={styles.entryDates}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                {exp.location ? <Text style={styles.entrySub}>{exp.location}</Text> : null}
                {bulletsFromDescription(exp.description).map((line, i) => (
                  <View style={styles.bulletRow} key={i}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {internship.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Internship / OJT</Text>
            {internship.map((intern) => (
              <View key={intern.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>
                    {intern.position} — {intern.company}
                  </Text>
                  <Text style={styles.entryDates}>
                    {intern.startDate} – {intern.endDate}
                  </Text>
                </View>
                {intern.department || intern.location ? (
                  <Text style={styles.entrySub}>
                    {[intern.department, intern.location].filter(Boolean).join(" · ")}
                  </Text>
                ) : null}
                {bulletsFromDescription(intern.description).map((line, i) => (
                  <View style={styles.bulletRow} key={i}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryDates}>
                    {edu.startDate} – {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.entrySub}>
                  {edu.school}
                  {edu.honors ? `  ·  ${edu.honors}` : ""}
                </Text>
                {edu.summary ? <Text style={styles.paragraph}>{edu.summary}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skillsByCategory.technical.length > 0 && (
              <Text style={styles.skillsLine}>
                Technical: {skillsByCategory.technical.map((s) => s.name).join(", ")}
              </Text>
            )}
            {skillsByCategory.soft.length > 0 && (
              <Text style={styles.skillsLine}>
                Soft Skills: {skillsByCategory.soft.map((s) => s.name).join(", ")}
              </Text>
            )}
            {skillsByCategory.language.length > 0 && (
              <Text style={styles.skillsLine}>
                Languages: {skillsByCategory.language.map((s) => s.name).join(", ")}
              </Text>
            )}
            {skillsByCategory.certification.length > 0 && (
              <Text style={styles.skillsLine}>
                Certifications: {skillsByCategory.certification.map((s) => s.name).join(", ")}
              </Text>
            )}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.date ? <Text style={styles.entryDates}>{proj.date}</Text> : null}
                </View>
                {proj.role || proj.organization ? (
                  <Text style={styles.entrySub}>
                    {[proj.role, proj.organization].filter(Boolean).join(" · ")}
                  </Text>
                ) : null}
                {proj.description ? (
                  <Text style={styles.paragraph}>{proj.description}</Text>
                ) : null}
                {proj.skillsUsed ? (
                  <Text style={styles.skillsLine}>Skills/Tools: {proj.skillsUsed}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>{cert.name}</Text>
                  {cert.issueDate ? (
                    <Text style={styles.entryDates}>{cert.issueDate}</Text>
                  ) : null}
                </View>
                <Text style={styles.entrySub}>
                  {cert.issuer}
                  {cert.credentialId ? `  ·  ID: ${cert.credentialId}` : ""}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {trainings.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Training &amp; Workshops</Text>
            {trainings.map((training) => (
              <View key={training.id} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryTitleRow}>
                  <Text style={styles.entryTitle}>{training.name}</Text>
                  {training.date ? (
                    <Text style={styles.entryDates}>{training.date}</Text>
                  ) : null}
                </View>
                {training.provider ? (
                  <Text style={styles.entrySub}>{training.provider}</Text>
                ) : null}
                {training.description ? (
                  <Text style={styles.paragraph}>{training.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
