# Portfolio implementation brief for a CLI coding agent

Prepared for: Samarth Pratap Singh
Date: 2026-10-26
Repository: https://github.com/noviciusss/Portfolio_ts
Production URL: https://portfolio-noviciusss.vercel.app/
Status: implementation specification; no repository edits or deployment performed by this document's author.

## 0. Start here: execution contract

You are implementing a focused improvement to an existing Next.js portfolio, not generating a replacement template.

Read this entire document, inspect the current checkout, record a baseline, then implement in phases. Treat the working tree as the current source of truth. Observations below were made against files retrieved during the review and may change after this document was written.

Primary objective: help an AI/ML hiring reviewer quickly understand Samarth's identity, engineering work, personal contributions, and supporting evidence.

Secondary objective: provide deeper technical reading and useful optional interactions without increasing maintenance or deployment complexity unnecessarily.

Non-goals: a new agent framework, paid CMS, extra chatbot, full-screen 3D scene, scroll hijacking, mandatory login, guestbook, large dependency migration, or a portfolio rebuild that displaces placement preparation.

### Rules

- Preserve Next.js App Router, TypeScript, the existing branding, and functioning integrations.
- Inspect before editing. Reuse working components and existing assets.
- Never fabricate metrics, evaluations, users, clients, testimonials, package statistics, certifications, screenshots, or implementation details.
- Existing portfolio claims are claims to verify, not automatically independently verified facts.
- Never infer measurable improvements from an animation or simulation.
- Do not publish unpublished posts or placeholder project evidence.
- Never disclose confidential employer/client documents, prompts, identifiers, or architecture without approval.
- Do not overwrite uncommitted work. Do not run destructive git commands.
- Do not push, merge, deploy, create remote resources, or send email without explicit owner authorization.
- Do not paste secrets into logs, commits, screenshots, or this document.
- Keep missing-owner-input tasks in a clear checklist. Implement independent work rather than blocking the entire task.
- Keep developer instructions separate from public-facing content.
- Prefer a small coherent patch to speculative abstraction.

## 1. Owner context and positioning

Name: Samarth Pratap Singh.
Education: B.Tech CSE, VIT Bhopal, 2023–2027; owner-provided CGPA 8.45.
Primary placement positioning: AI Engineer / ML Engineer, with software engineering ability demonstrated through shipped systems.
Internship context: AmberFlux; agentic AI and document-processing work. Confirm exact approved employer name, title, dates, and present/past tense before changing copy.
Core technical themes: RAG, multi-agent systems, document intelligence, evaluation, deployment, and observability.

Do not imply Samarth has graduated, holds a full-time role, or has years of professional employment unless confirmed.
Do not repeat an outdated August 2026 placement deadline as a future event; the review date is October 2026.
Current source says "Open to 2027 roles". Preserve until the owner confirms availability.

Recommended brand sentence to retain:

> I build LLM systems, then measure them.

Suggested hero hierarchy:

1. Samarth Pratap Singh.
2. AI Engineer · VIT Bhopal ’27.
3. Existing headline.
4. Short truthful description of the work.
5. View projects / Résumé / Contact.
6. Quiet evidence strip, with scope and links.

Do not invent availability such as "immediate joining" or internship conversion status.

## 2. Evidence and uncertainty register

### Observed in inspected source

- `app/page.tsx` assembles Hero, Projects, Experience, Skills, AskAboutMe, About, Education, Archive, RagBuilder, CodingStats, Contact, Navbar, Footer, and a floating résumé button.
- `app/globals.css` defines a neubrutalist ink/paper/phosphor theme with frequent heavy borders and offset shadows.
- The hero already uses the measurement-focused headline, a portrait, outcome metrics, stack tags, and résumé links.
- `Projects.tsx` contains DoCopilot, Argus, ContextCore, and an internal AmberFlux document-intelligence project.
- The assistant already exists. Its client calls `/api/ask`, reads JSON, then animates the returned answer character by character.
- `api/ask.py` exists at repository root under `api/`; do not assume the assistant is a Next route handler.
- `vercel.json` configures `api/ask.py` with `maxDuration: 10`.
- `app/api/send-email` exists. Its implementation was not audited in this review.
- `corpus.json` exists and must be inspected before changing assistant source contracts.
- `public/docopilot.png`, `public/argus.png`, and `public/samarth.jpg` exist. Their visual quality and currency have NOT been established.
- Three résumé files exist: `Resume.pdf`, `Samarth_Pratap_Singh_Resume.pdf`, and `Samarth_Singh_FDE.pdf`.
- Hero and navbar reference different existing résumé files. This is a consistency issue, not a confirmed missing-file error.
- `package.json` declares `motion`, while inspected components import `framer-motion`. Verify clean-install resolution before classifying the build impact.
- GSAP is also present. Do not assume two libraries must be removed without bundle/use analysis.
- Metadata, JSON-LD, generated Open Graph image, `robots.ts`, and `sitemap.ts` already exist.
- Static `public/robots.txt` and `public/sitemap.xml` also exist; inspect for conflicts with generated routes.

