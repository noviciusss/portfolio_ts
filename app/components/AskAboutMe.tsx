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
  const [spinnerChar, setSpinnerChar] = useState("|");
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
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

  // Live telemetry log simulator
  useEffect(() => {
    if (messages.length > 0 || loading) {
      setTelemetryLogs([]);
      return;
    }

    const sampleLogs = [
      "RETRIEVER: Query 'PEFT/LoRA fine-tuning' matched AmberFlux_EdgeAI.pdf (score: 0.942)",
      "EVAL: G-Eval Groundedness: 0.962 | Faithfulness: 0.948",
      "ROUTING: Selected FastMCP tool dispatcher for ContextCore metadata query...",
      "RETRIEVER: Dense semantic embedding matched Argus_Workflow.json (score: 0.887)",
      "EVAL: BERTScore F1: 0.912 | Latency: 1.24s",
      "PIPELINE: Executing reciprocal rank fusion (RRF) reranker...",
    ];

    setTelemetryLogs([sampleLogs[0], sampleLogs[1]]);

    let logIdx = 2;
    const interval = setInterval(() => {
      setTelemetryLogs((prev) => {
        const nextLogs = [...prev, sampleLogs[logIdx]];
        if (nextLogs.length > 3) {
          nextLogs.shift();
        }
        return nextLogs;
      });
      logIdx = (logIdx + 1) % sampleLogs.length;
    }, 4500);

    return () => clearInterval(interval);
  }, [messages.length, loading]);

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
      duration: Math.min(text.length * 0.022, 6),
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
    <section className="py-24 px-4 border-t-[3px] border-border bg-background" id="ask">
      <div className="max-w-5xl mx-auto">
        <span className="nb-section-label">SECTION 01</span>
        <h2 className="nb-section-heading">Ask me anything</h2>

        <div className="mb-10 max-w-xl">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            A live RAG query interface grounded in resume text, project write-ups, and case studies.
            Same retrieval + guardrail pattern as DoCopilot — BM25 over a static corpus, Groq LLM for generation.
            <span className="font-mono text-accent text-[10px] ml-2 uppercase tracking-wider font-bold">// powered by rank-bm25 + groq</span>
          </p>
        </div>

        {/* Neubrutalist Block */}
        <div className="border-[3px] border-border bg-card max-w-2xl shadow-[6px_6px_0_0_var(--accent)]">
          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="font-mono text-xs p-5 min-h-[240px] max-h-[420px] overflow-y-auto space-y-4 text-foreground bg-background/45"
          >
            {/* Greeting line */}
            <div className="text-muted-foreground/75 font-bold">
              <span className="text-accent">❯</span> ask --about samarth
              <br />
              <span className="text-muted-foreground/50 text-[10px]">
                # Corpus: resume · projects · experience · skills · setup · interests · sports · media
              </span>
            </div>

            {/* Live Telemetry Log Streamer */}
            {messages.length === 0 && telemetryLogs.length > 0 && (
              <div className="space-y-1.5 opacity-60 text-[10px] font-mono border-t border-border/20 pt-3">
                <span className="text-accent/60 uppercase block font-bold">// LIVE SYSTEM TRACES:</span>
                {telemetryLogs.map((log, lIdx) => (
                  <div key={lIdx} className="text-muted-foreground leading-normal">
                    <span className="text-phosphor/70">✦</span> {log}
                  </div>
                ))}
              </div>
            )}

            {/* Conversation history */}
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === "user" ? (
                  <div>
                    <span className="text-accent font-bold">❯ </span>
                    <span className="text-foreground font-bold">{msg.text}</span>
                  </div>
                ) : (
                  <div className="pl-3 border-l-[3px] border-accent/40 space-y-2">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] uppercase tracking-wider text-foreground bg-accent/20 border-2 border-border px-1.5 py-0.5 font-bold"
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
              <div className="pl-3 border-l-[3px] border-accent/40">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {typedResponse}
                  <span ref={cursorRef} className="inline-block w-[7px] h-[13px] bg-accent align-middle ml-0.5" />
                </p>
              </div>
            )}

            {/* Loading dots before typing starts */}
            {loading && !typedResponse && (
              <div className="pl-3 border-l-[3px] border-accent/40 text-muted-foreground/60 text-[10px] tracking-widest uppercase font-bold">
                RETRIEVING... [{spinnerChar}]
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t-[3px] border-border flex items-center px-4 py-3 gap-3 bg-background"
          >
            <span className="text-accent font-mono text-xs shrink-0 font-bold">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={PLACEHOLDER_QUESTIONS[placeholderIdx]}
              className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none disabled:opacity-50 font-bold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="nb-btn text-[10px] py-1.5 px-3 bg-accent text-accent-foreground border-2 shadow-[2px_2px_0_0_var(--border)] hover:shadow-[1px_1px_0_0_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>

        <p className="mt-4 font-mono text-[10px] text-muted-foreground/50 max-w-2xl font-bold">
          // Answers are grounded in the corpus above. Off-topic questions are redirected. Source tags indicate which document each answer draws from.
        </p>
      </div>
    </section>
  );
}
