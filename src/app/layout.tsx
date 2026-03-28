import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Space_Mono } from 'next/font/google';
import './globals.css';

// ─── Google Fonts via next/font (zero CLS, self-hosted automatically) ────────
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'], // ← quan trọng
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',          // giữ nguyên tên variable để không cần sửa chỗ khác
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
});
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Cluster — AI-Powered Enterprise OS',
  description:
    'Cluster tích hợp AI Orchestrator với hệ thống ERP hiện đại — tự động hóa quy trình vận hành, kết nối dữ liệu thời gian thực và ra quyết định thông minh hơn.',
  keywords: ['AI', 'ERP', 'AI Agent', 'Doanh nghiệp', 'Tự động hóa', 'Cluster'],
  openGraph: {
    title: 'Cluster — AI-Powered Enterprise OS',
    description: 'Quản lý & điều hành doanh nghiệp hiệu quả hơn bằng AI Agent và ERP hiện đại.',
    type: 'website',
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${spaceMono.variable}`}>
      <body
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          backgroundColor: '#080808',
          color: '#e5e5e5',
        }}
      >
        {children}
      </body>
    </html>
  );
}