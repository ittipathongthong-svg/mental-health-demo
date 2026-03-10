import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Mental Health Wellness Platform | แพลตฟอร์มสุขภาพจิต',
  description:
    'แพลตฟอร์มดูแลสุขภาพจิตและความเป็นอยู่ที่ดีสำหรับพนักงาน ออกแบบมาเพื่อความเป็นส่วนตัวและความปลอดภัยทางจิตใจ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
