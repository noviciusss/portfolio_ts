"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin();

const PLACEHOLDER_QUESTIONS = [
  "What RAG system did you build?",
  "Tell me about your internship at AmberFlux",
  "What is ContextCore?",
  "How does Argus work?",
  "What are your top skills?",
];

type Message = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
};

export default function AskAboutMe() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const typingTlRef = useRef<gsap.core.Timeline | null>(null);

  // Cycle placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_QUESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    let i = 0;
    if (typingTlRef.current) typingTlRef.current.kill();

    const tl = gsap.timeline();
    typingTlRef.current = tl;

    // Character-by-character reveal via a counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: text.length,
      duration: Math.min(text.length * 0.022, 6), // cap at 6s for very long answers
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();
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

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      typeText(data.answer, data.sources ?? []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Connection error — please try again or reach out via the contact form.",
          sources: [],
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 border-t border-border/40" id="ask">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="log-header mb-8">
          <span>// 00 — ASK ABOUT ME</span>
        </div>

        <div className="mb-10 max-w-xl">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            A live RAG query interface grounded in resume text, project write-ups, and case studies.
            Same retrieval + guardrail pattern as DoCopilot — BM25 over a static corpus, Groq LLM for generation.
            <span className="font-mono text-accent text-[10px] ml-2 uppercase tracking-wider">// powered by rank-bm25 + groq</span>
          </p>
        </div>

        {/* Terminal Window */}
        <div className="border border-border/80 bg-card/20 max-w-2xl schematic-bracket-card">
          {/* Chrome Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-secondary/30">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
            <span className="ml-3 font-mono text-[10px] text-muted-foreground/60 tracking-wider uppercase">
              zsh — ask-about-samarth
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="font-mono text-xs p-5 min-h-[240px] max-h-[420px] overflow-y-auto space-y-4 text-foreground"
          >
            {/* Greeting line */}
            <div className="text-muted-foreground/70">
              <span className="text-accent">$</span> ask --about samarth
              <br />
              <span className="text-muted-foreground/50 text-[10px]">
                # Corpus: resume · 4 projects · experience · skills · contact
              </span>
            </div>

            {/* Conversation history */}
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === "user" ? (
                  <div>
                    <span className="text-accent">❯ </span>
                    <span className="text-foreground">{msg.text}</span>
                  </div>
                ) : (
                  <div className="pl-3 border-l border-accent/30 space-y-1">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] uppercase tracking-wider text-accent/70 border border-accent/20 px-1.5 py-0.5"
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

            {/* In-progress typed response */}
            {loading && typedResponse && (
              <div className="pl-3 border-l border-accent/30">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {typedResponse}
                  <span ref={cursorRef} className="inline-block w-[7px] h-[13px] bg-accent/80 align-middle ml-0.5" />
                </p>
              </div>
            )}

            {/* Loading dots before typing starts */}
            {loading && !typedResponse && (
              <div className="pl-3 border-l border-accent/30 text-muted-foreground/60 text-[10px] tracking-widest">
                RETRIEVING...
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-border/60 flex items-center px-4 py-3 gap-3"
          >
            <span className="text-accent font-mono text-xs shrink-0">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={PLACEHOLDER_QUESTIONS[placeholderIdx]}
              className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-3 py-1 hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>

        <p className="mt-4 font-mono text-[10px] text-muted-foreground/40 max-w-2xl">
          // Answers are grounded in the corpus above. Off-topic questions are redirected. Source tags indicate which document each answer draws from.
        </p>
      </div>
    </section>
  );
}
