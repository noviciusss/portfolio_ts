"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin();

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

export default function AskAboutMe() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");
  const [spinnerChar, setSpinnerChar] = useState("|");
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const typingTlRef = useRef<gsap.core.Timeline | null>(null);

  // Cycling character spinner for loading state
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

  // Blink cursor
  useGSAP(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "none",
    });
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [messages, typedResponse]);

  const typeText = (text: string, sources: string[]) => {
    setTypedResponse("");
    if (typingTlRef.current) typingTlRef.current.kill();

    const tl = gsap.timeline();
    typingTlRef.current = tl;

    const counter = { val: 0 };
    tl.to(counter, {
      val: text.length,
      duration: Math.min(text.length * 0.02, 4),
      ease: "none",
      onUpdate() {
        const idx = Math.round(counter.val);
        setTypedResponse(text.slice(0, idx));
      },
      onComplete() {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text, sources },
        ]);
        setTypedResponse("");
        setLoading(false);
      },
    });
  };

  const executeQuestion = async (queryText: string) => {
    const question = queryText.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit reached. Please wait a moment and try again.");
        }
        throw new Error("Couldn't reach the model, please try again.");
      }

      const data = await res.json();
      typeText(data.answer, data.sources ?? []);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: err.message || "Couldn't reach the model, please try again or contact me directly.",
          sources: [],
          isError: true,
        },
      ]);
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
            Grounded Q&A over my resume, internship, and project write-ups.
            <br />
            <span className="font-semibold text-foreground/80">Lightweight version:</span> BM25 keyword retrieval over a static corpus + Groq. DoCopilot's full hybrid pipeline (dense + BM25, RRF, cross-encoder rerank) is in the case file above.
          </p>
        </div>

        {/* Suggested Quick Questions */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Try asking:</span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => executeQuestion(q)}
              disabled={loading}
              className="font-mono text-xs border-2 border-border bg-canvas px-2.5 py-1 text-foreground hover:bg-phosphor hover:text-ink transition-colors disabled:opacity-50 cursor-pointer shadow-[2px_2px_0_0_var(--border)]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Neubrutalist Terminal Block */}
        <div className="border-[3px] border-border bg-card max-w-3xl shadow-[6px_6px_0_0_var(--accent)]">
          {/* Header bar */}
          <div className="bg-canvas border-b-[2px] border-border px-4 py-2 flex items-center justify-between font-mono text-[11px]">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <span className="size-2.5 rounded-full bg-phosphor border border-ink" />
              <span>TERMINAL // bm25-groq-runtime</span>
            </div>
            <span className="text-muted-foreground text-[10px]">CORPUS: RESUME_V8.61</span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="font-mono text-xs p-5 min-h-[200px] max-h-[380px] overflow-y-auto space-y-4 text-foreground bg-background/50"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div className="text-muted-foreground/75 font-mono text-xs">
                <span className="text-accent font-bold">❯</span> ask --about samarth
                <div className="mt-1 text-[11px] text-muted-foreground">
                  Ask any question about my technical experience, architecture decisions, or internship at AmberFlux.
                </div>
              </div>
            )}

            {/* Conversation history */}
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
                        {msg.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] uppercase tracking-wider text-foreground bg-accent/20 border border-border px-1.5 py-0.5 font-bold font-mono"
                          >
                            [{src}]
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* In-flight typing response */}
            {typedResponse && (
              <div className="pl-3 border-l-[3px] border-accent/40">
                <p className="leading-relaxed whitespace-pre-wrap font-sans text-sm">{typedResponse}</p>
              </div>
            )}

            {/* Loading state indicator */}
            {loading && !typedResponse && (
              <div className="flex items-center gap-2 text-accent font-mono text-xs">
                <span>{spinnerChar}</span>
                <span>Retrieving context & generating grounded answer...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t-[3px] border-border bg-card p-3 gap-2"
          >
            <span className="font-mono text-accent font-bold pl-2 select-none">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
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
          </form>
        </div>
      </div>
    </section>
  );
}
