# Portfolio Redesign Brief — Samarth Pratap Singh

**How to use this doc:** Feed this whole file to Antigravity (Claude/Gemini) as the spec for reworking `noviciusss/portfolio_ts`. It contains: (1) a diagnosis of why the current site reads as AI-generated/templated, (2) a committed aesthetic direction — not a menu of options, (3) exact content to use, pulled from the latest resume, and (4) a concrete implementation checklist. Do not deviate from the aesthetic direction in section 2; the goal is one coherent point of view, not a safer blend.

---

## 1. Diagnosis — why it currently reads as "vibe coded"

Reviewed: `github.com/noviciusss/portfolio_ts` (Next.js 15 + TS + Tailwind v4 + shadcn/ui + Framer Motion).

Specific tells, with evidence:

1. **Default shadcn/zinc theme, untouched.** `app/globals.css` uses the stock `oklch(0.205 0 0)` / `oklch(0.97 0 0)` grayscale variable set that ships with every shadcn install. There is no committed brand color in the design tokens themselves — color only shows up as inline `blue-600`/`purple-600` Tailwind utility classes sprinkled into components. This is the single biggest tell: the design system has no opinion.
2. **Blue-to-purple gradient text + blue pill badge in the hero.** `Hero.tsx` does `bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text` on the name and a `bg-blue-100 text-blue-600 rounded-full` pill for the role badge. This exact combination is the most-repeated pattern in AI-generated landing pages — it's explicitly called out as the aesthetic to avoid.
3. **Generic decorative blobs.** Two blurred gradient circles (`bg-blue-200 ... rounded-full filter blur-3xl`) floating behind the hero — a stock "SaaS landing page" background trick that carries no relationship to the content (AI/ML, agents, pipelines).
4. **Framer Motion used as decoration, not communication.** Nearly every element in `Hero.tsx` gets its own `initial`/`animate`/`transition` fade-up. When everything animates the same way, none of it reads as intentional — it reads as "AI added motion because motion was on the checklist."
5. **Unused/legacy effects still wired in `globals.css`:** a starfield background, an "aurora" gradient blend, a `tilt` keyframe, `hover-glow` with a hardcoded `rgba(59,130,246,0.5)` shadow. Multiple competing background gimmicks stacked on top of each other is a strong signal of iterative AI patching rather than a single design decision.
6. **Default font stack.** Only Geist Sans/Mono (Next.js default) — no distinctive type pairing. Combined with the blue/purple palette, this is close to visually indistinguishable from a generic AI-generated template.
7. **Housekeeping debt that undermines "production-grade" positioning:**
   - `app/services copy/` is a literal duplicate of `app/services/` (same 9,840-byte `page.tsx`) — dead code left in the repo.
   - `public/logo.png` is 2.8 MB and `public/gif.gif` is 6.1 MB, both unoptimized and served as-is — this will hurt LCP/Lighthouse scores, which matters for a performance-conscious AI/ML engineer's portfolio.
   - `public/Screenshot 2025-05-10 012618.png` — an unrenamed raw screenshot shipped to production.
8. **Content is stale relative to the current resume:** README lists CGPA 8.45 (resume says **8.57**), the internship section doesn't exist yet in the site (current resume shows **AmberFlux EdgeAI**, GPT-5 Vision pipeline, not reflected in repo), and `ContextCore` is in the resume but its presence in the deployed site is unclear — the featured-projects list in the README still includes the FLAN-T5 summarizer and RoBERTa classifier, both of which are being phased off the resume in favor of DoCopilot / Argus / ContextCore / GFS-AI.

None of this is a "your code is bad" problem — the engineering (SWR data fetching, MCP-adjacent architecture write-ups, JSON-LD SEO, Resend email API) is genuinely solid. The problem is purely visual-identity: the design system was never *decided*, so every component defaulted to the nearest cliché.

---

## 2. Committed aesthetic direction — "Lab Notebook / Systems Log"

Do not offer the user multiple mood boards. Build this one, fully:

**Concept:** The portfolio should feel like reading the working notebook of someone who builds and instruments agentic pipelines — closer to a technical field log or an engineering spec sheet than a marketing landing page. Precise, monospace-inflected, high-contrast, unapologetically technical. Think: terminal output, schematic diagrams, lab notebooks — not "AI startup SaaS."

