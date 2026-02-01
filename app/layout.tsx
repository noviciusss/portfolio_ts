import type { Metadata } from "next";
import { Inter, Raleway } from 'next/font/google';
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ModernBackground from "./components/BackgroundMesh";
import Script from "next/script";

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Improved metadata for SEO
export const metadata: Metadata = {
  title: "Samarth Pratap Singh | GenAI & RAG Engineer | BTech CSE",
  description: "BTech CSE student (CGPA 8.45) specializing in GenAI, RAG systems, and LLMOps. Building production LLM applications with hybrid search, LoRA fine-tuning, and semantic retrieval. Published models on Hugging Face.",
  keywords: "GenAI, RAG, Retrieval Augmented Generation, LLMOps, LangChain, Qdrant, FAISS, Vector Database, PEFT, LoRA, Transformers, FLAN-T5, RoBERTa, Hugging Face, FastAPI, PyTorch, Semantic Search, AI Engineer Intern, Machine Learning Intern",
  authors: [{ name: "Samarth Pratap Singh" }],
  openGraph: {
    title: "Samarth Pratap Singh | GenAI & RAG Engineer",
    description: "Building production RAG systems and fine-tuning LLMs. 8.45 CGPA BTech CSE student seeking GenAI internships.",
    url: "https://samarthsingh.vercel.app/",
    siteName: "Samarth Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://samarthsingh.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samarth Singh - Full Stack Developer",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Pratap Singh | GenAI & RAG Engineer",
    description: "Specialist in RAG, LLMOps, and production LLM systems",
  },
  applicationName: "Samarth Singh Portfolio",
  viewport: "width=device-width, initial-scale=1",
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Add structured data for better SEO */}
        <Script id="person-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Samarth Pratap Singh",
            "url": "https://samarthsingh.vercel.app",
            "jobTitle": "GenAI & RAG Engineer | BTech CSE Student",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "VIT Bhopal University"
            },
            "sameAs": [
              "https://github.com/noviciusss",
              "https://linkedin.com/in/spsamar"
            ],
            "knowsAbout": [
              "RAG", "Retrieval Augmented Generation", "GenAI", "LLMOps",
              "LangChain", "Qdrant", "FAISS", "Vector Databases",
              "PEFT", "LoRA", "Transformers", "Fine-Tuning",
              "PyTorch", "FastAPI", "Hugging Face", "Semantic Search",
              "Python", "TypeScript", "Next.js", "Machine Learning"
            ]
          })}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <NextThemesProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ModernBackground />
          {children}
        </NextThemesProvider>
        
        {/* Preload crucial resources */}
        <link rel="preload" as="image" href="/profile.jpg" />
      </body>
    </html>
  );
}