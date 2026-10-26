from collections import defaultdict
import json
import os
import pathlib
import string
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from groq import Groq
from pydantic import BaseModel, Field
from rank_bm25 import BM25Okapi

try:
    from dotenv import load_dotenv

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
    allow_headers=["*"] ,
)


def clean_tokenize(text: str) -> list[str]:
    translator = str.maketrans(string.punctuation, " " * len(string.punctuation))
    cleaned = text.translate(translator).lower()
    return cleaned.split()


_corpus_path = pathlib.Path(__file__).parent.parent / "corpus.json"
with open(_corpus_path, encoding="utf-8") as corpus_file:
    corpus = json.load(corpus_file)

tokenized = [clean_tokenize(chunk["text"]) for chunk in corpus]
bm25 = BM25Okapi(tokenized)

SYSTEM_PROMPT = (
    "You are an assistant that answers questions about Samarth Pratap Singh based solely on "
    "the provided context excerpts from his portfolio and resume. Be concise and precise. "
    "If the context does not contain an answer, say: 'That detail isn't in my current context — "
    "try reaching out to Samarth directly via the contact form.' "
    "Do not make up information or answer questions unrelated to Samarth."
)

OFF_TOPIC_KEYWORDS = [
    "weather",
    "recipe",
    "joke",
    "news",
    "stock",
    "politic",
    "president",
    "celebrity",
]

RATE_LIMIT_WINDOW = 60
RATE_LIMIT_MAX_REQUESTS = 5
ip_requests = defaultdict(list)


class Question(BaseModel):
    question: str = Field(..., max_length=1000)


def response_message(answer: str, sources: list[str], status_code: int = 200) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={"answer": answer, "sources": sources},
    )


@app.post("/api/ask")
@app.post("/")
def ask(q: Question, request: Request):
    question = q.question.strip()
    if len(question) < 3:
        return response_message(
            "Please ask a more specific question about Samarth's background or work.",
            [],
            400,
        )

    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    ip_requests[client_ip] = [
        timestamp
        for timestamp in ip_requests[client_ip]
        if now - timestamp < RATE_LIMIT_WINDOW
    ]

    if len(ip_requests[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        return JSONResponse(
            status_code=429,
            headers={"Retry-After": str(RATE_LIMIT_WINDOW)},
            content={
                "answer": "Rate limit reached. Please wait a minute before trying again.",
                "sources": [],
            },
        )
    ip_requests[client_ip].append(now)

    api_key = os.environ.get("GROQ_API_KEY", "").strip()
    if not api_key or api_key == "your_groq_api_key_here":
        return response_message(
            "The optional assistant is unavailable right now. Please use the project links or contact form instead.",
            [],
            503,
        )

    question_lower = question.lower()
    if any(keyword in question_lower for keyword in OFF_TOPIC_KEYWORDS):
        return response_message(
            "I can only answer questions about Samarth's work, skills, and projects. Try asking about his RAG systems, projects, or experience.",
            [],
        )

    scores = bm25.get_scores(clean_tokenize(question))
    ranked = sorted(zip(scores, corpus), key=lambda item: -item[0])
    top = ranked[:3]
    context = "\n\n".join(
        f"[Source: {chunk['source']}]\n{chunk['text']}" for _, chunk in top
    )

    try:
        try:
            timeout_seconds = min(
                max(float(os.environ.get("GROQ_TIMEOUT_SECONDS", "8")), 1.0),
                8.5,
            )
        except ValueError:
            timeout_seconds = 8.0

        groq_client = Groq(api_key=api_key, timeout=timeout_seconds, max_retries=0)
        completion = groq_client.chat.completions.create(
            model=os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b"),
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {question}",
                },
            ],
            max_tokens=400,
            temperature=0.3,
        )
        answer = completion.choices[0].message.content or "I couldn't generate an answer right now."
        sources = list(dict.fromkeys(chunk["source"] for _, chunk in top))
        return response_message(answer, sources)
    except Exception as error:
        error_name = type(error).__name__.lower()
        if "auth" in error_name or "authentication" in str(error).lower():
            return response_message(
                "The optional assistant is unavailable because its provider configuration needs attention.",
                [],
                503,
            )
        return response_message(
            "The optional assistant is temporarily unavailable. Please try again or use the contact form.",
            [],
            503,
        )
