import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CrudeIntel - AI-Powered Crude Oil Price Intelligence',
  description:
    'Track real-time crude oil prices (WTI, Brent, OPEC, Dubai), detect arbitrage opportunities, and get AI-powered price predictions. Built with Next.js and Google Gemini AI.',
  keywords: [
    'crude oil',
    'oil prices',
    'WTI',
    'Brent crude',
    'OPEC',
    'oil market',
    'price prediction',
    'AI predictions',
    'arbitrage',
    'commodity trading',
    'energy market',
    'oil analytics',
  ],
  authors: [{ name: 'Keshav Agarwal', url: 'https://github.com/KeshavDev15' }],
  creator: 'Keshav Agarwal',
  publisher: 'Keshav Agarwal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crudeintel-one.vercel.app',
    siteName: 'CrudeIntel',
    title: 'CrudeIntel - AI-Powered Crude Oil Price Intelligence',
    description:
      'Track real-time crude oil prices, detect arbitrage opportunities, and get AI-powered price predictions with sentiment analysis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CrudeIntel - AI-Powered Oil Price Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrudeIntel - AI-Powered Crude Oil Price Intelligence',
    description:
      'Real-time oil prices, arbitrage detection, and AI predictions for WTI, Brent, OPEC & more.',
    images: ['/og-image.png'],
    creator: '@keshavagarwal',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950">
        <Providers>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
