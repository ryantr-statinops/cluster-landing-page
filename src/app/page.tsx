// src/app/page.tsx
// Server Component (default) — không cần 'use client'
// IntersectionObserver được tách riêng vào <ScrollReveal />

import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm'; 
import VisualWorkflow from '@/components/VisualWorkflow';

// ─────────────────────────────────────────────────────────────────────────────
// Logo Icon (dùng lại nhiều nơi)
// ─────────────────────────────────────────────────────────────────────────────
function LogoIcon({ size = 7 }: { size?: number }) {
  // Dùng pixel cố định thay vì Tailwind dynamic class (w-${size} không work khi purge)
  const px = size * 4; // w-7 = 28px
  return (
    <div style={{ width: px, height: px }} className="relative flex-shrink-0">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
        {/* Ô trên-trái: sáng nhất */}
        <div
          className="rounded-[2px]"
          style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #0e7490 100%)' }}
        />
        {/* Ô trên-phải: tối hơn một chút */}
        <div
          className="rounded-[2px]"
          style={{ background: '#0e7490', opacity: 0.85 }}
        />
        {/* Ô dưới-trái: tối hơn */}
        <div
          className="rounded-[2px]"
          style={{ background: '#155e75', opacity: 0.7 }}
        />
        {/* Ô dưới-phải: tối nhất */}
        <div
          className="rounded-[2px]"
          style={{ background: '#164e63', opacity: 0.55 }}
        />
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <LogoIcon size={7} />
          <span
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            className="font-extrabold text-white tracking-wider text-lg"
          >
            CLUSTER
          </span>
        </div>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {['Tính năng', 'Quy trình', 'Visual Flow', 'Roadmap'].map((item, i) => {
            const hrefs = ['#focus', '#workflow', '#visual-workflow', '#roadmap'];
            return (
              <a
                key={item}
                href={hrefs[i]}
                className="label text-subtle hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a href="#contact" className="btn-primary hidden sm:inline-block text-xs">
          Liên hệ
        </a>

        {/* Mobile menu toggle (visual only) */}
        <button className="sm:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className="w-5 h-px bg-cyan-400" />
          <span className="w-5 h-px bg-white opacity-50" />
          <span className="w-3 h-px bg-white opacity-30" />
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Glow orbs */}
      <div className="orb w-96 h-96 top-20 -left-32" style={{ background: 'rgba(6,182,212,0.12)' }} />
      <div className="orb w-80 h-80 bottom-20 right-0"  style={{ background: 'rgba(103,232,249,0.06)' }} />
      <div
        className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'rgba(6,182,212,0.05)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-border bg-surface">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="label">R&D Phase — In Progress</span>
        </div>

        {/* Main headline */}
        <div className="max-w-4xl mb-8">
          <h1
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
           className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-2 text-white"
           >
            Quản lý &amp; xử lý
          </h1>
          <h1
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-2 text-white"
          >
            <span className="grad-text">và trực quan hóa</span>
          </h1>
          <h1
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white/60"
          >
            dữ liệu hiệu quả.
          </h1>
        </div>

        {/* Sub */}
        <p className="text-subtle font-mono text-sm leading-relaxed max-w-xl mb-12">
          Cluster là dự án được phát triển nhằm tối ưu hóa khả năng quản lý, đồng bộ và xử lý dữ liệu tự động theo thời gian thực.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://cluster-ai-five.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            trải nghiệm bản mô phỏng
          </a>
          <a href="#focus" className="btn-ghost">
            Xem tài liệu
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg">
          <div>
            <div className="font-display font-bold text-2xl grad-text">3</div>
            <div className="label text-dim mt-1">Layer architecture</div>
          </div>
          <div className="border-l border-border pl-6">
            <div className="font-display font-bold text-2xl grad-text">AI-first</div>
            <div className="label text-dim mt-1">Angent Design approach</div>
          </div>
          <div className="border-l border-border pl-6">
            <div className="font-display font-bold text-2xl grad-text">2027</div>
            <div className="label text-dim mt-1">Target launch</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="label text-xs">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Core Focus Section
// ─────────────────────────────────────────────────────────────────────────────
const focusCards = [
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Spreadsheet & Integration',
    desc: 'AI Agent đọc, phân tích và ghi dữ liệu trực tiếp vào Database, nhận diện các loại dữ liệu tự động, không cần nhập liệu thủ công.',
    tags: ['Database Integration', 'Auto-sync'],
    delay: '0.1s',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI Orchestrator',
    desc: 'Nhiều Model AI Agent đảm nhận điều phối, chạy song song: phân tích dữ liệu, gửi thông báo, cập nhật ERP — tất cả theo luồng logic bạn định nghĩa.',
    tags: ['Multi-agent', 'Workflow Engine', 'Smart Pipeline Logic'],
    delay: '0.2s',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'ERP Theo dõi, quản lý toàn diện dữ liệu doanh nghiệp',
    desc: 'Dashboards và Pivot Tables quản lý toàn bộ hoạt động doanh nghiệp: tài chính, nhân sự, kho hàng — cập nhật liên tục',
    tags: ['Real-time', 'ERP Module'],
    delay: '0.3s',
  },
];

function CoreFocusSection() {
  return (
    <section id="focus" className="relative py-24 md:py-32 overflow-hidden">
      <div className="orb w-72 h-72 top-0 right-20 opacity-50" style={{ background: 'rgba(6,182,212,0.08)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-16">
          <div className="label mb-4">// 01 — Core Focus</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Xây dựng data pipeline hiệu quả <br className="hidden md:block" />
            <span className="grad-text">nhằm tối ưu hóa quy trình xử lý dữ liệu.</span>
          </h2>
          <p className="text-subtle text-sm max-w-lg leading-relaxed">
            Không cần thay thế toàn bộ công cụ hiện có - Cluster hoạt động như một nền tảng trung gian giúp tổng hợp, đồng bộ hóa và xử lý dữ liệu từ nhiều nguồn một cách hiệu quả.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {focusCards.map((card) => (
            <div
              key={card.title}
              className="reveal grad-border rounded p-6 cursor-default"
              style={{ transitionDelay: card.delay }}
            >
              <div
                className="w-10 h-10 mb-6 rounded flex items-center justify-center"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3">{card.title}</h3>
              <p className="text-subtle text-sm leading-relaxed mb-4">{card.desc}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="reveal mt-16 grad-border rounded p-8" style={{ transitionDelay: '0.15s' }}>
          <div className="label mb-6">// Luồng dữ liệu mẫu</div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-0">
            {[
              { num: '01', label: 'Data Input',  sub: 'Combine Data' },
              { num: '02', label: 'AI Process',  sub: 'Orchestrator' },
              { num: '03', label: 'Decision',    sub: 'Logic Layer' },
              { num: '04', label: 'Output',      sub: 'ERP / Alert', highlight: true },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center text-center w-28">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-2"
                    style={{
                      border: `1px solid ${step.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(6,182,212,0.3)'}`,
                      background: step.highlight ? 'rgba(255,255,255,0.05)' : 'rgba(6,182,212,0.1)',
                    }}
                  >
                    <span className={`font-mono text-xs ${step.highlight ? 'text-white' : 'text-cyan-400'}`}>
                      {step.num}
                    </span>
                  </div>
                  <span className={`text-xs font-mono ${step.highlight ? 'text-white' : 'text-subtle'}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-dim font-mono">{step.sub}</span>
                </div>
                {i < 3 && (
                  <>
                    <div className="hidden md:block w-8 h-px mx-2 bg-gradient-to-r from-cyan-500/30 to-cyan-500/10" />
                    <div className="md:hidden text-cyan-500/40 text-lg">↓</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// Workflow Section
// ─────────────────────────────────────────────────────────────────────────────
const workflowSteps = [
  {
    num: '01',
    title: 'Data Source',
    sub: 'Spreadsheet trong Google Sheets',
    delay: '0.1s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[10px] text-subtle mt-4">
        {/* Window Bar */}
        <div className="bg-[#111] px-3 py-2 flex items-center justify-between border-b border-border">
          <span className="text-white/60 flex items-center gap-1.5 text-[9px]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-black font-bold font-sans">S</span> google_sheets_sync.xlsx
          </span>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
          </div>
        </div>
        {/* Spreadsheet Grid */}
        <div className="grid grid-cols-4 bg-border/20 gap-[1px]">
          <div className="bg-[#111] p-1.5 text-center font-bold text-white/40">A</div>
          <div className="bg-[#111] p-1.5 text-center font-bold text-white/40">B</div>
          <div className="bg-[#111] p-1.5 text-center font-bold text-white/40">C</div>
          <div className="bg-[#111] p-1.5 text-center font-bold text-white/40">D</div>
          
          <div className="bg-[#0e0e0e] p-1.5 text-white/80">id_user</div>
          <div className="bg-[#0e0e0e] p-1.5 text-white/80">name</div>
          <div className="bg-[#0e0e0e] p-1.5 text-white/80">revenue</div>
          <div className="bg-[#0e0e0e] p-1.5 text-cyan-400">status</div>
          
          <div className="bg-[#0e0e0e] p-1.5 text-dim">#9081</div>
          <div className="bg-[#0e0e0e] p-1.5 text-white/60 truncate">Alex M.</div>
          <div className="bg-[#0e0e0e] p-1.5 text-emerald-400">$1,450</div>
          <div className="bg-[#0e0e0e] p-1.5"><span className="px-1 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 text-[8px]">Lead</span></div>

          <div className="bg-[#0e0e0e] p-1.5 text-dim">#9082</div>
          <div className="bg-[#0e0e0e] p-1.5 text-white/60 truncate">Sarah K.</div>
          <div className="bg-[#0e0e0e] p-1.5 text-emerald-400">$3,200</div>
          <div className="bg-[#0e0e0e] p-1.5"><span className="px-1 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[8px]">Active</span></div>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Centralized Storage',
    sub: 'Hệ thống lưu trữ File Explorer',
    delay: '0.15s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] mt-4">
        {/* Window Bar */}
        <div className="bg-[#111] px-3 py-2 flex items-center justify-between border-b border-border">
          <span className="text-white/60 flex items-center gap-1.5">📁 Centralized Storage</span>
          <span className="text-dim text-[8px]">/root/data/sync</span>
        </div>
        {/* File Tree */}
        <div className="p-3 space-y-2 text-subtle">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span>📂</span> <span>database_dumps</span>
          </div>
          <div className="pl-4 flex items-center justify-between border-l border-border/40 py-0.5">
            <span className="text-white/80 truncate">📄 orders_q1_2026.csv</span>
            <span className="text-dim text-[7px]">14.2 MB</span>
          </div>
          <div className="pl-4 flex items-center justify-between border-l border-border/40 py-0.5">
            <span className="text-white/80 truncate">📄 marketing_leads.json</span>
            <span className="text-dim text-[7px]">2.1 MB</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span>📂</span> <span>archives_inactive</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Workspace Management',
    sub: 'Phân chia không gian làm việc',
    delay: '0.2s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] p-3 space-y-2 mt-4">
        <div className="flex items-center justify-between p-2 rounded bg-surface border border-cyan-900/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-cyan-400 animate-pulse" />
            <span className="text-white font-bold">AI Workflow Hub</span>
          </div>
          <span className="text-[8px] px-1 bg-cyan-950 text-cyan-400 border border-cyan-800/40 rounded">Active</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded bg-surface border border-border opacity-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-subtle" />
            <span className="text-subtle">Customer Insights</span>
          </div>
          <span className="text-[8px] px-1 bg-border text-dim rounded">Inactive</span>
        </div>
      </div>
    ),
  },
  {
    num: '04',
    title: 'Data Field Structuring',
    sub: 'Định nghĩa bảng Schema dữ liệu',
    delay: '0.25s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] mt-4">
        {/* Window Bar */}
        <div className="bg-[#111] px-3 py-2 flex items-center justify-between border-b border-border">
          <span className="text-white/60">⚙️ Schema Builder (Data Table)</span>
        </div>
        {/* Schema Table */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between border-b border-border/40 pb-1 text-dim text-[8px]">
            <span>Field</span>
            <span>Type</span>
            <span>Validation</span>
          </div>
          <div className="flex items-center justify-between text-white/80 py-0.5">
            <span className="text-cyan-400 font-bold">email</span>
            <span className="text-dim">VARCHAR</span>
            <span className="text-emerald-500">IS_EMAIL</span>
          </div>
          <div className="flex items-center justify-between text-white/80 py-0.5">
            <span className="text-cyan-400 font-bold">amount</span>
            <span className="text-dim">DECIMAL</span>
            <span className="text-yellow-500">GT_ZERO</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '05',
    title: 'Infinite Canvas Interface',
    sub: 'Không gian xử lý vô hạn',
    delay: '0.3s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] relative h-[100px] grid-bg mt-4">
        {/* Zoom controls */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
          <span className="w-4 h-4 bg-[#111] text-white flex items-center justify-center border border-border rounded cursor-default select-none hover:bg-cyan-500/20 text-[9px] font-bold">+</span>
          <span className="w-4 h-4 bg-[#111] text-white flex items-center justify-center border border-border rounded cursor-default select-none hover:bg-cyan-500/20 text-[9px] font-bold">-</span>
        </div>
        {/* Floating Node 1 */}
        <div className="absolute top-2 left-3 p-1 rounded bg-[#0f0f0f] border border-cyan-800/40 text-[7px] text-white">
          <div className="text-cyan-400 font-bold">FlowCanvas</div>
          <div className="text-[6px] text-dim">1920x1080</div>
        </div>
        {/* Connection Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 60,35 C 100,35 90,65 140,65" fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeDasharray="3" className="animate-pulse" />
        </svg>
        {/* Floating Node 2 */}
        <div className="absolute top-12 right-3 p-1 rounded bg-[#0f0f0f] border border-cyan-800/40 text-[7px] text-white">
          <div className="text-emerald-400 font-bold">ProcessorNode</div>
        </div>
      </div>
    ),
  },
  {
    num: '06',
    title: 'Data Pipeline Design',
    sub: 'Người dùng tự thiết kế pipeline',
    delay: '0.35s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] p-3 space-y-2 mt-4">
        <div className="flex items-center justify-between text-subtle text-[8px]">
          <span>Thiết kế luồng dữ liệu</span>
          <span className="text-emerald-400 font-bold">✓ Valid</span>
        </div>
        <div className="flex items-center justify-between gap-1.5">
          <div className="p-1 rounded bg-[#111] border border-border text-[7px] text-white/80">Input CSV</div>
          <span className="text-cyan-400 animate-pulse text-[8px]">➔</span>
          <div className="p-1 rounded bg-[#111] border border-cyan-900 text-[7px] text-cyan-400 font-bold">AI Parser</div>
          <span className="text-cyan-400 animate-pulse text-[8px]">➔</span>
          <div className="p-1 rounded bg-[#111] border border-border text-[7px] text-white/80">Webhook</div>
        </div>
      </div>
    ),
  },
  {
    num: '07',
    title: 'Automated Data Processing',
    sub: 'Pipeline vận hành tự động hoàn chỉnh',
    delay: '0.4s',
    illustration: (
      <div className="w-full bg-[#0a0a0a] rounded border border-border overflow-hidden font-mono text-[9px] mt-4">
        {/* Metrics Header */}
        <div className="p-2 bg-gradient-to-r from-cyan-950/20 to-transparent flex items-center justify-between border-b border-border/40">
          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" /> PIPELINE RUNNING
          </span>
          <span className="text-emerald-400 animate-pulse">● Online</span>
        </div>
        {/* Live Statistics */}
        <div className="p-3 grid grid-cols-2 gap-2 text-center">
          <div className="bg-[#111] p-1.5 rounded border border-border/30">
            <div className="text-[7px] text-dim">PROCESSED</div>
            <div className="text-white font-bold text-xs">142,850</div>
          </div>
          <div className="bg-[#111] p-1.5 rounded border border-border/30">
            <div className="text-[7px] text-dim">SUCCESS RATE</div>
            <div className="text-emerald-400 font-bold text-xs">100.0%</div>
          </div>
        </div>
      </div>
    ),
  },
];

function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-24 md:py-32 overflow-hidden">
      <div className="dot-pattern absolute inset-0 opacity-20" />
      <div className="orb w-80 h-80 top-1/2 left-0 opacity-30" style={{ background: 'rgba(6,182,212,0.06)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="reveal mb-16">
          <div className="label mb-4">// 02 — Product Workflow</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Quy trình tự động hóa <br className="hidden md:block" />
            <span className="grad-text">xử lý dữ liệu thông minh</span>
          </h2>
          <p className="text-subtle text-sm max-w-xl leading-relaxed">
            Theo dõi hành trình dữ liệu được kết nối từ các bảng tính, đồng bộ hóa tập trung, cấu trúc hóa thông minh, cho đến khi chạy tự động trên không gian vô hạn.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="reveal grad-border rounded p-5 flex flex-col justify-between cursor-default"
              style={{ transitionDelay: step.delay }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/20">
                    Step {step.num}
                  </span>
                  <span className="text-[9px] text-dim font-mono">Workflow Sync</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1">{step.title}</h3>
                <p className="text-subtle text-xs leading-relaxed mb-3">{step.sub}</p>
              </div>
              {step.illustration}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Roadmap Section
// ─────────────────────────────────────────────────────────────────────────────
const roadmapItems = [
  {
    status: 'DONE',
    statusColor: 'text-cyan-400',
    dotStyle: { background: 'linear-gradient(135deg,#06b6d4,#fff)' } as React.CSSProperties,
    cardStyle: {} as React.CSSProperties,
    useGradBorder: true,
    title: 'Ideation',
    titleColor: 'text-white',
    desc: 'Định nghĩa bài toán, nghiên cứu thị trường, xác định MVP scope và kiến trúc hệ thống tổng thể.',
    period: 'Q4 2025',
    periodColor: 'text-dim',
    ping: true,
    delay: '0.1s',
  },
  {
    status: 'CURRENT',
    statusColor: 'text-cyan-300',
    dotStyle: { border: '2px solid #22d3ee' } as React.CSSProperties,
    cardStyle: { border: '1px solid rgba(6,182,212,0.5)', background: 'rgba(6,182,212,0.06)' } as React.CSSProperties,
    useGradBorder: false,
    title: 'R&D',
    titleColor: 'text-white',
    desc: 'Xây dựng prototype AI Orchestrator, test integration với Google Sheets và thiết kế database schema.',
    period: 'Q1–Q2 2026',
    periodColor: 'text-cyan-400',
    ping: false,
    delay: '0.2s',
  },
  {
    status: 'PLANNED',
    statusColor: 'text-dim',
    dotStyle: { border: '1px solid #1a1a1a', background: '#0f0f0f' } as React.CSSProperties,
    cardStyle: { border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' } as React.CSSProperties,
    useGradBorder: false,
    title: 'Launch',
    titleColor: 'text-white/60',
    desc: 'Ra mắt beta với nhóm doanh nghiệp SME đầu tiên. Thu thập feedback và tối ưu hiệu suất thực tế.',
    period: 'Q3-Q4 2026',
    periodColor: 'text-dim',
    ping: false,
    delay: '0.3s',
  },
  {
    status: 'PLANNED',
    statusColor: 'text-dim',
    dotStyle: { border: '1px solid #1a1a1a', background: '#0f0f0f', opacity: 0.5 } as React.CSSProperties,
    cardStyle: { border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', opacity: 0.6 } as React.CSSProperties,
    useGradBorder: false,
    title: 'Testing',
    titleColor: 'text-white/40',
    desc: 'Stress test quy mô lớn, security audit, performance benchmarking và chuẩn bị cho production release.',
    period: 'Q1-Q2 2027',
    periodColor: 'text-dim',
    ping: false,
    delay: '0.4s',
  },
];

function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32 overflow-hidden">
      <div className="orb w-80 h-80 top-0 right-0 opacity-30" style={{ background: 'rgba(6,182,212,0.08)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-16">
          <div className="label mb-4">// 03 — Roadmap</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Lộ trình <span className="grad-text">phát triển</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="hidden md:block absolute left-0 top-8 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0.5) 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.05) 100%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {roadmapItems.map((item) => (
              <div
                key={item.title}
                className="reveal roadmap-item"
                style={{ transitionDelay: item.delay }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex items-center mb-6">
                  <div
                    className="w-4 h-4 rounded-full relative flex items-center justify-center"
                    style={item.dotStyle}
                  >
                    {item.ping && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: 'rgba(6,182,212,0.3)' }}
                      />
                    )}
                    {item.status === 'CURRENT' && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                </div>

                <div
                  className={item.useGradBorder ? 'grad-border rounded p-5' : 'rounded p-5'}
                  style={item.useGradBorder ? undefined : item.cardStyle}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'DONE'
                          ? ''
                          : item.status === 'CURRENT'
                          ? 'bg-cyan-400 animate-pulse'
                          : 'bg-dim'
                      }`}
                      style={item.status === 'DONE' ? { background: 'linear-gradient(135deg,#06b6d4,#fff)' } : undefined}
                    />
                    <span className={`label ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <h3 className={`font-display font-bold text-lg mb-2 ${item.titleColor}`}>
                    {item.title}
                  </h3>
                  <p className="text-dim text-xs leading-relaxed">{item.desc}</p>
                  <div className={`mt-4 text-xs font-mono ${item.periodColor}`}>{item.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// Contact Section
// ─────────────────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="orb w-96 h-96 bottom-0 right-0 opacity-30" style={{ background: 'rgba(6,182,212,0.1)' }} />
      <div className="orb w-64 h-64 top-0 left-0 opacity-20" style={{ background: 'rgba(6,182,212,0.08)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center reveal">
          <div className="label mb-6 flex justify-center">// 04 — Contact</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
            Bắt đầu theo dõi và hợp tác
            <br />
            <span className="grad-text">cùng Cluster</span>
          </h2>
          <p className="text-subtle text-sm leading-relaxed mb-12 max-w-md mx-auto">
            Bạn quan tâm đến giải pháp mà Cluster mang lại cho doanh nghiệp? Chúng tôi muốn lắng
            nghe những góp ý và sự quan tâm về bài toán của bạn.
          </p>

          {/* Form đăng ký waitlist — toàn bộ logic nằm trong ContactForm */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoIcon size={6} />
            <span
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            className="font-extrabold text-white tracking-wider"
          >
            CLUSTER
          </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: 'Tính năng',     href: '#focus' },
              { label: 'Quy trình',    href: '#workflow' },
              { label: 'Visual Flow',  href: '#visual-workflow' },
              { label: 'Roadmap',      href: '#roadmap' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="label text-dim hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="label text-dim">© 2026 Cluster. All rights reserved.</div>
        </div>

        <div className="mt-8 font-mono text-xs text-dim text-center">
          Built with ♥ in VIETNAM · AI-Powered Enterprise OS · v0.1-alpha
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Divider
// ─────────────────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="hr-grad" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page (default export)
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Divider />
        <CoreFocusSection />
        <Divider />
        <WorkflowSection />
        <Divider />
        <VisualWorkflow />
        <Divider />
        <RoadmapSection />
        <Divider />
        <ContactSection />
      </main>
      <Footer />

      {/*
        ScrollReveal là Client Component duy nhất.
        Đặt cuối page để không block render phần còn lại.
      */}
      <ScrollReveal />
    </>
  );
}