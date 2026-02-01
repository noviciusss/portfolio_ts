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

// Enhanced metadata for maximum SEO - optimized for "Samarth Pratap Singh" searches
export const metadata: Metadata = {
  title: "Samarth Pratap Singh | GenAI & RAG Engineer | BTech CSE VIT Bhopal",
  description: "Samarth Pratap Singh - BTech CSE student (CGPA 8.45) at VIT Bhopal specializing in GenAI, RAG systems, and LLMOps. Building production LLM applications with hybrid search, LoRA fine-tuning, and semantic retrieval. Published models on Hugging Face. Portfolio: https://portfolio-noviciusss.vercel.app | GitHub: github.com/noviciusss | LinkedIn: linkedin.com/in/spsamar",
  keywords: "Samarth Pratap Singh, Samarth Singh, GenAI Engineer, RAG Engineer, Retrieval Augmented Generation, LLMOps, VIT Bhopal CSE, LangChain, Qdrant, FAISS, Vector Database, PEFT, LoRA, Transformers, FLAN-T5, RoBERTa, Hugging Face, FastAPI, PyTorch, Semantic Search, AI Engineer Intern, Machine Learning Intern, spsamar, noviciusss",
  authors: [{ name: "Samarth Pratap Singh", url: "https://github.com/noviciusss" }],
  creator: "Samarth Pratap Singh",
  publisher: "Samarth Pratap Singh",
  alternates: {
    canonical: "https://portfolio-noviciusss.vercel.app/",
  },
  openGraph: {
    title: "Samarth Pratap Singh | GenAI & RAG Engineer | Portfolio",
    description: "Samarth Pratap Singh - Building production RAG systems and fine-tuning LLMs. 8.45 CGPA BTech CSE student at VIT Bhopal seeking GenAI internships.",
    url: "https://portfolio-noviciusss.vercel.app/",
    siteName: "Samarth Pratap Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://portfolio-noviciusss.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Samarth Pratap Singh - GenAI & RAG Engineer Portfolio",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Pratap Singh | GenAI & RAG Engineer",
    description: "Samarth Pratap Singh - Specialist in RAG, LLMOps, and production LLM systems",
    creator: "@samarthsingh",
  },
  applicationName: "Samarth Pratap Singh Portfolio",
  viewport: "width=device-width, initial-scale=1",
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "CdME70gHXlLmtAOMhTNcQzG6HqNYmH96AGXzCZzDwKM",
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
        
        {/* Add enhanced structured data for better SEO and Google Knowledge Graph */}
        <Script id="person-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Samarth Pratap Singh",
            "alternateName": ["Samarth Singh", "spsamar", "noviciusss"],
            "url": "https://portfolio-noviciusss.vercel.app",
            "image": "https://portfolio-noviciusss.vercel.app/logo.png",
            "jobTitle": "GenAI & RAG Engineer | BTech CSE Student",
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "VIT Bhopal University"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "VIT Bhopal University",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhopal",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "India"
              }
            },
            "homeLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pratapgarh",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "India"
              }
            },
            "sameAs": [
              "https://github.com/noviciusss",
              "https://linkedin.com/in/spsamar",
              "https://huggingface.co/noviciusss",
              "https://leetcode.com/Sam_9415",
              "https://portfolio-noviciusss.vercel.app"
            ],
            "knowsAbout": [
              "Generative AI", "RAG", "Retrieval Augmented Generation", "LLMOps",
              "LangChain", "LangGraph", "Agno", "Qdrant", "FAISS", "Vector Databases",
              "PEFT", "LoRA", "Transformers", "Fine-Tuning", "Hugging Face",
              "PyTorch", "FastAPI", "Semantic Search", "Machine Learning",
              "Python", "TypeScript", "Next.js", "React", "Node.js"
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "Google IT Support Professional Certificate",
                "credentialCategory": "Certificate",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Google"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "name": "Applied Machine Learning in Python",
                "credentialCategory": "Certificate",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Coursera"
                }
              }
            ],
            "description": "BTech CSE student (CGPA 8.45) at VIT Bhopal specializing in Generative AI, RAG systems, and LLMOps. Building production LLM applications with hybrid search, LoRA fine-tuning, and semantic retrieval.",
            "email": "samarth9415@gmail.com"
          })}
        </Script>
        
        {/* Portfolio/Website Schema */}
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Samarth Pratap Singh Portfolio",
            "alternateName": "Samarth Singh Portfolio",
            "url": "https://portfolio-noviciusss.vercel.app",
            "author": {
              "@type": "Person",
              "name": "Samarth Pratap Singh"
            },
            "description": "Official portfolio website of Samarth Pratap Singh - GenAI & RAG Engineer, showcasing projects, skills, and achievements in AI/ML",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://portfolio-noviciusss.vercel.app/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        
        {/* Organization/ProfilePage Schema */}
        <Script id="profile-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "name": "Samarth Pratap Singh",
              "url": "https://portfolio-noviciusss.vercel.app",
              "interactionStatistic": [
                {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/FollowAction",
                  "userInteractionCount": "GitHub followers and connections"
                }
              ]
            }
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