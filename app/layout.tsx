import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'How India Votes Civic Education Platform',
  description:
    'An immersive civic-education platform teaching the complete Indian election process — from voter registration to result declaration. Explore EVM technology, 2024 election timeline, and test your knowledge.',
  keywords: [
    'India election',
    'ECI',
    'voter education',
    'EVM',
    'VVPAT',
    '2024 general election',
    'civic education',
    'democracy',
    'Lok Sabha',
  ],
  authors: [{ name: 'How India Votes' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'How India Votes — Civic Education Platform',
    description:
      'Immersive civic-education assistant teaching the complete Indian election process through interactive discovery.',
    type: 'website',
    locale: 'en_IN',
  },
  other: {
    'google-site-verification': 'india-votes-civic-platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'How India Votes',
            description: 'Civic education platform for Indian election process',
            inLanguage: 'en-IN',
          })
        }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