### Live/source mismatch

The public page fetch showed older headings, percentage skills, an experience counter, and a future-enhancements section unlike the newer source. Possible explanations include deployment mismatch or stale extraction. None is confirmed.

Inspect production branch, production deployment commit, domain assignment, and a fresh browser session before concluding that deployment is broken.
Do not delete source sections just because they appeared in an older fetched page.

### Not verified by this review

- Browser-rendered appearance at any viewport.
- Actual Lighthouse, Core Web Vitals, accessibility, or conversion scores.
- A successful clean install/build.
- Live contact-form delivery or assistant correctness/security.
- Authenticity and reproducibility of portfolio metrics.
- AgentGuard repository/package readiness for homepage promotion.
- Employer approval for internal-project details.

## 3. Required deliverables

1. P0 correctness and consistency fixes.
2. Refined homepage with clear hierarchy and real project visuals where available.
3. Reusable, data-driven project case-study pages for verified projects.
4. Metric/evidence presentation that distinguishes results from system specifications.
5. Improved optional assistant and corrected educational simulation.
6. Responsive, keyboard-accessible, reduced-motion-aware implementation.
7. Preserved SEO and working résumé/contact links.
8. Verification report with exact commands, results, screenshots where possible, and unverified items.
9. Owner-input checklist for blocked content.
10. No deployment without approval.

## 4. P0: baseline and deployment investigation

Before modifying source:

```bash
pwd
git status --short
git branch --show-current
git log -1 --oneline
node --version
npm --version
```

Then inspect:

- `package.json`, lockfile, `next.config.ts`, `tsconfig.json`, `vercel.json`.
- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- All components touched by this brief.
- Existing local instructions such as AGENTS.md if present.
- API implementations, corpus schema, environment-variable references, and existing tests.

Run baseline `npm ci`, `npm run build`, and `npx tsc --noEmit` in a suitable environment. Capture failures before fixing them. A failed network download is not proof of a source bug.

The package currently has `lint: next lint`; verify compatibility with the installed Next version. Do not claim lint passed if the script does not work. Add a minimal supported ESLint setup only if needed and appropriate; avoid unrelated lint churn.

If Vercel access is unavailable, record required checks for the owner rather than claiming to inspect the deployment. If available, use read-only inspection first. Redact secrets and private identifiers.

Acceptance:
- Baseline commit recorded.
- Existing failures distinguished from introduced regressions.
- Live/source mismatch either explained with evidence or left explicitly unresolved.

## 5. P0: consistency and code-level fixes

### 5.1 One canonical résumé reference

Create a central site configuration, for example `lib/site-config.ts`, with a single resume URL used by Hero, Navbar, FloatingResumeButton, Footer, and any other link.

Owner must select the current résumé. Until then, use `/Samarth_Pratap_Singh_Resume.pdf` consistently as a provisional default, because it is the current hero link and is known to exist. Do not claim it is the newest résumé. Do not delete alternative PDFs before owner confirmation.

- Verify the chosen PDF is readable and served correctly.
- Use "View résumé" when opening in a tab; do not promise download without implementing it.
- If distinct AI/FDE versions are intentional, label them explicitly and obtain owner approval for default selection.

### 5.2 Motion imports and dependency hygiene

- Find every import of `framer-motion`, `motion`, and GSAP.
- Prefer the declared package's documented React entry point, such as `motion/react`, after verifying API compatibility.
- Alternatively explicitly declare `framer-motion` if retaining it is justified; never rely on an undeclared transitive dependency.
- Do not install both packages merely to silence errors.
- Inspect type compatibility of animation variants; do not silence TypeScript with broad `any`.
- Keep GSAP where useful initially. Consolidation is optional only if it demonstrably simplifies the implementation.
- Regenerate lockfile using the project's package manager if dependencies change.

