import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rindell AI - Your AI Document Analyst',
  description: 'Send PDFs, Word docs, and spreadsheets to Rindell AI via WhatsApp and get instant intelligent analysis, summaries, and solutions.',
  keywords: 'AI document analysis, WhatsApp AI, PDF analysis, document summarization',
  openGraph: {
    title: 'Rindell AI - Your AI Document Analyst',
    description: 'Instant AI-powered document analysis, right in WhatsApp.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
