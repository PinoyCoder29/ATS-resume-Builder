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
    // Frontend
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Bootstrap",
    "Tailwind CSS",

    // Backend
    "Node.js",
    "Express.js",
    "FastAPI",
    "Nodemailer",

    // Databases & ORM
    "PostgreSQL",
    "MySQL",
    "SQL",
    "Prisma ORM",
    "Redis",

    // Cloud & Deployment
    "Vercel",
    "Neon",
    "Cloudinary",
    "Hugging Face",

    // Programming Languages
    "Python",
    "Python (Basic)",
    "Java",
    "Java (Basic)",

    // AI / Machine Learning
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "MediaPipe",
    "GRU",
    "MobileNetV2",

    // Development Tools
    "Git",
    "GitHub",
    "Postman",
    "Visual Studio Code",
    "XAMPP",

    // Microsoft Office / Productivity
    "Microsoft Excel",
    "Microsoft Word",
    "Microsoft PowerPoint",
    "Google Docs",
    "Google Sheets",
    "Google Workspace",

    // Business / Office Skills
    "Bookkeeping",
    "Data Entry",
    "Data Management",
    "Document Management",
    "File Management",

    // Design
    "Adobe Photoshop",
    "Canva",
    "UI/UX Design",

    // Web Development
    "REST API",
    "API Integration",
    "Responsive Web Design",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",

    // Other
    "Technical Documentation",
    "Debugging",
    "Software Testing",
    "Problem Solving",
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