### 5.3 CSS tokens and fonts

Inspected utilities use `var(--border)` / `var(--accent)` while the stylesheet shows `--color-border` / `--color-accent` mappings and base tokens. Inspect computed/compiled CSS before fixing aliases.

- Choose consistent base tokens or explicitly define aliases.
- Ensure all custom properties resolve in both themes.
- Inspect font token wiring: theme mappings such as `--font-sans: var(--font-sans)` should not accidentally create self-referential variables. Use distinct source variables from `next/font` if necessary.
- Verify computed fonts instead of assuming configuration works.

### 5.4 Contrast and color roles

Some green/amber fills use `text-ink`; `--ink` becomes light in dark mode. Add a dedicated fixed dark `on-accent` token for text on these bright surfaces.

- Normal text target: at least 4.5:1 contrast.
- Large text target: at least 3:1.
- Important controls and focus indicators must remain distinguishable.
- Check translucent text on actual composited surfaces, not just raw hex values.
- Fix navbar active state, badges, project banners, buttons, and simulation labels consistently.
- Do not solve contrast by changing the entire brand palette.

## 6. Visual design system

Direction: editorial engineering portfolio; restrained neubrutalism, not a generic SaaS landing page.

Preserve palette family:
- Near-black ink: `#0B0D0C`.
- Warm paper family: `#F4F1E9` / existing `#EDEBE4` after contrast checks.
- Phosphor green: `#7FE08A`.
- Amber: secondary emphasis only.

Typography:
- Keep existing Space Grotesk, Inter, and JetBrains Mono if correctly loaded.
- Display font for main headings; Inter for reading; mono for small technical metadata.
- Avoid long uppercase paragraphs and dense mono body text.
- Body copy should be comfortable on mobile; evidence notes must not depend on 9px text.
- Use readable line lengths around 60–75 characters for prose where feasible.

Hierarchy:
- Strong border/shadow: primary CTA and flagship highlight.
- Thin border: normal cards and disclosures.
- Quiet separators: supporting sections.
- No box: ordinary prose.
- Remove decorative rotation from most technology tags.
- Reserve green for actions/important state rather than every label.

Responsive layout:
- Start at 320px width; test 375, 390, 768, 1024, and 1440px.
- Do not hide layout bugs with global horizontal overflow clipping.
- Do not force a full-height hero when it pushes useful content out on small devices.
- Use fluid type and spacing with bounded sizes.
- Design mobile first; technical content must remain available, not simply removed.

## 7. Homepage information architecture

Recommended order:
1. Hero.
2. Selected projects.
3. Internship/experience.
4. Compact capabilities linked to evidence.
5. Optional assistant.
6. Short about/education.
7. Published engineering notes, only if real content exists.
8. Collapsed/linked earlier work and optional technical playground.
9. Contact and footer.

Do not give every existing section equal visual prominence. Consolidate About/Education where appropriate. Keep coding stats secondary; do not let unavailable third-party stats degrade the main page.

Navigation recommendation: Work, Experience, About, Contact, Résumé. Keep Ask AI as a secondary link if space allows. Preserve valid anchors and meaningful browser navigation.

Hero:
- Put full name visibly in the hero.
- Keep measurement-focused headline.
- Use one short truthful description.
- Primary View projects, secondary Résumé, easy Contact.
- Keep portrait optional and modest; use existing asset without stretching.
- Reduce repeated metrics; use a quiet linked proof strip.
- Render final metric values immediately; remove decorative count-ups unless genuinely justified.
- No fake "live" indicator.

## 8. Project content architecture

Move project data out of a large client-only rendering component into typed data, e.g. `lib/projects.ts`. Use an MDX setup only if the repository already needs it; typed TS content is sufficient for a few case studies.

Suggested files, adapted to existing conventions:

```text
lib/site-config.ts
lib/projects.ts
app/projects/[slug]/page.tsx
app/components/projects/ProjectCard.tsx
app/components/projects/ProjectPreview.tsx
app/components/projects/MetricEvidence.tsx
app/components/projects/ArchitectureDiagram.tsx
app/components/projects/CaseStudyLayout.tsx
```

These are proposed paths, not files confirmed to exist.

Example data contract; adapt, do not copy blindly:

