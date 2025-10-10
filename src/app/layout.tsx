import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'NetOps Central',
  description: 'Manage your network operations with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashboardBg = PlaceHolderImages.find(img => img.id === 'dashboard-background');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;700&family=Outfit:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased no-scrollbar">
        {dashboardBg && (
          <div className='fixed top-0 left-0 z-[-1] h-full w-full'>
            <img
              src={dashboardBg.imageUrl}
              alt="Abstract background"
              className='absolute top-0 left-0 z-[-1] h-full w-full object-cover'
            />
            <div className='absolute top-0 left-0 z-[-1] h-full w-full bg-white/90 backdrop-blur-sm'
            ></div>
          </div>
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
