import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Alibaba Cloud Global AI Expansion — Financial Analysis',
  description: 'Financial viability analysis of Alibaba\'s $52.4B AI infrastructure investment. NPV, IRR, MIRR, real options and scenario analysis.',
  keywords: ['Alibaba', 'Cloud', 'AI', 'Financial Analysis', 'Investment', 'NPV', 'IRR'],
  openGraph: {
    title: 'Alibaba Cloud Global AI Expansion — Financial Analysis',
    description: 'Financial viability analysis of Alibaba\'s $52.4B AI infrastructure investment',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0D0D0D] text-white antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