```ts
type Evidence = {
  label: string;
  href?: string;
  status: "verified-artifact" | "owner-reported" | "missing";
};
type ProjectMetric = {
  label: string;
  displayValue: string;
  category: "evaluation" | "performance" | "system-spec";
  scope: string;
  method?: string;
  evaluatedAt?: string;
  evidence?: Evidence[];
  limitations?: string[];
};
type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  contribution: string;
  visibility: "public" | "internal-sanitized";
  featured: boolean;
  stack: string[];
  screenshot?: { src: string; alt: string; width: number; height: number };
  repoUrl?: string;
  demoUrl?: string;
  demoCaveat?: string;
  metrics: ProjectMetric[];
};
```

Do not display internal evidence-status labels to visitors without thoughtful copy. Their purpose is to prevent unsupported claims during implementation.

### Homepage cards

Each contains:
- Real preview image if current and approved.
- Title and one-sentence problem/outcome.
- At most two main outcome metrics with scope.
- Short stack row.
- Case study, Demo, Code links as applicable.
- Clear cold-start caveat if applicable.

Do not make an entire clickable card contain nested interactive links. Keep descriptive link labels and focus treatment.

### Dedicated case studies

Create for DoCopilot and Argus first, then ContextCore if sufficient verified content exists.

For AgentGuard: inspect its current repository and package before promotion. Do not create an empty route or invent scan examples. If evidence is insufficient, retain ContextCore in the featured set and list AgentGuard as an owner-input follow-up.

Required content:
1. Problem and intended users.
2. Personal contribution.
3. Architecture.
4. Important trade-offs.
5. Evaluation methodology and results.
6. Failure cases and limitations.
7. Deployment and operational constraints.
8. Evidence links, demo, code, and reproduction steps when public.

Route behavior:
- Use App Router conventions and the installed Next version's params types.
- Generate metadata per project.
- Return a proper 404 for unknown slugs.
- Use static generation for local static content where practical.
- Keep content server-rendered; isolate interactive widgets.
- Add breadcrumbs/back-to-work link.
- Update sitemap and internal links.

### Project-specific guidance

DoCopilot:
- Explain sparse+dense retrieval, fusion, reranking, tenant isolation, async ingestion, guardrails, and deployment only as verified in source/artifacts.
- Existing site claims include 89.2% correctness, 90.5% relevance, 2.86s average latency, 40-question evaluation, and a specified LLM judge. Preserve scope; do not relabel these as human accuracy or production SLA.
- Do not infer sample counts from percentage scores. Verify scoring aggregation and exact model identifiers from evaluation artifacts.

Argus:
- Show supervisor/specialist roles, critique bounds, human interrupts, persistence, and traces when verified.
- Separate configured time tiers from measured response times.
- Keep a demo cold-start caveat only if still applicable.

ContextCore:
- Show the distinction between checkpoint state, semantic recall, and profile data.
- Existing source claims 92% over 50 cases. Verify the run/artifact before emphasizing it.
- Explain trade-offs behind three stores without presenting complexity as an achievement by itself.

Internal internship project:
- No raw client documents or identifying screenshots.
- Confirm permission for employer name, project name, performance figures, models, and architecture detail.
- Keep any approved 7-minute to 90-second comparison scoped to the tested 20-page workload.
- Do not imply identical speed for 400-page documents.
- Move this work into the experience section or sanitized case study if it duplicates the project section.

## 9. Real visual evidence

Inspect existing `docopilot.png` and `argus.png` locally before requesting replacement assets.

Preferred visuals:
- DoCopilot: question, cited answer, and source document context.
- Argus: research execution stages and final report.
- ContextCore: memory retained across sessions in a terminal capture.
- AgentGuard: real finding plus associated corrected code, only after verification.

Implementation:
- Use `next/image` with correct dimensions/sizes.
- No invented product UI screenshots.
- If unavailable, use a truthful architecture diagram or no preview; do not substitute a fake screenshot.
- No giant base64 assets in source.
- Optional recordings: poster image first, user-initiated playback, accessible controls, text equivalent where needed, no autoplay audio.
- Prefer local approved assets; do not add untrusted external screenshot services.
- Never expose secrets or client content in captures.

## 10. Metric evidence presentation

Create an accessible disclosure titled "How this was measured" or "Evaluation details".

Fields as available:
- Dataset and size.
- Scoring definition and aggregation.
- Evaluator/model configuration.
- Environment and workload.
- Evaluation date and run identifier.
- Average vs p95 distinction.
- Artifact or reproduction link.
- Known limitations.

