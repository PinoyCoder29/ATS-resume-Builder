"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  ResumeData,
  emptyResumeData,
  WizardStep,
  PersonalInfo,
  ExperienceEntry,
  InternshipEntry,
  EducationEntry,
  SkillEntry,
  ProjectEntry,
  CertificationEntry,
  TrainingEntry,
  HasExperience,
} from "@/types/resume";

const STORAGE_KEY = "ats-resume-builder:draft";

interface ResumeContextValue {
  data: ResumeData;
  currentStep: WizardStep;
  visibleSteps: WizardStep[];
  currentStepIndex: number;

  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  setHasExperience: (value: HasExperience) => void;

  addExperience: (entry: ExperienceEntry) => void;
  updateExperience: (id: string, entry: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;

  addInternship: (entry: InternshipEntry) => void;
  updateInternship: (id: string, entry: Partial<InternshipEntry>) => void;
  removeInternship: (id: string) => void;

  addEducation: (entry: EducationEntry) => void;
  updateEducation: (id: string, entry: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  addSkill: (entry: SkillEntry) => void;
  removeSkill: (id: string) => void;

  addProject: (entry: ProjectEntry) => void;
  updateProject: (id: string, entry: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  addCertification: (entry: CertificationEntry) => void;
  updateCertification: (id: string, entry: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;

  addTraining: (entry: TrainingEntry) => void;
  updateTraining: (id: string, entry: Partial<TrainingEntry>) => void;
  removeTraining: (id: string) => void;

  goNext: () => void;
  goBack: () => void;
  goToStep: (step: WizardStep) => void;
  resetAll: () => void;
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

// The full step order. "experience-entries" is filtered out at runtime
// whenever the user picked "wala pang experience" — this is what makes the
// branch in the wizard work without duplicating any screens.
const ALL_STEPS: WizardStep[] = [
  "personal-info",
  "experience-question",
  "experience-entries",
  "internship",
  "education",
  "skills",
  "projects",
  "certifications",
  "preview",
];

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [currentStep, setCurrentStep] = useState<WizardStep>("personal-info");
  const [hydrated, setHydrated] = useState(false);

  // Load any previously saved draft on first mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ResumeData>;
        // Merge over emptyResumeData so a draft saved before internship/
        // projects/certifications existed doesn't crash the new screens.
        setData({ ...emptyResumeData, ...parsed });
      }
    } catch {
      // Corrupt or missing draft — just start fresh.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change so refreshing the page never loses progress.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or unavailable — non-fatal, just skip persistence.
    }
  }, [data, hydrated]);

  const visibleSteps = useMemo(() => {
    if (data.hasExperience === "no") {
      return ALL_STEPS.filter((s) => s !== "experience-entries");
    }
    return ALL_STEPS;
  }, [data.hasExperience]);

  const currentStepIndex = visibleSteps.indexOf(currentStep);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  }, []);

  const setHasExperience = useCallback((value: HasExperience) => {
    setData((prev) => ({ ...prev, hasExperience: value }));
  }, []);

  const addExperience = useCallback((entry: ExperienceEntry) => {
    setData((prev) => ({ ...prev, experience: [...prev.experience, entry] }));
  }, []);

  const updateExperience = useCallback((id: string, entry: Partial<ExperienceEntry>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  }, []);

  const addInternship = useCallback((entry: InternshipEntry) => {
    setData((prev) => ({ ...prev, internship: [...prev.internship, entry] }));
  }, []);

  const updateInternship = useCallback((id: string, entry: Partial<InternshipEntry>) => {
    setData((prev) => ({
      ...prev,
      internship: prev.internship.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  }, []);

  const removeInternship = useCallback((id: string) => {
    setData((prev) => ({ ...prev, internship: prev.internship.filter((e) => e.id !== id) }));
  }, []);

  const addEducation = useCallback((entry: EducationEntry) => {
    setData((prev) => ({ ...prev, education: [...prev.education, entry] }));
  }, []);

  const updateEducation = useCallback((id: string, entry: Partial<EducationEntry>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }, []);

  const addSkill = useCallback((entry: SkillEntry) => {
    setData((prev) => ({ ...prev, skills: [...prev.skills, entry] }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  }, []);

  const addProject = useCallback((entry: ProjectEntry) => {
    setData((prev) => ({ ...prev, projects: [...prev.projects, entry] }));
  }, []);

  const updateProject = useCallback((id: string, entry: Partial<ProjectEntry>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...entry } : p)),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  }, []);

  const addCertification = useCallback((entry: CertificationEntry) => {
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, entry] }));
  }, []);

  const updateCertification = useCallback((id: string, entry: Partial<CertificationEntry>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...entry } : c)),
    }));
  }, []);

  const removeCertification = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const addTraining = useCallback((entry: TrainingEntry) => {
    setData((prev) => ({ ...prev, trainings: [...prev.trainings, entry] }));
  }, []);

  const updateTraining = useCallback((id: string, entry: Partial<TrainingEntry>) => {
    setData((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) => (t.id === id ? { ...t, ...entry } : t)),
    }));
  }, []);

  const removeTraining = useCallback((id: string) => {
    setData((prev) => ({ ...prev, trainings: prev.trainings.filter((t) => t.id !== id) }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((step) => {
      const idx = visibleSteps.indexOf(step);
      return visibleSteps[Math.min(idx + 1, visibleSteps.length - 1)];
    });
  }, [visibleSteps]);

  const goBack = useCallback(() => {
    setCurrentStep((step) => {
      const idx = visibleSteps.indexOf(step);
      return visibleSteps[Math.max(idx - 1, 0)];
    });
  }, [visibleSteps]);

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const resetAll = useCallback(() => {
    setData(emptyResumeData);
    setCurrentStep("personal-info");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value: ResumeContextValue = {
    data,
    currentStep,
    visibleSteps,
    currentStepIndex,
    updatePersonalInfo,
    setHasExperience,
    addExperience,
    updateExperience,
    removeExperience,
    addInternship,
    updateInternship,
    removeInternship,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    addTraining,
    updateTraining,
    removeTraining,
    goNext,
    goBack,
    goToStep,
    resetAll,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within a ResumeProvider");
  return ctx;
}
