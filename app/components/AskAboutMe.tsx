"use client";

import { useEffect, useRef, useState } from "react";

const SUGGESTED_QUESTIONS = [
  "What did you build at AmberFlux?",
  "How did you evaluate DoCopilot?",
  "Which projects use LangGraph?",
  "What are your key metrics?",
];

type Message = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  isError?: boolean;
};

const SOURCE_LINKS: Record<string, { label: string; href?: string }> = {
  bio: { label: "About", href: "#about" },
  skills: { label: "Skills", href: "#skills" },
  "experience-amberflux": { label: "Experience", href: "#experience" },
  "project-docopilot": { label: "DoCopilot", href: "#projects" },
  "project-argus": { label: "Argus", href: "https://github.com/noviciusss/Argus" },
  "project-contextcore": { label: "ContextCore", href: "https://github.com/noviciusss/ContextCore-CLI" },
  "project-gfsai": { label: "GFS-AI", href: "#experience" },
  "project-agentguard": { label: "AgentGuard", href: "https://github.com/noviciusss/AgentGuard" },
  archive: { label: "Earlier work", href: "#archive" },
  contact: { label: "Contact", href: "#contact" },
};

export default function AskAboutMe() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [spinnerChar, setSpinnerChar] = useState("|");
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!loading) return;
    const chars = ["|", "/", "-", "\\"];
    let idx = 0;
    const interval = setInterval(() => {
      setSpinnerChar(chars[idx]);
      idx = (idx + 1) % chars.length;
    }, 100);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const executeQuestion = async (queryText: string) => {
    const question = queryText.trim();
    if (!question || loading || question.length > 1000) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 9000);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit reached. Please wait a moment and try again.");
        }
        if (res.status === 400 || res.status === 422) {
          throw new Error("Please enter a focused question of 1,000 characters or fewer.");
        }
        throw new Error("Couldn’t reach the model. Please try again or use the contact form.");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer, sources: data.sources ?? [] },
      ]);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Couldn’t reach the model. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            error.name === "AbortError"
              ? "The assistant took too long to respond. Please try again or use the contact form."
              : error.message,
          sources: [],
          isError: true,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuestion(input);
  };

  return (
    <section className="py-24 px-4 border-t-[3px] border-border bg-background scroll-mt-20" id="ask">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">// QUERY_INTERFACE</span>
        <h2 className="nb-section-heading">Ask me about my work</h2>

        <div className="mb-8 max-w-2xl">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Grounded Q&amp;A over my resume, internship, and project write-ups.
            <br />
            <span className="font-semibold text-foreground/80">Lightweight version:</span> BM25 keyword retrieval over a static corpus + Groq. DoCopilot&apos;s full hybrid pipeline (dense + BM25, RRF, cross-encoder rerank) is in the case file above.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Try asking:</span>
          {SUGGESTED_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => executeQuestion(question)}
              disabled={loading}
              className="font-mono text-xs border-2 border-border bg-canvas px-2.5 py-1 text-foreground hover:bg-phosphor hover:text-on-accent transition-colors disabled:opacity-50 cursor-pointer shadow-[2px_2px_0_0_var(--border)]"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="border-[3px] border-border bg-card max-w-3xl shadow-[6px_6px_0_0_var(--accent)]">
          <div className="bg-canvas border-b-[2px] border-border px-4 py-2 flex items-center justify-between font-mono text-[11px]">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <span className="size-2.5 rounded-full bg-phosphor border border-ink" />
              <span>TERMINAL // bm25-groq-runtime</span>
            </div>
            <span className="text-muted-foreground text-[10px]">CORPUS: PUBLIC_PROJECT_NOTES</span>
          </div>

          <div
            ref={terminalBodyRef}
            className="font-mono text-xs p-5 min-h-[200px] max-h-[380px] overflow-y-auto space-y-4 text-foreground bg-background/50"
            aria-live="polite"
            aria-busy={loading}
          >
            {messages.length === 0 && (
              <div className="text-muted-foreground/75 font-mono text-xs">
                <span className="text-accent font-bold">❯</span> ask --about samarth
                <div className="mt-1 text-[11px] text-muted-foreground">
                  Ask about technical experience, architecture decisions, or the AmberFlux internship.
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === "user" ? (
                  <div className="font-bold">
                    <span className="text-accent">❯ </span>
                    <span className="text-foreground">{msg.text}</span>
                  </div>
                ) : (
                  <div className={`pl-3 border-l-[3px] ${msg.isError ? "border-destructive text-destructive" : "border-accent/40 text-foreground"} space-y-2`}>
                    <p className="leading-relaxed whitespace-pre-wrap font-sans text-sm">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.sources.map((sourceId, sourceIndex) => {
                          const source = SOURCE_LINKS[sourceId];
                          const label = `[${source?.label ?? sourceId}]`;
                          return source?.href ? (
                            <a
                              key={sourceIndex}
                              href={source.href}
                              target={source.href.startsWith("http") ? "_blank" : undefined}
                              rel={source.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-[9px] uppercase tracking-wider text-foreground bg-accent/20 border border-border px-1.5 py-0.5 font-bold font-mono underline underline-offset-2"
                            >
                              {label}
                            </a>
                          ) : (
                            <span
                              key={sourceIndex}
                              className="text-[9px] uppercase tracking-wider text-foreground bg-accent/20 border border-border px-1.5 py-0.5 font-bold font-mono"
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div role="status" className="flex items-center gap-2 text-accent font-mono text-xs">
                <span>{spinnerChar}</span>
                <span>Retrieving context &amp; generating grounded answer...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center border-t-[3px] border-border bg-card p-3 gap-2">
            <span className="font-mono text-accent font-bold pl-2 select-none">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              maxLength={1000}
              placeholder="Ask a question about my work or internship..."
              className="flex-1 bg-transparent px-2 py-1 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50"
              aria-label="Ask about Samarth"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="nb-btn nb-btn-primary text-xs py-1.5 px-4 disabled:opacity-40"
            >
              Ask
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                className="font-mono text-[10px] underline underline-offset-2 text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
