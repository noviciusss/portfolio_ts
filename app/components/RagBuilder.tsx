"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiTrash2, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const AVAILABLE_BLOCKS = [
  { id: "corpus", name: "Docs Corpus", color: "bg-canvas text-foreground border-ink" },
  { id: "chunker", name: "Recursive Chunker", color: "bg-canvas text-foreground border-ink" },
  { id: "embedder", name: "Vector Embedder", color: "bg-canvas text-foreground border-ink" },
  { id: "qdrant", name: "Qdrant Store", color: "bg-canvas text-foreground border-ink" },
  { id: "rerank", name: "Cross-Encoder Rerank", color: "bg-canvas text-foreground border-ink" },
  { id: "llm", name: "Groq LLM", color: "bg-canvas text-foreground border-ink" },
];

export default function RagBuilder() {
  const [pipeline, setPipeline] = useState<string[]>([]);
  const [result, setResult] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  });

  const addBlock = (id: string) => {
    if (pipeline.includes(id)) return;
    setPipeline([...pipeline, id]);
    setResult({ status: "idle", message: "" });
  };

  const removeBlock = (id: string) => {
    setPipeline(pipeline.filter((item) => item !== id));
    setResult({ status: "idle", message: "" });
  };

  const clearPipeline = () => {
    setPipeline([]);
    setResult({ status: "idle", message: "" });
  };

  const runPipeline = () => {
    if (pipeline.length === 0) {
      setResult({
        status: "error",
        message: "Pipeline is empty. Select components to build a retrieval flow.",
      });
      return;
    }

    // Validation checks
    const corpusIdx = pipeline.indexOf("corpus");
    const chunkerIdx = pipeline.indexOf("chunker");
    const embedderIdx = pipeline.indexOf("embedder");
    const qdrantIdx = pipeline.indexOf("qdrant");
    const rerankIdx = pipeline.indexOf("rerank");
    const llmIdx = pipeline.indexOf("llm");

    // 1. Must start with corpus
    if (pipeline[0] !== "corpus") {
      setResult({
        status: "error",
        message: "Pipeline failed: You must start with 'Docs Corpus' to ingest raw sources.",
      });
      return;
    }

    // 2. Chunker must precede Embedder
    if (chunkerIdx === -1 || (embedderIdx !== -1 && embedderIdx < chunkerIdx)) {
      setResult({
        status: "error",
        message: "Pipeline failed: Embedding raw, unchunked documents will exceed token thresholds and dilute retrieval precision. Chunk the text first.",
      });
      return;
    }

    // 3. Embedder must precede Qdrant
    if (qdrantIdx !== -1 && (embedderIdx === -1 || qdrantIdx < embedderIdx)) {
      setResult({
        status: "error",
        message: "Pipeline failed: Qdrant is a Vector Database. You must calculate embeddings via 'Vector Embedder' before writing to the vector store.",
      });
      return;
    }

    // 4. Must end with LLM
    if (pipeline[pipeline.length - 1] !== "llm") {
      setResult({
        status: "error",
        message: "Pipeline failed: You must end the pipeline with 'Groq LLM' to synthesize the final natural language answer.",
      });
      return;
    }

    // 5. Must have Qdrant or Rerank before LLM
    if (qdrantIdx === -1) {
      setResult({
        status: "error",
        message: "Pipeline failed: The generator (LLM) has no index source. You must write chunks to 'Qdrant Store' to enable vector queries.",
      });
      return;
    }

    // Advanced: checks rerank is placed correctly after qdrant but before LLM
    if (rerankIdx !== -1 && (rerankIdx < qdrantIdx || rerankIdx > llmIdx)) {
      setResult({
        status: "error",
        message: "Pipeline failed: 'Cross-Encoder Rerank' must reside between the retrieval step (Qdrant Store) and the generative synthesis step (Groq LLM).",
      });
      return;
    }

    // Success state
    const hasReranker = rerankIdx !== -1;
    setResult({
      status: "success",
      message: hasReranker
        ? "SUCCESS: Reranked Hybrid RAG Pipeline compiled! Accuracy: 89.2% | Latency: 1.4s | Cross-encoder rerank active."
        : "SUCCESS: Standard Vector RAG Pipeline compiled! Accuracy: 74.5% | Latency: 1.8s. (Tip: Try adding 'Cross-Encoder Rerank' before the LLM to boost accuracy to 89.2%!).",
    });
  };

  return (
    <div className="border-[3px] border-ink bg-card p-6 md:p-8 shadow-[6px_6px_0_0_var(--ink)] w-full">
      <div className="mb-6">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">
          // INTERACTIVE PIPELINE HARNESS
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-foreground leading-none">
          RAG Pipeline compiler
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans">
          Click the pipeline blocks below to construct a retrieval-augmented generation pipeline. Compile and run to evaluate accuracy and speed index.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Available Components */}
        <div className="md:col-span-5 space-y-3">
          <span className="font-mono text-[10px] font-bold text-foreground/60 uppercase">// Available Blocks:</span>
          <div className="flex flex-wrap md:flex-col gap-2">
            {AVAILABLE_BLOCKS.map((block) => {
              const selected = pipeline.includes(block.id);
              return (
                <button
                  key={block.id}
                  disabled={selected}
                  onClick={() => addBlock(block.id)}
                  className={`border-2 border-ink px-3 py-2 text-xs font-mono font-bold text-left transition-all ${
                    selected
                      ? "opacity-35 cursor-not-allowed bg-muted"
                      : "bg-canvas hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--ink)] cursor-pointer shadow-[4px_4px_0_0_var(--ink)]"
                  }`}
                >
                  {block.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Drag/Click Tray */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] font-bold text-foreground/60 uppercase">// Current Layout:</span>
            {pipeline.length > 0 && (
              <button
                onClick={clearPipeline}
                className="font-mono text-[10px] font-bold text-[#e5484d] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FiTrash2 /> Reset
              </button>
            )}
          </div>

          <div className="border-[3px] border-ink p-4 min-h-[160px] bg-background/50 flex flex-col justify-start gap-2 relative">
            {pipeline.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="font-mono text-xs text-muted-foreground/60 uppercase">
                  No blocks selected. Click blocks on the left.
                </span>
              </div>
            ) : (
              <AnimatePresence>
                {pipeline.map((item, idx) => {
                  const block = AVAILABLE_BLOCKS.find((b) => b.id === item);
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="border-2 border-ink px-3 py-2 bg-canvas flex items-center justify-between shadow-[2px_2px_0_0_var(--ink)]"
                    >
                      <span className="font-mono text-xs font-bold text-foreground">
                        {idx + 1}. {block?.name}
                      </span>
                      <button
                        onClick={() => removeBlock(item)}
                        className="text-muted-foreground hover:text-foreground text-xs font-bold cursor-pointer"
                      >
                        &times;
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {/* Action Row */}
          <div className="flex gap-3">
            <button
              onClick={runPipeline}
              className="nb-btn nb-btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <FiPlay className="h-3 w-3" /> COMPILE_&_RUN
            </button>
          </div>

          {/* Results Block */}
          {result.status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border-[3px] border-ink p-4 font-mono text-xs ${
                result.status === "success"
                  ? "bg-phosphor/20 text-foreground shadow-[4px_4px_0_0_var(--phosphor)]"
                  : "bg-destructive/10 text-destructive shadow-[4px_4px_0_0_var(--destructive)]"
              }`}
            >
              <div className="flex gap-2 items-start">
                {result.status === "success" ? (
                  <FiCheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <FiAlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <p className="font-bold leading-relaxed">{result.message}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
