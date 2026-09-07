# ATS Resume Builder

Step-by-step na resume builder na gumagawa ng ATS-friendly PDF resume.
Tech stack: **Next.js 14 (App Router) + TypeScript + Bootstrap 5 + custom CSS**.

## Paano Patakbuhin

1. I-unzip ang project, buksan ang folder sa terminal.
2. I-install ang dependencies:
   ```bash
   npm install
   ```
3. Patakbuhin ang dev server:
   ```bash
   npm run dev
   ```
4. Buksan sa browser: http://localhost:3000

Para sa production build:
```bash
npm run build
npm run start
```

## Paano Gumagana ang Flow

1. **Personal Info** — pangalan, contact details, professional summary.
2. **Experience Question** — piliin kung meron o walang work experience.
   - Kung "meron" → dadaan sa **Work History** step para maglagay ng entries.
   - Kung "wala" → diretsong lalaktawan papunta sa **Education**.
3. **Education** — school, degree, taon, honors.
4. **Skills** — technical, soft skills, language, certifications.
5. **Preview & Download** — nakikita ang buong resume gamit ang ATS-safe
   na single-column layout, may checklist, at may **Download PDF** button
   na gumagawa ng totoong text-based PDF (hindi image) gamit ang
   `@react-pdf/renderer` — ito ang dahilan kung bakit ma-babasa siya ng
   ATS parsers nang maayos.

Naka-save din ang progress sa `localStorage` ng browser, kaya kahit
mag-refresh, hindi mawawala ang mga nailagay na detalye.

## Project Structure (reusable pieces)

```
types/resume.ts              → single source of truth para sa data shape
context/ResumeContext.tsx    → state management + navigation logic ng wizard
components/
  StepIndicator.tsx          → progress rail, generic sa kahit anong steps
  FormNav.tsx                → Back/Continue buttons, ginagamit sa bawat step
  fields/TextField.tsx       → reusable text input
  fields/TextAreaField.tsx   → reusable textarea
  forms/                     → isang component per wizard step
  resume/
    ResumePreview.tsx        → on-screen HTML preview
    ResumePDFDocument.tsx    → ang totoong PDF layout (@react-pdf/renderer)
    DownloadPdfButton.tsx    → client-only download button
app/
  layout.tsx                 → loads fonts, Bootstrap CSS/JS, ResumeProvider
  globals.css                → design tokens + component styles
  page.tsx                   → wizard shell (maps step -> component)
```

Dahil naka-centralize ang data model at ang navigation sa
`ResumeContext`, madaling magdagdag ng bagong step: gumawa ka lang ng
component, i-register sa `types/resume.ts` (WizardStep + STEP_LABELS) at
sa `app/page.tsx` (STEP_COMPONENTS map).

## Bakit ATS-Friendly ang Output

- Single column, walang tables/text boxes/columns na madalas hindi
  nababasa ng ATS parsers.
- Plain, standard fonts (Helvetica) — hindi decorative.
- Totoong text sa PDF (hindi naka-embed na larawan), kaya ma-cocopy at
  ma-cocompute ang keywords ng ATS software.
- Malinaw na section headers (Work Experience, Education, Skills) na
  ginagamit din bilang keyword ng maraming ATS system.
