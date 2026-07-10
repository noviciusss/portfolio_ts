# Samarth Pratap Singh — Portfolio

> **GenAI & RAG Engineer | BTech CSE, VIT Bhopal (CGPA 8.57)**
> [portfolio-noviciusss.vercel.app](https://portfolio-noviciusss.vercel.app) · [GitHub](https://github.com/noviciusss) · [LinkedIn](https://www.linkedin.com/in/spsamar/) · [Medium](https://medium.com/@samarthsin2006) · [Hugging Face](https://huggingface.co/noviciusss)

A production-grade personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS v4 — showcasing projects, blog posts, skills, and live coding stats. Optimised for GenAI/LLMOps internship visibility.

---

## Sections

| Section | Content |
|---|---|
| **Hero** | Name, role badge, CTA buttons, GitHub/LinkedIn hover cards |
| **About** | Bio, stats (2+ yrs, 10+ projects, 8.57 CGPA), download resume |
| **Skills** | 5-tab skill grid: LLMOps & GenAI, ML/DL, Languages, Full-Stack, Tools |
| **Education** | VIT Bhopal BTech CSE timeline (2023–2027) |
| **Coding Stats** | Live GitHub profile + stats card, live LeetCode problem count via SWR |
| **Projects** | 7 cards with metrics, GitHub links, live demo links, blog links |
| **Blog** | Medium articles with excerpt, stats, and direct links |
| **Achievements** | Certifications, publications, academic milestones |
| **Approach** | 3-phase work process cards with canvas reveal effects |
| **Future Enhancements** | Roadmap of planned features (6 cards) |
| **Contact** | Full form wired to Resend API, contact info cards |
| **Footer** | Social links, scroll-to-top |

---

## Projects

| Project | Stack | Link |
|---|---|---|
| **Argus** — Autonomous Research Engine | LangGraph, FastAPI, Groq, Docker, LangSmith | [Demo](https://argus-h0uw.onrender.com) |
| **DoCopilot** — RAG Document Q&A | Next.js, FastAPI, Qdrant, LangChain | [GitHub](https://github.com/noviciusss/DoCopilot) · [Demo](https://do-copilot.vercel.app/) |
| **FLAN-T5 Dialogue Summarizer** | PEFT, LoRA, Transformers, Gradio | [HF Space](https://huggingface.co/spaces/noviciusss/dialogue-summarizer) |
| **RoBERTa Banking Classifier** | PyTorch, Transformers, CUDA | [HF Model](https://huggingface.co/noviciusss/RoBERTa-base_Banking77) |
| **Project Loom** | Next.js, Sanity.io, NextAuth.js, PostgreSQL | [Live](https://projectloom.vercel.app/) |
| **Modern Portfolio** | Next.js, TypeScript, Tailwind CSS | [Live](https://portfolio-noviciusss.vercel.app/) |
| **Dexplorer** | React, JavaScript, API Integration | [Live](https://dexplorer-pokemon.vercel.app/) |

---

## Tech Stack

**Core:** Next.js 15, TypeScript 5, React 19

**Styling & UI:** Tailwind CSS v4, shadcn/ui, Framer Motion, Aceternity UI, React Icons

**Data & Email:** SWR (GitHub + LeetCode APIs), Resend, React Hook Form + Zod

**Theming:** next-themes (dark/light/system)

---

## Folder Structure

```
portfolio_ts/
├── app/
│   ├── icon.tsx                   # Branded favicon via ImageResponse
│   ├── layout.tsx                 # Root layout, SEO, JSON-LD schemas
│   ├── page.tsx                   # Home page
│   ├── globals.css
│   ├── api/send-email/route.ts   # Resend email API
│   └── components/
│       ├── Hero.tsx
│       ├── AskAboutMe.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── RagBuilder.tsx
│       ├── Education.tsx
│       ├── CodingStats.tsx
│       ├── Projects.tsx
│       ├── Archive.tsx
│       ├── CurrentlyBuilding.tsx
│       ├── Achievements.tsx
│       ├── Contact.tsx
│       ├── LogoIcon.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── FloatingResumeButton.tsx
├── components/ui/                 # shadcn/ui + Aceternity components
├── public/                        # Static assets (images, Resume.pdf)
└── next.config.ts
```

---

## Getting Started

```bash
git clone https://github.com/noviciusss/portfolio_ts.git
cd portfolio_ts
npm install

# Create .env.local and add:
# RESEND_API_KEY=your_resend_key

npm run dev   # → http://localhost:3000
```

| Env Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for the contact form |

---

## Key Design Decisions

- **`app/icon.tsx` & `LogoIcon.tsx`** — dynamically generated custom circuit-path "S" monogram favicon via `ImageResponse` and scalable vector logo inheriting theme context.
- **Interactive RAG Pipeline Compiler (`RagBuilder.tsx`)** — a tactile sequencing playground allowing visitors to compile RAG layouts, demonstrating pipeline architectural concepts.
- **Dynamic GitHub Stats Theme Swapping** — calls the stats SVG api with dynamic canvas/ink variables responding instantly to dark/light mode toggles.
- **Hugging Face Hub Telemetry** — SWR fetches live open-source download counts dynamically from Hugging Face model registry APIs.
- **PinContainer href fallback** — cards without a live demo fall back to the GitHub URL, preventing broken `href=""` anchors
- **SWR data fetching** — GitHub and LeetCode stats fetched client-side with 1-hour dedupe cache and retry; graceful hardcoded fallbacks if APIs are down
- **JSON-LD schemas** — Person, WebSite, ProfilePage in `<head>` for rich search results
- **Resend sender** — contact form sends from `contact@samarth_singh.com` (verified domain)

---

## Future Enhancements (Roadmap)

1. **Agentic Portfolio Assistant** — LangGraph RAG chatbot over resume + project READMEs
2. **Live Project Dashboards** — real-time MLflow/W&B metrics embedded for deployed models
3. **Multi-Language Support** — next-intl i18n (Hindi, Spanish, Japanese)
4. **Interactive ML Playground** — embedded Hugging Face Space iframes in project cards
5. **Auth & Guestbook** — NextAuth.js GitHub OAuth + verified visitor messages
6. **CMS-Backed Content** — Sanity.io / Contentlayer for code-free project & blog updates

---

## Deployment

Deployed on **Vercel**:
1. Push to GitHub and import in [vercel.com](https://vercel.com)
2. Add `RESEND_API_KEY` in project environment variables
3. Auto-deploys on every push to `main`

---

**Samarth Pratap Singh** · samarthsin2006@gmail.com · +91 9452026413
BTech CSE · VIT Bhopal · CGPA 8.57 · Pratapgarh, U.P.
