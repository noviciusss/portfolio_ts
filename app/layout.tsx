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
  title: "Samarth Singh - Full Stack Developer Portfolio",
  description: "Full stack developer specializing in Next.js, React, and modern web technologies, creating beautiful and responsive web applications.",
  keywords: ["developer", "nextjs", "react", "portfolio", "fullstack", "web developer"],
  authors: [{ name: "Samarth Singh" }],
  openGraph: {
    title: "Samarth Singh - Full Stack Developer",
    description: "Full stack developer specializing in Next.js, React, and modern web technologies.",
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
    title: "Samarth Singh - Full Stack Developer",
    description: "Full stack developer specializing in Next.js, React, and modern web technologies.",
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
            "name": "Samarth Singh",
            "url": "https://samarthsingh.vercel.app",
            "jobTitle": "Full Stack Developer",
            "sameAs": [
              "https://github.com/noviciusss",
              "https://linkedin.com/in/samarth-singh"
            ],
            "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"]
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