// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'RED Product App',
  description: 'Application de gestion de produits et hôtels',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="layout-container">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
