import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Order Confirmation System',
  description: 'Multi-language order confirmation call system for India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
