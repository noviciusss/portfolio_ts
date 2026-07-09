from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rank_bm25 import BM25Okapi
from groq import Groq
import json
import os
import pathlib
import time
import string
from collections import defaultdict

try:
    from dotenv import load_dotenv
    # Load environment variables from .env.local or .env in local development
    _root_dir = pathlib.Path(__file__).parent.parent
    _env_local = _root_dir / ".env.local"
    _env_base = _root_dir / ".env"
    if _env_local.exists():
        load_dotenv(dotenv_path=_env_local)
    elif _env_base.exists():
        load_dotenv(dotenv_path=_env_base)
except ImportError:
    pass

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Helper to clean and tokenize text for BM25 matching (ignoring punctuation)
def clean_tokenize(text: str) -> list[str]:
    translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))
    cleaned = text.translate(translator).lower()
    return cleaned.split()

# Load corpus once per cold start (not per request)
_corpus_path = pathlib.Path(__file__).parent.parent / "corpus.json"
with open(_corpus_path) as f:
    corpus = json.load(f)  # list of {"text": "...", "source": "..."}

tokenized = [clean_tokenize(c["text"]) for c in corpus]
bm25 = BM25Okapi(tokenized)

SYSTEM_PROMPT = (
    "You are an assistant that answers questions about Samarth Pratap Singh based solely on "
    "the provided context excerpts from his portfolio and resume. Be concise and precise. "
    "If the context does not contain an answer, say: 'That detail isn't in my current context — "
    "try reaching out to Samarth directly via the contact form.' "
    "Do not make up information or answer questions unrelated to Samarth."
)

OFF_TOPIC_KEYWORDS = [
    "weather", "recipe", "joke", "news", "stock", "game", "movie", "music",
    "sport", "politic", "president", "celebrity"
]

# Sliding window rate limiter state
RATE_LIMIT_WINDOW = 60  # seconds
RATE_LIMIT_MAX_REQUESTS = 5
ip_requests = defaultdict(list)

class Question(BaseModel):
    question: str

@app.post("/api/ask")
@app.post("/")
def ask(q: Question, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    # Prune timestamps older than window
    ip_requests[client_ip] = [t for t in ip_requests[client_ip] if now - t < RATE_LIMIT_WINDOW]
    
    if len(ip_requests[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        return {
            "answer": "Rate limit exceeded. Please wait a minute before sending another query to conserve Groq API quota.",
            "sources": ["System Rate Limiter"]
        }
        
    ip_requests[client_ip].append(now)

    api_key = os.environ.get("GROQ_API_KEY", "").strip()
    if not api_key or api_key == "your_groq_api_key_here":
        return {
            "answer": "Groq API Key is not configured on the server. Please add your real `GROQ_API_KEY` to the `.env.local` file and restart your Python server to activate the RAG chatbot.",
            "sources": ["System Configuration"]
        }

    question_lower = q.question.lower().strip()

    # Off-topic guardrail
    if any(kw in question_lower for kw in OFF_TOPIC_KEYWORDS):
        return {
            "answer": "I can only answer questions about Samarth's work, skills, and projects. Try asking about his RAG systems, projects, or experience.",
            "sources": []
        }

    if len(q.question.strip()) < 3:
        return {
            "answer": "Please ask a more specific question about Samarth's background or work.",
            "sources": []
        }

    # BM25 retrieval — top 3 chunks
    scores = bm25.get_scores(clean_tokenize(q.question))
    ranked = sorted(zip(scores, corpus), key=lambda x: -x[0])
    top = ranked[:3]

    # Build context string
    context = "\n\n".join(
        f"[Source: {c['source']}]\n{c['text']}" for _, c in top
    )

    try:
        groq_client = Groq(api_key=api_key)
        # Groq LLM call
        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {q.question}"
                },
            ],
            max_tokens=400,
            temperature=0.3,
        )
        answer = completion.choices[0].message.content
        sources = list(dict.fromkeys(c["source"] for _, c in top))  # deduplicated, ordered
        return {"answer": answer, "sources": sources}

    except Exception as e:
        error_msg = str(e)
        if "Authentication" in error_msg or "API key" in error_msg or "Invalid" in error_msg:
            return {
                "answer": "Authentication failed: The provided Groq API Key appears to be invalid. Please verify the key in your `.env.local` file.",
                "sources": ["System Authentication"]
            }
        return {
            "answer": f"An error occurred while connecting to Groq: {error_msg}",
            "sources": ["API Error"]
        }

