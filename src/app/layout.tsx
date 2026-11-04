import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import AppShell from '../components/AppShell';

export const metadata: Metadata = {
  title: 'AgroCare — Complete Agriculture E-commerce & Agritech Platform',
  description: 'Smart B2B2C Agritech Platform for Farmers, Retailers, Suppliers & Agronomists across West Bengal and India. Authentic Agri-inputs, AI Crop Doctor & Wholesale Marketplace.',
  keywords: 'AgroCare, Agriculture, E-commerce, Fertilizer, Seeds, Pesticides, AI Crop Doctor, West Bengal, Krishak Bandhu, Wholesale Farming',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <AppShell>
                {children}
              </AppShell>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