**Palette (single accent, not a gradient) — DECIDED:**
- Base (dark mode, primary): near-black ink `#0B0D0C`, off-white paper text `#EDEBE4`
- Base (light mode): warm paper `#F4F1E9`, ink text `#14140F`
- **Accent: phosphor green `#7FE08A`.** Amber was the other option on the table; green wins because it reads as terminal/system-log/monitoring-dashboard — closer to "measured output" than amber's warmer, editorial feel — and it maps cleanly onto your habit of putting hard numbers (89.2%, 2.86s) front and center. Use it everywhere and only there: links, active nav state, the one highlighted phrase per hero, chart lines, the accent bracket around metric callouts. No blue, no purple, no gradients on text, no second accent color.
- Borders/dividers: hairline `1px`, low-opacity ink/paper — like ruled notebook paper or schematic gridlines, not soft drop shadows.

**Typography (distinctive pairing, no Inter/Geist-default look):**
- Display/headline: a characterful serif or slab with personality — e.g. **Fraunces** (variable, has a "soft" optical mode that's warm rather than corporate) or **Instrument Serif** for the hero name/section titles.
- Body + UI: a clean grotesque — e.g. **Söhne**/ **General Sans** / **Geist** is acceptable *only* for body copy, never for headlines.
- Data, metrics, tags, code, nav labels: a monospace — **JetBrains Mono** or **IBM Plex Mono** — used for every number (`89.2%`, `2.86s`, `30–90s`), every tech-stack tag, and the nav. This is the detail that makes the "lab notebook" concept legible instantly.

**Motion:** one well-orchestrated entrance per section (staggered reveal on scroll-into-view via `IntersectionObserver`/Framer Motion, ~60–80ms stagger), not per-element fade spam. Micro-interactions should feel mechanical/precise — a hover that reveals a monospace coordinate or timestamp, an underline that draws itself left-to-right, a card that shows a schematic connector line on hover — not translateY bounce + glow.

**Backgrounds:** replace the starfield/aurora/blob stack entirely with **one** consistent texture: a faint grid (like graph paper) or a dot-matrix, static, low-opacity (~4–6%), fixed. No moving particles, no blurred color blobs.

**Layout:** break the centered-hero-card template. Asymmetric grid, left-aligned headline with the metrics/stats living in a bordered "readout" panel to the side (like a spec sheet), section headers styled like log entries (`// 01 — EXPERIENCE`, monospace, accent-colored index number). Project cards read like incident reports: problem → what was built → measured result, with the measured numbers set in mono and large.

---

## 3. Content — use this, not the current repo copy

Pull all facts from the resume below (dated 2026, most current). Where the live repo/README conflicts with this, the resume wins.

### Hero
- Name: **Samarth Pratap Singh**
- Role line (mono tag, not a soft pill): `AI/ML ENGINEER · AGENTIC PIPELINES · RAG · 2027`
- One-line positioning (replace the generic "Building production-ready GenAI systems..." line with something that names actual mechanisms, matching his direct-no-fluff communication style): e.g. *"I build retrieval and agent systems that are measured, not vibes — hybrid search with RRF fusion, supervisor multi-agent graphs, dual-memory architectures — and I evaluate every one of them with LLM-as-judge harnesses before I call it done."*
- CTAs: "View Projects" / "Resume" (link to actual current PDF) / "Contact"

### Experience (currently missing from the deployed site — add it)
**AI/ML Engineer Intern — AmberFlux EdgeAI** · May 2026 – Present · Remote
- Architected a vision extraction pipeline for multi-page architectural PDFs using GPT-5 — cut latency from ~7 min to ~90 sec on 20-page documents via concurrent batch dispatch (`ThreadPoolExecutor` + `asyncio`), with structured output enforcement and retry handling.
- Built a cover/dimension intake pipeline combining non-AI heuristic extraction (regex/Docling) with conditional GPT-5 fallback — vision invoked only for missing fields — achieving >0.85 confidence and near-complete field extraction on real architectural lead sheets.
- Designed a job aggregation layer consolidating multi-source document outputs into structured JSON for documents up to 400 pages, with page-level validation guardrails and LangGraph-based routing.

### Projects (feature these four — drop FLAN-T5/RoBERTa/Project Loom/Dexplorer to secondary/archive, per the resume's current framing)

**DoCopilot** — RAG Document Q&A · Dec 2025
Next.js · FastAPI · Qdrant (Hybrid) · Reranking
- Full-stack RAG: PDF/TXT ingestion, hybrid search (BM25 + dense) with RRF fusion, cross-encoder reranking (ms-marco-MiniLM-L-6-v2) via hosted inference APIs, cited answer retrieval.
- Guardrails: prompt-injection detection, PII redaction, source-grounding checks.
- **Measured result** (set this in mono, large, as the card's headline stat): 40-query LLM-as-Judge ablation → **57.7% → 89.2%** correctness (+31 pts over keyword baseline), 90.5% relevance, 100% source rate, 2.86s avg latency.
- Live: do-copilot.vercel.app

**Argus** — Multi-Agent Research Engine · Feb 2026
FastAPI · LangGraph · Docker · LangSmith
- Supervisor-pattern LangGraph pipeline, 5 specialist agents (planner/researcher/critic/writer/supervisor), LLM-driven `Command(goto)` routing.
- Async submit → poll → fetch job flow, SQLite persistence (Postgres swap is a one-line change), LangGraph checkpointing for failure recovery, every call traced in LangSmith.
- Critic agent rejects low-quality drafts and re-routes before writing — quality enforcement without manual review.
- **Measured result**: manual research time reduced from hours to **30–90 seconds**.
- GitHub: github.com/noviciusss/Argus (confirm actual repo name)

**ContextCore** — Stateful Memory Agent · Jun 2026
LangGraph · PostgreSQL · Qdrant · MongoDB · MCP
- FastMCP server exposing task/note management as callable tools, JSON-RPC binding into a LangGraph agent executor.
- Dual-memory architecture: Postgres checkpointing + Qdrant semantic recall + MongoDB user profiles, intent router via conditional LangGraph edges.
- LLM-as-Judge harness measuring memory recall accuracy and hallucination rate across multi-session conversations.

**GFS-AI** — Document Intelligence Pipeline (AmberFlux internship project — feature as case study, not just a bullet under Experience)
- Same facts as the Experience section above, but told as a before/after case study with the dimension-recall detail from your build history (recall improved from ~10 to 75+ entries after fixing image resizing/timeout bugs) if you're comfortable sharing that level of internal detail publicly — otherwise keep it at the resume's framing.

### Archive — decided: keep everything, demote don't delete

You said don't remove anything, so nothing gets deleted. DoCopilot / Argus / ContextCore / GFS-AI stay as the four **Featured** case studies (§3 above, full case-report treatment). Everything else below goes into a lower-key **"Archive / Earlier Work"** section — smaller cards, no big metric callout, just name, one line, stack, link. This keeps them visible and linked (recruiters who click through still find real, working repos) without diluting the four projects you actually want judged on. Pulled straight from your GitHub profile:

- **FLAN-T5 Dialogue Summarizer** — LoRA fine-tuned FLAN-T5-base on SAMSum (14.7K dialogues), updating only 2% of parameters. 49.01 ROUGE-1 · 72.25 BERTScore F1 · 42.51 METEOR, matching full fine-tuning at a fraction of the compute cost. Deployed as a Gradio app on Hugging Face Spaces. *(This is good, legitimate PEFT/LoRA work — archiving it is about narrative focus for the four featured projects, not about the work being weak.)*
- **RoBERTa Banking77 Classifier** — PyTorch/Transformers/CUDA, hosted as a model on Hugging Face.
- **Project Loom** — Next.js, Sanity.io, NextAuth.js, PostgreSQL. Full-stack CMS-backed app, live at projectloom.vercel.app.
- **Dexplorer** — React/JS Pokémon API explorer, live at dexplorer-pokemon.vercel.app. Fine as an early full-stack rep, clearly earlier-stage work.
- **LeetCode Solutions** — DSA solution archive (C++), auto-synced via LeetHub. Link it from the Coding Stats section, not as a project card.
- **Deep Learning** / **FineTuning** notebooks — Jupyter notebook repos from coursework; link as "notes/experiments," not full case studies.

### Currently Building — new section, not on the site yet

You're actively building **AgentGuard**: an AST-based static analysis and observability CLI/GitHub Action for agentic AI codebases (LangGraph, CrewAI, AutoGen, MCP) — currently Phase 1, three working detection rules, full pytest suite. It's not public on GitHub yet, so don't link a repo that doesn't exist — instead add a small "Currently Building" card (same visual language as the log-entry section headers) with a one-line description and a "repo coming soon" state, or hold off adding it until Phase 1 is public. Your call on timing; the design system should have a slot ready either way, since ongoing work signals momentum that finished case studies alone don't.

### Skills
Group by function, set as mono tags, not colorful pill soup:
`Languages` Python · C++ · TypeScript · SQL
`ML/DL` PyTorch · TensorFlow · Transformers · PEFT/LoRA · Scikit-learn
`LLM & Agents` LangGraph · LangChain · RAG · Tool-Calling
`Retrieval` Qdrant · FAISS · Hybrid Search (BM25+Dense) · Reranking
`Backend & Infra` FastAPI · Docker · PostgreSQL · Next.js · Linux
`Eval & Observability` LLM-as-Judge · Ragas · LangSmith · MLflow

### Education
VIT Bhopal University — B.Tech CSE, 2023–2027, **CGPA 8.57** (fix the 8.45 currently in the README/site).

### Contact
Keep the existing Resend-backed form — it's a genuinely good technical choice, don't rebuild it, just restyle it to match the new system (bordered "readout" panel, mono labels).

---

## 4. Data conflicts — status

1. **CGPA: resume says 8.57, README/site says 8.45.** Still needs a decision — use whichever is your actual current, verified CGPA. (Your GitHub profile README already shows 8.57, so the Next.js site is the one lagging.)
2. **Role title:** resume header says "AI/ML Engineer," old site README says "GenAI & RAG Engineer," your GitHub bio says "AI/ML Dev." Pick one and use it consistently across hero, meta tags, and JSON-LD — recommend "AI/ML Engineer" since it matches the resume you're actively using for placements.
3. Is the AmberFlux/GFS-AI experience meant to go live publicly, or is any of it confidential? Confirm before publishing pipeline internals beyond what's already on your public resume.
4. ~~Confirm whether FLAN-T5/RoBERTa/Project Loom/Dexplorer should be removed or archived~~ — **resolved: archived, not removed.** See §3 Archive section above.
5. **Confirmed repo links** (from your GitHub, no longer a placeholder): `github.com/noviciusss/DoCopilot`, `github.com/noviciusss/Argus`, `github.com/noviciusss/ContextCore-CLI`. AgentGuard has no public repo yet — see "Currently Building" above.

---

## 5. Implementation checklist for Antigravity

**Housekeeping (do first, low-risk):**
- [ ] Delete `app/services copy/` (exact duplicate of `app/services/`).
- [ ] Compress/replace `public/logo.png` (2.8MB → target <150KB, convert to optimized PNG/SVG or WebP) and `public/gif.gif` (6.1MB → convert to an optimized WebM/MP4 or a much smaller looping WebP, or lazy-load it).
- [ ] Rename or remove `public/Screenshot 2025-05-10 012618.png`.
- [ ] Run all images through `next/image` with explicit `sizes` for responsive loading.

**Design system:**
- [ ] Replace `globals.css` `:root`/`.dark` tokens with the palette in §2 (ink/paper + single accent), keep using the existing `@theme inline` shadcn variable mapping structure — just change the values.
- [ ] Remove `starfield-bg`, `aurora-bg`, `.animate-tilt`, `.hover-glow` — replace with one grid/dot-matrix background utility.
- [ ] Add Fraunces (or Instrument Serif) for display and JetBrains Mono (or IBM Plex Mono) for data/nav/tags via `next/font`; keep Geist or a comparable grotesque strictly for body copy.
- [ ] Audit every component for hardcoded `blue-*`/`purple-*` Tailwind classes and replace with the new CSS variables/accent token — there should be zero raw Tailwind color utilities left outside the token system.

**Components:**
- [ ] Rebuild `Hero.tsx`: remove gradient-text name, blob backgrounds, and pill badge; use mono role tag + serif headline + asymmetric layout with a bordered stats/readout panel.
- [ ] Add an `Experience.tsx` section for AmberFlux/GFS-AI (currently missing from the site entirely based on the component list).
- [ ] Restyle `Projects.tsx` cards as "case report" layout: problem → build → measured result in mono, per §3.
- [ ] Restyle `Skills.tsx` from colorful tab pills to grouped mono tag lists.
- [ ] Add a new `Archive.tsx` section (small link-out cards, not full case-report cards) for FLAN-T5, RoBERTa, Project Loom, Dexplorer — per §3 Archive. Link LeetCode Solutions from `CodingStats.tsx` instead of as its own project card.
- [ ] Add a `CurrentlyBuilding.tsx` slot for AgentGuard (one-line description, "repo coming soon" state) — leave it easy to wire a real link in later.
- [ ] Reduce Framer Motion in every component to one staggered section-entrance pattern; remove element-by-element duplicate fade-ins.
- [ ] Fix CGPA and role-title inconsistencies across `Hero.tsx`, `About.tsx`, `Education.tsx`, `layout.tsx` JSON-LD, and `README.md`.

**QA:**
- [ ] Run Lighthouse before/after on the asset-optimization changes — capture the LCP delta as a concrete number (this is portfolio-appropriate proof of your own performance instincts).
- [ ] Verify dark/light theme both hit WCAG AA contrast with the new ink/paper/accent palette (single accent color especially — check it against both backgrounds).
- [ ] Test the Resend contact form still works after restyling (don't touch its logic, only its classNames).

---

## 6. What "done" looks like

Someone lands on the site and within 3 seconds thinks "this person is precise and builds real systems" — not "this looks like every other AI/ML portfolio generated this month." The tell that it worked: nothing on the page could be mistaken for a shadcn template default, and every number on the page (89.2%, 2.86s, 30–90s, 8.57) is set in the mono type so it reads as *measured*, not decorative.
