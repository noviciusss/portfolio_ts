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

**GSAP — decided, install it, use it for exactly these things (not a Framer Motion replacement):**
GSAP is fully free now (Webflow acquired GreenSock in 2025 and dropped the old Club GreenSock paywall, so `ScrollTrigger` is free for commercial use). Install:
```bash
npm install gsap @gsap/react
```
Keep Framer Motion for ordinary React component enter/exit and layout transitions — that's what it's idiomatic for. Add GSAP + `ScrollTrigger` only for these four scroll/precision-timed effects, since running both isn't redundant when they're doing different jobs:
1. **Metric count-ups** — `57.7% → 89.2%`, `2.86s`, `30–90s` tween from 0 (or baseline) to final value on scroll-into-view. This is the highest-payoff single addition in the whole rebuild — it's what makes the numbers read as *measured* instead of printed.
2. **Schematic connector lines** — draw-on-scroll SVG lines between project cards / the hero readout panel, via `stroke-dashoffset` + `ScrollTrigger` `scrub`. Ties directly to your actual work (LangGraph nodes/edges) instead of being decoration for its own sake.
3. **Pinned log-entry section headers** (`// 01 — EXPERIENCE`) — GSAP pins/scrubs more precisely than Framer Motion's scroll hooks for this.
4. **Terminal typing effect** for the hero intro line and the "Ask About Me" widget (see §7) — character-by-character reveal with a blinking cursor, driven by a GSAP timeline, not CSS `steps()` (too rigid for variable-length streamed text).

Use `@gsap/react`'s `useGSAP()` hook for automatic cleanup on unmount in Next.js — don't hand-roll `useEffect` + manual `.kill()` calls.

**Backgrounds:** replace the starfield/aurora/blob stack entirely with **one** consistent texture: a faint grid (like graph paper) or a dot-matrix, static, low-opacity (~4–6%), fixed. No moving particles, no blurred color blobs.

**"Coder profile" amendment — decided:** layer a **terminal/IDE accent** onto this system rather than treating it as a separate style. Concretely: the hero is a literal terminal window (rounded-corner chrome, three dots, monospace `$ whoami` prompt, blinking cursor caret, the intro line typed out via GSAP — see §Motion), and the "Ask About Me" widget (§7) is a second terminal pane. Do **not** add a GitHub-contribution-graph embed or a fake VS Code file-tree sidebar — those read as gimmicks bolted onto a portfolio that's not actually an IDE, and they'd compete with the terminal motif instead of reinforcing it. One coder-signifier (the terminal), used twice, in the two places it's earned (identity + live demo) — not scattered across the whole site.

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
- [ ] Rebuild the hero as a terminal window (chrome, `$ whoami` prompt, GSAP-driven typed intro, blinking cursor) per §2/§6.
- [ ] Build `api/ask.py` (Python Vercel Function): BM25 retrieval over `corpus.json` + Groq generation + source-grounding guardrail, per §6's reference implementation. Add `requirements.txt` at repo root (`fastapi`, `groq`, `rank-bm25`). Add a simple per-IP rate limiter on the route. Set `GROQ_API_KEY` as a Vercel environment variable — never commit it.
- [ ] Build `AskAboutMe.tsx` on the frontend: terminal-styled panel, GSAP-driven typed response, source label rendered under each answer, calling `/api/ask`.
- [ ] Reduce Framer Motion in every component to one staggered section-entrance pattern; remove element-by-element duplicate fade-ins.
- [ ] Fix CGPA and role-title inconsistencies across `Hero.tsx`, `About.tsx`, `Education.tsx`, `layout.tsx` JSON-LD, and `README.md`.