Never invent missing fields. Omit unavailable values from public UI and track them in owner-input checklist. Use clear "small evaluation set" or equivalent truthful caveat where appropriate.

Separate evaluation/performance results from implementation facts such as number of agents, storage tiers, retry limits, and supported protocols.

## 11. Existing assistant improvements

Inspect `api/ask.py`, `corpus.json`, `AskAboutMe.tsx`, `requirements.txt`, and Vercel configuration together before changing contracts.

Do not rewrite the Python backend into a Next route solely for consistency. Preserve deployment compatibility.

### User experience

- Remove the artificial typewriter delay after the complete JSON response arrives.
- Prefer immediate complete rendering for this scope. Implement real streaming only if justified and tested across the deployment path.
- Keep quick questions relevant to verified work.
- Make source chips link to real evidence/sections.
- Never turn arbitrary model-generated source text into unrestricted URLs.
- Use a controlled source-ID-to-URL map; unknown source IDs remain plain text or are omitted.
- Provide useful empty, loading, success, timeout, rate-limit, and unavailable states.
- Show an honest fallback with project/contact links when generation is unavailable.
- Keep the interface optional; no essential qualification should require asking the model.
- Add an accessible busy state and announce complete messages rather than every typed character.
- Maintain user reading position; do not constantly force-scroll someone reading older answers.
- Provide a visible input focus indicator.
- Consider a clear conversation button; no persistent transcript storage by default.

### Reliability and safeguards to inspect, not assumed absent

- Validate trimmed non-empty input and a reasonable maximum length; recommended starting limit 1000 characters, enforced server-side too.
- Set a configurable upstream timeout below the verified platform function budget; do not merely give the browser a long timeout while the 10-second function expires.
- Use AbortController for client cancellation and clear timers.
- Rate limits should not be claimed globally effective if stored only in ephemeral process memory.
- Do not expose Groq or other provider credentials to the client.
- Treat corpus text and user prompts as data, not authorization to reveal secrets.
- Do not return raw provider errors containing sensitive details.
- Avoid storing raw personal queries in analytics/logs by default.
- Preserve non-fabrication and explicit uncertainty behavior for unsupported questions.
- If rendering Markdown is added, use safe rendering and no raw HTML execution.

Suggested response contract only if backend and client are updated together:

```ts
type AskResponse = {
  answer: string;
  sources: Array<{ id: string; label: string; href?: string }>;
};
```

The existing contract uses string sources. It is acceptable to keep that contract and map IDs on the client; do not break it accidentally.

Testing:
- Success with and without sources.
- Unknown source ID.
- Empty/oversized question.
- Unsupported factual question.
- Provider unavailable.
- 429 response.
- Timeout and cancellation.
- No credentials present: honest fallback, no crash.

## 12. Correct the RAG educational simulation

Current `RagBuilder.tsx` validates block order and returns hardcoded scores/latencies. It is not executing the real pipeline. Keep the simulation label prominent.

Required changes:
- Rename "compiler"/"COMPILE_&_RUN" to an accurate label such as "RAG flow explorer"/"Validate pipeline".
- Remove hardcoded precise performance comparisons unless backed by matching reproducible experiments.
- Do not reuse real DoCopilot correctness values in an unrelated toy result.
- Do not call the flow hybrid unless it explicitly includes sparse and dense retrieval plus fusion.
- Separate ingestion and query-time stages.

Recommended simple implementation:

```text
Ingestion: Documents → Chunking → Embedding → Index
Query: Question → Retrieval → Optional reranking → Context → Answer
```

Explain trade-offs qualitatively. Reranking may add compute and can improve ordering in a given experiment; never guarantee it always reduces latency or increases accuracy.

Accessibility:
- Keep keyboard-operable add/remove controls.
- Give remove buttons labels naming the removed block.
- Expose validation results with a suitable status role.
- Do not require dragging.
- Provide an example/reset control if helpful.
- Keep the playground below core hiring information, possibly collapsed by default.

## 13. Accessibility and motion

