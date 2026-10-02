import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-noviciusss.vercel.app"),
  title: "Samarth Pratap Singh — AI Engineer (RAG, LLM Agents, Evals)",
  description:
    "AI Engineer building RAG systems, LLM agents and evaluation harnesses. Final-year CSE at VIT Bhopal; AI/ML intern at AmberFlux EdgeAI. Open to 2027 roles.",
  authors: [{ name: "Samarth Pratap Singh", url: "https://github.com/noviciusss" }],
  creator: "Samarth Pratap Singh",
  publisher: "Samarth Pratap Singh",
  alternates: {
    canonical: "https://portfolio-noviciusss.vercel.app/",
  },
  openGraph: {
    title: "Samarth Pratap Singh — AI Engineer (RAG, LLM Agents, Evals)",
    description:
      "AI Engineer building RAG systems, LLM agents and evaluation harnesses. Final-year CSE at VIT Bhopal; AI/ML intern at AmberFlux EdgeAI. Open to 2027 roles.",
    url: "https://portfolio-noviciusss.vercel.app/",
    siteName: "Samarth Pratap Singh Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Pratap Singh — AI Engineer (RAG, LLM Agents, Evals)",
    description:
      "AI Engineer building RAG systems, LLM agents and evaluation harnesses. Final-year CSE at VIT Bhopal; AI/ML intern at AmberFlux EdgeAI. Open to 2027 roles.",
  },
  applicationName: "Samarth Pratap Singh Portfolio",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "CdME70gHXlLmtAOMhTNcQzG6HqNYmH96AGXzCZzDwKM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured Data (JSON-LD) */}
        <Script id="person-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Samarth Pratap Singh",
            alternateName: ["Samarth Singh", "spsamar", "noviciusss"],
            url: "https://portfolio-noviciusss.vercel.app",
            jobTitle: "AI Engineer",
            worksFor: {
              "@type": "Organization",
              name: "AmberFlux EdgeAI Private Limited",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "VIT Bhopal University",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bhopal",
                addressRegion: "Madhya Pradesh",
                addressCountry: "India",
              },
            },
            homeLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pratapgarh",
                addressRegion: "Uttar Pradesh",
                addressCountry: "India",
              },
            },
            sameAs: [
              "https://github.com/noviciusss",
              "https://linkedin.com/in/spsamar",
              "https://huggingface.co/noviciusss",
              "https://leetcode.com/Sam_9415",
            ],
            knowsAbout: [
              "Generative AI",
              "RAG",
              "Retrieval Augmented Generation",
              "LLM Agents",
              "LangGraph",
              "Evaluation Harnesses",
              "Qdrant",
              "FastMCP",
              "FastAPI",
              "PyTorch",
              "TypeScript",
              "Next.js",
              "Docker",
            ],
            description:
              "AI Engineer building RAG systems, LLM agents and evaluation harnesses. Final-year CSE at VIT Bhopal; AI/ML intern at AmberFlux EdgeAI.",
            email: "samarthsin2006@gmail.com",
          })}
        </Script>

        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Samarth Pratap Singh Portfolio",
            url: "https://portfolio-noviciusss.vercel.app",
            author: {
              "@type": "Person",
              name: "Samarth Pratap Singh",
            },
            description:
              "AI Engineer building RAG systems, LLM agents and evaluation harnesses.",
          })}
        </Script>
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}