**QA:**
- [ ] Run Lighthouse before/after on the asset-optimization changes — capture the LCP delta as a concrete number (this is portfolio-appropriate proof of your own performance instincts).
- [ ] Verify dark/light theme both hit WCAG AA contrast with the new ink/paper/accent palette (single accent color especially — check it against both backgrounds).
- [ ] Test the Resend contact form still works after restyling (don't touch its logic, only its classNames).

---

## 6. Interactive centerpiece — "Ask About Me" (mini-RAG)

This is the single highest-leverage addition to the whole rebuild. Every other AI/ML portfolio *describes* RAG skills in a bullet list; this one lets a visitor *use* one, live, on your own data. Build it as a real, working RAG pipeline — not a fake chatbot skinned to look technical.

**What it is:** a terminal-styled panel (second use of the terminal motif from §2) where a visitor types a question and gets a grounded answer pulled from your actual resume, project READMEs, and case-study text — the same retrieval + guardrail pattern you already built for DoCopilot, scaled down.

### Hosting/stack — DECIDED

**Stack: Groq (generation) + a Python Vercel Function (retrieval + orchestration) + BM25 over a static corpus (no vector DB). No Render. No Node/TypeScript rewrite of the RAG logic.**

Reasoning, in order of what changed the decision:
- **No Render.** Its free tier spins down after 15 min idle with a 30–60s (sometimes worse) cold start. Your site's already on Vercel — adding a second host for one API route is unnecessary and reintroduces exactly the cold-start problem you're trying to avoid.
- **Python, not TypeScript, for the RAG logic.** Vercel natively runs Python as serverless functions in the *same project* as the Next.js frontend — any file under `/api/*.py` is auto-detected via `requirements.txt`, deploys with the same `git push`, same domain. You don't need to translate your RAG knowledge into TypeScript at all; write it exactly as you would in Python, just as a stateless function instead of a long-running FastAPI/uvicorn server. Key adjustment from DoCopilot: no persistent process, no in-memory state across requests, no background tasks — every invocation loads what it needs and returns.
- **BM25 over embeddings, for v1.** The corpus here (resume + ~5 project write-ups + archive one-liners) is small. `rank_bm25` is pure Python, has no model to load, and computes over raw text at request time — this avoids loading any neural embedding model inside the function, which is the one thing that would bloat bundle size and slow every cold start. If you later want dense retrieval for architectural parity with DoCopilot, precompute embeddings *once, offline* (reuse your DoCopilot embedding code on your own machine) and check a JSON vector file into the repo — the function then only does cosine similarity in `numpy` at request time, never runs a model itself.
- **No Qdrant for this.** A dedicated vector DB is the right call for DoCopilot's corpus size; it's overhead for a few dozen chunks. Skip it here unless the corpus grows substantially (e.g., you start feeding in full blog posts/case studies at volume).

**Guardrails (the part that matters most for credibility):** refuse or redirect off-topic questions ("what's the weather" → "I can only answer questions about Samarth's work"), and **cite which project/section the answer is grounded in** in every response — the same source-grounding check from DoCopilot's guardrail set. This is what separates "working RAG demo" from "chatbot skin," and it's cheap to implement: pass the retrieved source labels through to the model's context and require it to cite them, then surface that label in the UI regardless of what the model says.

**Reference implementation** (drop into `api/ask.py`, `requirements.txt` at repo root):

```txt
# requirements.txt
fastapi
groq
rank-bm25
```

```python
# api/ask.py
from fastapi import FastAPI
from pydantic import BaseModel
from rank_bm25 import BM25Okapi
from groq import Groq
import json, os

app = FastAPI()
groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])

# loaded once per cold start, not per request
with open("corpus.json") as f:
    corpus = json.load(f)  # [{"text": "...", "source": "DoCopilot case study"}, ...]
bm25 = BM25Okapi([c["text"].split() for c in corpus])

class Question(BaseModel):
    question: str

@app.post("/api/ask")
def ask(q: Question):
    scores = bm25.get_scores(q.question.split())
    top = sorted(zip(scores, corpus), key=lambda x: -x[0])[:3]
    context = "\n".join(f"[{c['source']}] {c['text']}" for _, c in top)

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # confirm current Groq model name at build time
        messages=[
            {"role": "system", "content": "Answer only using the provided context about Samarth. If it's not covered, say so."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {q.question}"},
        ],
    )
    return {"answer": completion.choices[0].message.content, "sources": [c["source"] for _, c in top]}
```

The Next.js frontend calls this exactly like any other API route (`fetch("/api/ask", {method: "POST", body: ...})`) — it has no idea the backend is Python.

**Rate limiting:** this route is public-facing and calls a paid API per request — add a simple per-IP limiter (in-memory counter is fine for portfolio-scale traffic; Vercel KV if you want it to persist across cold starts) so a bot or a curious visitor spamming it can't burn your Groq quota.

**Presentation:** terminal chrome, monospace, the response types out character-by-character via the GSAP timeline from §Motion (not instant paste-in — the typing effect is what sells "live," not decorative). Show the retrieved source label under the answer in a small mono tag, e.g. `[source: DoCopilot case study]`.

**Where it lives:** either as its own top-level section right after the hero ("Don't take my word for it — ask") or embedded inside the hero terminal itself as a second prompt after the typed intro. Recommend its own section — giving it room signals it's a real feature, not an easter egg.

**Fallback / scope note:** if time is tight before placements, ship the BM25 v1 above as-is rather than adding dense retrieval/reranking on top — a simple working version beats a more sophisticated one that doesn't ship before mid-August.

---

---

## 8. Addendum — response to the post-build design audit

A senior-designer-style audit was run against the built site. Most of it was good and is worth acting on in full; this addendum captures what to prioritize and two things the audit missed.

**Adopt as-is, high priority (in this order):**
1. Rewrite `About.tsx` bio — replace the generic "passionate about..." copy with the specific-mechanisms version (see audit point 1). This is the single highest-priority content fix remaining.
2. Fix the section index numbers — audit found a duplicate `// 05` and out-of-order sections across About/Experience/CodingStats/CurrentlyBuilding/Skills/Projects. On a site whose whole premise is precision, this is a self-undermining bug, not polish — treat it as near-critical, not low priority.
3. Build `EvalTrace.tsx` (audit Addition A) — a dedicated methodology callout section (eval set structure, judge model, metrics measured). This is a genuine differentiator most student portfolios don't have; prioritize it above several of the audit's "critical" items.
4. Add the corpus/method provenance line to `AskAboutMe.tsx` (audit Addition B) — `# Method: BM25 retrieval over N chunks, [model] via Groq`. Cheap, and it's exactly the kind of transparency that signals the RAG widget is real, not a skin.
5. Remove `animate-ping`/expand-on-hover from `FloatingResumeButton.tsx` and `animate-pulse` from `CurrentlyBuilding.tsx` — both violate the "no decorative pulse/glow, mechanical not bouncy" motion rule from §2. Replace with the audit's suggested mechanical alternatives (static label; filling-dot counter).
6. Rewrite the About.tsx stats block to mono key-value rows per audit point 2 (`// STAT_CGPA`, `// BEST_RESULT`, `// LATENCY_DELTA`) instead of generic "2+ years" strings.
7. Skills ASCII pipeline diagram (audit point 5) and AskAboutMe loading-spinner fix (audit point 6) — both cheap, both on-brand, do them in the same pass as the above.

Lower priority, do if time allows: photo redundancy between Hero/About (point 4), first-party GitHub stats block instead of the external image (point 9), dead phone link removal (point 10), `BackgroundMesh.tsx` rename (point 11), `vercel.json` with explicit `maxDuration: 10` on `api/ask.py` (Addition C — do this one regardless of time, it's cheap insurance against Vercel's free-tier Python function timeout).

**Two things the audit missed — verify these before considering the build done:**

1. **Groq model deprecation — action required.** Groq deprecated `llama-3.3-70b-versatile` (announced June 17, 2026, retired for free/developer-tier usage). If `api/ask.py` still references it, the widget will start failing. Swap to `openai/gpt-oss-120b` (Groq's recommended replacement — also faster and cheaper: $0.15/$0.60 per 1M tokens vs the old model's $0.59/$0.79). Update the model string in §6's reference implementation and in the deployed `api/ask.py` before shipping. Always re-check `console.groq.com/docs/models` at build time — Groq's lineup changes fast and this brief's reference code will go stale.
2. **GSAP verification.** The audit reviewed Framer Motion usage in detail (Navbar underline spring, `hover-mechanical-link`, `schematic-bracket-card`) but never mentioned GSAP, ScrollTrigger, the metric count-ups, the schematic connector lines, or the terminal typing effect anywhere — despite covering motion component-by-component. Confirm directly whether §2's GSAP pass was actually implemented or whether only the Framer Motion layer landed. If GSAP is missing, the metric count-ups remain the single highest-payoff visual addition still on the table — prioritize accordingly.

---

## 9. What "done" looks like

Someone lands on the site and within 3 seconds thinks "this person is precise and builds real systems" — not "this looks like every other AI/ML portfolio generated this month." The tell that it worked: nothing on the page could be mistaken for a shadcn template default, and every number on the page (89.2%, 2.86s, 30–90s, 8.57) is set in the mono type so it reads as *measured*, not decorative.