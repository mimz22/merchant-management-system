import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'MerchantHub - Premium Business Management Platform',
  description: 'Luxury merchant management platform for sophisticated businesses. Advanced analytics, seamless operations, and intelligent insights for discerning entrepreneurs.',
  keywords: 'luxury merchant management, premium business platform, sophisticated analytics, MerchantHub, high-end merchant solutions',
  authors: [{ name: 'MerchantHub' }],
  openGraph: {
    title: 'MerchantHub - Premium Business Management',
    description: 'Elevate your business with our luxury merchant management platform',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${montserrat.className} bg-black text-white antialiased`}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('error', function(e) {
              if (e.filename && e.filename.includes('content_script.js')) {
                e.preventDefault();
                return false;
              }
            });
          `
        }} />
      </body>
    </html>
  )
}