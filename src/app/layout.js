import './globals.css'

export const metadata = {
  title: 'CVC Infinity Pro',
  description: 'Outil thermodynamique expert pour le calcul de cycles frigorifiques',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