- Include a skip-to-main link and unique main landmark.
- One meaningful H1 per page, logical heading order.
- Use semantic buttons, links, lists, and disclosures.
- Add `aria-expanded` and `aria-controls` to custom detail toggles.
- Provide visible `focus-visible` styles in both themes.
- Do not use color alone for state.
- Verify mobile menu labeling, focus trapping, Escape, focus return, and dialog title requirements of the existing sheet primitive.
- Avoid nested navigation landmarks without useful labeling.
- Prefer comfortable touch areas, around 44px where feasible; meet WCAG 2.2 target-size requirements including applicable spacing exceptions.
- Verify at 200% zoom and narrow layouts.
- Respect `prefers-reduced-motion` consistently across CSS smooth scroll, Motion, GSAP, counters, blinking cursor, and simulation transitions.
- Do not hide content permanently if animation initialization fails.
- Initial meaningful text must remain available without animation.
- Add appropriate alt text to meaningful screenshots; decorative images get empty alt.
- Avoid repetitive screen-reader announcements from animations.

## 14. Performance and dependency constraints

- Server-render static content; use client components only for actual interaction.
- Lazy-load optional playground/chart widgets when worthwhile, with stable reserved layout space.
- Do not eagerly load multiple videos or heavy graph libraries.
- Keep image dimensions stable and responsive.
- Optimize actual LCP asset; do not mark every image as priority.
- Inspect font loading and remove redundant requests only after checking behavior.
- Avoid synchronous third-party stats dependencies for primary content.
- No new analytics vendor by default.
- No new animation dependency for decorative effects.

Targets, not claims of achieved results:
- LCP ≤ 2.5 seconds.
- INP ≤ 200 milliseconds.
- CLS ≤ 0.1.
- These thresholds refer to the 75th percentile of real-user experience, segmented by mobile/desktop.

Lighthouse is a lab diagnostic, not proof of field INP or guaranteed real-user performance. If field data is unavailable, say so. Record test conditions and do not invent a 90+ score.

## 15. SEO, metadata, and content accuracy

- Preserve existing canonical URL unless owner supplies a new domain.
- Generate project-specific titles/descriptions/social metadata.
- Preserve and update sitemap routes for public case studies.
- Reconcile generated robots/sitemap routes with static public files; avoid conflicting sources.
- Audit JSON-LD for accurate job title, internship/employer relationship, education status, location, and profile links.
- `app/layout.tsx` currently includes a home location that may not match owner context; ask rather than silently replacing it.
- Verify LeetCode URL format from the actual current profile.
- Do not describe a current student as an alumnus without reviewing schema semantics and factual accuracy.
- Keep search-engine-readable project content in HTML.
- Update the assistant corpus when public facts change so the page and assistant do not contradict each other.
- Do not add keyword stuffing or fake review structured data.

## 16. Contact and external links

- Preserve `app/api/send-email` behavior until audited.
- Test validation and error states with mocks/sandbox where possible.
- Do not send a real message without approval.
- Keep a visible email fallback; avoid unnecessary phone/address exposure.
- Do not put mail provider credentials in client code.
- External demo/code links should be descriptive and valid.
- Check demos read-only; do not upload private documents or trigger costly research jobs.
- Distinguish external hosting cold starts from broken links.

## 17. Engineering notes and supporting sections

Do not publish generated filler articles.

Candidate topics requiring real owner-approved content:
- Where my RAG evaluator fails.
- Why ingestion runs outside the request path.
- How I bounded critique loops.
- Checkpoint state versus semantic memory.

If no completed note exists, omit the section entirely. A hidden component or documented follow-up is better than an empty public page.

Keep skills compact and linked to project evidence. No arbitrary percentages, "expert" meters, or meaningless technology-wall growth.

Audit older copy only if actually present in the active source:
- Unqualified "2+ years experience".
- Overstated production-grade claims.
- Freelance-agency process copy that conflicts with placement positioning.
- R² ratio claims presented as spectacular multiplicative gains rather than an interpretable evaluation comparison.
- Public future-feature wishlists that distract from shipped work.

Do not remove genuine older work without preserving useful repository links or archive access.

## 18. File-by-file task map

