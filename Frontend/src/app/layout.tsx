import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from '@/app/page.module.scss'
import { Navbar } from '@/app/Components/Navbar/Navbar'
import { Providers } from '@/redux/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marvel App',
  description: 'Next App MarvelApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bodyStyle = {
    margin: 0
  };

  return (
    <Providers>
      <html lang="en">
        <head>
          <meta name="author" content="Jonathan Stiven Soto Pantoja" />
        </head>
        <body className={inter.className} style={bodyStyle}>
          <Navbar />
          <div className={styles.container}>
            {children}
          </div>
        </body>
      </html>
    </Providers>
  )
}
