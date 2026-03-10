import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'แพลตฟอร์มสุขภาพจิต | Mental Health Wellness',
  description: 'แพลตฟอร์มดูแลสุขภาพจิตสำหรับองค์กร - ปลอดภัย ไม่เปิดเผยตัวตน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-gray-50 min-h-screen">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
