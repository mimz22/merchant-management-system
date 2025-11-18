import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'Merchant Management System',
  description: 'Manage your merchants efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={montserrat.className}>
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