| File/area | Required work |
|---|---|
| `app/page.tsx` | Simplify hierarchy; consolidate support sections; preserve valid anchors |
| `app/globals.css` | Resolve tokens/fonts; refine borders/type/spacing; focus and reduced-motion styles |
| `app/layout.tsx` | Verify factual metadata/JSON-LD and font setup; preserve canonical/social behavior |
| `app/components/Hero.tsx` | Visible name; concise proof; consistent resume; restrained animation |
| `app/components/Projects.tsx` | Extract data; concise preview cards; case-study links; semantic disclosures |
| `app/components/Navbar.tsx` | Fewer primary links; resume consistency; active state contrast; mobile behavior |
| `app/components/FloatingResumeButton.tsx` | Shared resume URL; avoid obscuring mobile content; remove if redundant |
| `app/components/AskAboutMe.tsx` | Remove fake typing delay; linked sources; timeout/error/focus behavior |
| `api/ask.py` | Inspect contract/security/timeouts; minimal compatible fixes only |
| `corpus.json` | Keep factual/source IDs synchronized; no confidential data |
| `app/components/RagBuilder.tsx` | Honest educational flow; remove fake benchmark outputs; accessible controls |
| Experience/About/Education/Skills/Archive | Consolidate repetition; preserve truthful relevant content |
| `app/components/CodingStats.tsx` | Optional/nonblocking; graceful unavailable state; no inflated claims |
| `app/components/Contact.tsx` and email API | Preserve functionality; accessible validation; safe testing |
| `public/` | Inspect existing previews/resumes; use approved assets; no unapproved deletion |
| `app/projects/[slug]/page.tsx` | Proposed new case-study route, metadata, 404, static content |
| `lib/projects.ts` / site config | Proposed typed content and shared URLs |
| `app/sitemap.ts`, `app/robots.ts` | Include routes; resolve overlap with public static files |
| `package.json`, lockfile | Fix declared imports/scripts only as needed; no unrelated upgrades |
| tests/docs | Add smoke coverage, verification report, owner-input list |

## 19. Owner questions, defaults, and blocked work

These are the only substantive inputs needed. Do not ask for credentials in chat.

| Input | Why needed | Safe default if unanswered |
|---|---|---|
| Which résumé is current: general AI, FDE, or another? | Three PDFs exist; buttons currently disagree | Use existing hero PDF consistently, mark selection provisional |
| Is "Open to 2027 roles" accurate; are internships also desired? | Prevent wrong availability message | Preserve existing wording |
| Approve refined existing ink/paper/green direction? | Avoid unnecessary aesthetic rebuild | Refine existing brand; no new template |
| Are existing DoCopilot/Argus images current; any better screenshots/short captures? | Product evidence | Inspect existing assets; use diagrams if unsuitable |
| Links/files for evaluation runs supporting highlighted numbers? | Verify metrics and methodology | Keep qualified owner-reported copy; no stronger claims or invented artifacts |
| Which internal internship details can be public? | Confidentiality and employer accuracy | No new disclosures; flag existing sensitive claims for owner review |
| Is AgentGuard ready for homepage promotion, and what is its canonical package/repo? | Verify project balance | Do not promote until inspected; retain existing featured project |
| Is production Vercel tracking the intended commit/branch? | Resolve live/source mismatch | Implement locally; leave deployment checklist; no deployment |
| Which location/employer/title dates are correct where copy conflicts? | Accurate metadata and resume consistency | Do not silently overwrite contested facts |

Non-blocking work: accessibility, dependency consistency, layout refinement, shared links, honest simulation, case-study infrastructure, existing project previews, tests.
Blocked work: unsupported new metrics, confidential examples, package claims, new availability details, final resume selection, production deployment.

## 20. Phased execution plan

### Phase A: baseline and P0
- Record current state and baseline commands.
- Fix dependency/import and token issues where reproduced.
- Centralize résumé URL.
- Fix critical contrast/focus defects.
- Inspect deployment mismatch, or produce owner checklist.

### Phase B: homepage and project evidence
- Refine hero and navigation.
- Simplify cards, use existing approved visuals.
- Extract typed data.
- Add DoCopilot and Argus case studies with verified content.
- Add honest metric disclosures.

### Phase C: interactions
- Improve assistant without unnecessary backend migration.
- Correct the simulation and move it below primary content.
- Complete reduced-motion behavior and keyboard support.

### Phase D: verification and handoff
- Audit metadata/corpus consistency.
- Run checks, browser smoke tests, and image/link checks.
- Record screenshots and actual diagnostic results.
- Summarize changes and owner-blocked items.
- Request approval before remote write or deployment.

Stop scope creep: do not add a CMS, new feature family, or generalized design platform during these phases.

## 21. Verification matrix

