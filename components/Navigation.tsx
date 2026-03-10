'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'หน้าหลัก', icon: '🏠' },
  { href: '/mood-checkin', label: 'บันทึกอารมณ์', icon: '😊' },
  { href: '/self-assessment', label: 'ประเมินตนเอง', icon: '📋' },
  { href: '/consultation', label: 'ปรึกษา', icon: '💬' },
  { href: '/hr-dashboard', label: 'แดชบอร์ด HR', icon: '📊' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-gray-800 hidden sm:block">
              Mental Health
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Privacy badge */}
          <div className="hidden md:flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
            <span>🔒</span>
            <span>ข้อมูลปลอดภัย</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="เปิด/ปิดเมนู"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium mt-1 transition-colors ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-1 text-green-700 bg-green-50 px-3 py-2 rounded-lg text-xs font-medium border border-green-200">
            <span>🔒</span>
            <span>ข้อมูลทั้งหมดถูกปกป้อง ไม่มีการระบุตัวตน</span>
          </div>
        </div>
      )}
    </nav>
  );
}
