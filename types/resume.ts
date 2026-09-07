// Central data model shared by every form, the preview, and the PDF generator.
// Keeping one source of truth here is what makes the rest of the app reusable.

export interface PersonalInfo {
  fullName: string;
  jobTitle: string; // e.g. "Registered Nurse", "Web Developer"
  email: string;
  phone: string;
  location: string; // City, Province
  linkedin?: string;
  portfolio?: string;
  summary: string; // professional summary, 2-4 sentences
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string; // e.g. "Jun 2022"
  endDate: string; // e.g. "Present"
  description: string; // bullet points separated by new lines
}

// Internship is intentionally separate from ExperienceEntry (and always
// optional) so a student can log OJT/internship hours without it being
// forced through the "meron akong trabaho" branch.
export interface InternshipEntry {
  id: string;
  position: string;
  company: string; // company / organization
  department?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string; // responsibilities / achievements / skills learned
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string; // e.g. "BS Information Technology"
  location?: string;
  startDate: string;
  endDate: string;
  honors?: string;
  summary?: string; // what they specialized in / learned / did during studies
}

// Deliberately generic — not "IT project" only. Works for a thesis,
// a feasibility study, a classroom module, a community health project, etc.
export interface ProjectEntry {
  id: string;
  name: string;
  role?: string;
  organization?: string; // school, employer, or org it was done under
  date?: string;
  description: string;
  skillsUsed?: string;
  url?: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface TrainingEntry {
  id: string;
  name: string;
  provider?: string;
  date?: string;
  description?: string;
}

export type SkillCategory = "technical" | "soft" | "language" | "certification";

export interface SkillEntry {
  id: string;
  name: string;
  category: SkillCategory;
}

// Tri-state so the wizard can force an explicit choice instead of defaulting
// silently to "wala" or "meron" (important for the branch in step 2).
export type HasExperience = "yes" | "no" | null;

export interface ResumeData {
  personalInfo: PersonalInfo;
  hasExperience: HasExperience;
  experience: ExperienceEntry[];
  internship: InternshipEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  trainings: TrainingEntry[];
}

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  },
  hasExperience: null,
  experience: [],
  internship: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  trainings: [],
};

// The wizard steps, in order. "experience-entries" is skipped entirely
// when hasExperience === "no" — see ResumeContext.getVisibleSteps().
// "internship", "projects", and "certifications" are always optional —
// each of those screens has its own skip/continue-without-adding path.
export type WizardStep =
  | "personal-info"
  | "experience-question"
  | "experience-entries"
  | "internship"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "preview";

export const STEP_LABELS: Record<WizardStep, string> = {
  "personal-info": "Personal Info",
  "experience-question": "Experience",
  "experience-entries": "Work History",
  internship: "Internship",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  preview: "Preview & Download",
};