| Area | Required checks |
|---|---|
| Install/build | Clean dependency installation, production build, TypeScript, supported lint command |
| Homepage | Visible name/headline, clear primary actions, no duplicate hero IDs, useful content before optional widgets |
| Case studies | Known routes render, unknown slug 404, code/demo/evidence links truthful, metadata unique |
| Assets | No broken images/PDF links; screenshots readable and correctly sized |
| Navigation | Keyboard/tab, active states, mobile menu open/close/Escape/focus return, working anchors |
| Theme | Both themes and system default; no bright-fill/light-text regressions; theme switching accurate |
| Motion | OS reduced-motion emulation; no forced smooth scroll/counters/blink; content stays visible |
| Responsive | 320/375/390/768/1024/1440px; no unintended horizontal scroll; 200% zoom |
| Assistant | Success, no sources, unknown sources, unavailable provider, 429, timeout, cancellation, validation |
| Simulation | Valid/invalid flows; truthful labels; no fake score comparison; keyboard remove/reset |
| Contact | Mocked validation/success/failure; no real outgoing email without approval |
| SEO | Canonical, Open Graph, JSON-LD accuracy, sitemap/robots consistency |
| Privacy | No secrets, confidential documents, sensitive screenshots, or unnecessary query logs |
| Performance | Actual lab measurements with conditions; field metrics only if available; optional widgets nonblocking |

If browser tooling is unavailable, document unrun manual checks. Do not write "fully tested" without evidence.

Suggested commands, adjusted after inspecting actual scripts:

```bash
npm ci
npm run build
npx tsc --noEmit
# Run a supported lint command after checking package scripts/config.
# Run existing tests before adding any new framework.
# Run browser tests only if installed/available; do not claim execution otherwise.
git diff --check
git diff --stat
git status --short
```

Do not run deployment or push commands as part of testing.

## 22. Definition of done

- [ ] Existing functionality preserved or intentionally simplified with explanation.
- [ ] P0 issues fixed or explicitly documented as not reproduced/owner-blocked.
- [ ] One consistent provisional or owner-approved résumé target.
- [ ] Clear readable homepage in both themes and at mobile widths.
- [ ] Real product previews where assets permit.
- [ ] At least two meaningful case studies, not placeholder routes.
- [ ] Metrics scoped and traceable; no fabricated benchmarks.
- [ ] Internal work sanitized and approval-sensitive items flagged.
- [ ] Assistant has honest behavior, usable errors, and safe source links.
- [ ] Simulation is educational, not disguised execution or fake evaluation.
- [ ] Keyboard access and reduced motion verified where tools permit.
- [ ] Build/type/lint/tests reported accurately.
- [ ] Metadata, corpus, and visible copy do not contradict each other.
- [ ] No unapproved remote write, real email, or deployment.
- [ ] Final handoff includes remaining owner decisions.

## 23. Required CLI-agent final response

Report:
1. What changed, grouped by priority.
2. Exact files changed.
3. Tests/commands and their actual outcomes.
4. Screenshots captured, or browser checks not run.
5. Content and metrics verified versus still owner-reported.
6. Remaining blockers and precise owner questions.
7. Deployment steps the owner must approve/perform.
8. Any new dependencies and why they were necessary.

Do not claim "production ready", "fully accessible", "Lighthouse 100", or improved hiring outcomes without supporting evidence.

## 24. Copy-paste launch prompt

```text
Read the attached portfolio implementation brief completely. Work in the existing
noviciusss/Portfolio_ts checkout; do not regenerate the site from a template.
Inspect the working tree, local instructions, package setup, APIs, and source first.
Summarize your baseline and phase plan, then implement the non-blocked P0 and P1
changes followed by the assistant/simulation corrections and verification.
Preserve the ink/paper/phosphor identity. Prioritize real project evidence, readable
case studies, truthful evaluation claims, responsive UX, keyboard access, and
reduced motion. Use existing assets where current. Never invent metrics or expose
internship/client details. Keep unresolved owner decisions in a checklist and use
the brief's safe defaults. Do not overwrite uncommitted work, send real email,
push, merge, or deploy without explicit approval. Finish with changed files,
actual check results, remaining questions, and a deployment handoff.
```

## 25. Research basis and interpretation

External references used in the preceding review:
- Brittany Chiang's portfolio: hierarchy and professional work presentation.
- Lee Robinson's personal site: engineering/writing-centered presentation.
- Awwwards portfolio gallery: visual inspiration only, not proof that effects improve hiring.
- W3C WCAG 2.2 and its animation guidance: accessibility baseline.
- Google web.dev Web Vitals guidance: performance definitions and thresholds.

The proposed layout and prioritization are editorial recommendations for this owner, not claims of a universally best portfolio UI. Repository findings are from source inspection, not a complete runtime audit. Revalidate all observations against the current checkout before modifying it.
