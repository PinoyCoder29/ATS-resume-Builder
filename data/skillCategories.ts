import { SkillCategory } from "@/types/resume";

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: "Technical / Professional",
  soft: "Soft Skills",
  language: "Languages",
};

export const CATEGORY_PLACEHOLDERS: Record<SkillCategory, string> = {
  technical: "e.g. React, Next.js, PostgreSQL",
  soft: "e.g. Communication, Leadership",
  language: "e.g. English, Filipino, Japanese",
};

/*
|--------------------------------------------------------------------------
| Technical Skill Groups
|--------------------------------------------------------------------------
*/

export const TECHNICAL_SKILL_GROUPS = {
  "Frontend Development": [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Bootstrap",
    "Tailwind CSS",
    "Vue.js",
  ],

  "Backend Development": ["Node.js", "Express.js", "FastAPI", "Nodemailer"],

  "Databases & ORM": ["PostgreSQL", "MySQL", "SQL", "Prisma ORM", "Redis"],

  "Cloud & Deployment": ["Vercel", "Neon", "Cloudinary", "Hugging Face"],

  "Tools & Development": [
    "Git",
    "GitHub",
    "Postman",
    "Visual Studio Code",
    "XAMPP",
  ],

  "AI / Machine Learning": [
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "MediaPipe",
    "GRU",
    "MobileNetV2",
  ],

  "Programming Languages": [
    "TypeScript",
    "JavaScript",
    "Python",
    "Python (Basic)",
    "Java",
    "Java (Basic)",
  ],

  "Web Development": [
    "REST API",
    "API Integration",
    "Responsive Web Design",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
  ],

  "Testing & Other": [
    "Software Testing",
    "Debugging",
    "Technical Documentation",
    "Problem Solving",
  ],

  "Office & Productivity": [
    "Microsoft Excel",
    "Microsoft Word",
    "Microsoft PowerPoint",
    "Google Docs",
    "Google Sheets",
    "Google Workspace",
  ],

  "Business & Office": [
    "Bookkeeping",
    "Data Entry",
    "Data Management",
    "Document Management",
    "File Management",
  ],

  Design: ["Adobe Photoshop", "Canva", "UI/UX Design"],
} as const;

/*
|--------------------------------------------------------------------------
| General Quick Examples
|--------------------------------------------------------------------------
*/

export const CATEGORY_EXAMPLES: Record<SkillCategory, string[]> = {
  technical: Object.values(TECHNICAL_SKILL_GROUPS).flat(),

  soft: [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Attention to Detail",
    "Organization",
    "Decision Making",
    "Creativity",
    "Work Ethic",
    "Multitasking",
    "Collaboration",
    "Fast Learning",
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
