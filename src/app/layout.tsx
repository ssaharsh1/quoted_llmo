import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Quoted',
  description: 'Evaluate the likelihood of a blog post being cited by AI models.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <body className={`${inter.variable} font-body antialiased h-full`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
