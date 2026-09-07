import { SkillCategory } from "@/types/resume";

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: "Technical / Professional",
  soft: "Soft Skills",
  language: "Languages",
};

export const CATEGORY_PLACEHOLDERS: Record<SkillCategory, string> = {
  technical: "e.g. Next.js, Microsoft Excel, Bookkeeping",
  soft: "e.g. Communication, Leadership",
  language: "e.g. English, Filipino, Japanese",
};

export const CATEGORY_EXAMPLES: Record<SkillCategory, string[]> = {
  technical: [
    "Next.js",
    "TypeScript",
    "JavaScript",
    "React",
    "Bootstrap",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "SQL",
    "Node.js",
    "Python",
    "PostgreSql",
    "PrismaORM",
    "Microsoft Excel",
    "Microsoft Word",
    "Bookkeeping",
    "Adobe Photoshop",
  ],

  soft: [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Attention to Detail",
  ],

  language: [
    "English",
    "Filipino",
    "Japanese",
    "Korean",
    "Spanish",
    "Mandarin",
    "German",
    "French",
  ],
};
