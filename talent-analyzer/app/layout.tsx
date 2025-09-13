import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doombringer Talent Analyzer',
  description: 'Interactive talent analysis for Tales of Maj\'Eyal Doombringer class',
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