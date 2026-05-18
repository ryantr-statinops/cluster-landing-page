# Cluster Landing Page

Đây là **trang landing page** cho dự án **Cluster** — một **AI-Powered Enterprise OS** giúp doanh nghiệp điều hành và tự động hoá quy trình bằng **AI Agent** kết hợp **ERP**.

👉 Live demo: https://cluster-landing-page-xi.vercel.app

## Tính năng nổi bật

- Next.js (App Router) + React
- UI hiện đại với **Tailwind CSS**: gradients, glassmorphism, hiệu ứng phát sáng
- Hiệu ứng xuất hiện khi cuộn trang thông qua component **`<ScrollReveal />`** (IntersectionObserver)
- Contact/Waitlist form gửi dữ liệu tới Google Apps Script

## Cấu trúc trang (src/app/page.tsx)

Trang được chia thành các section:

- **Hero**: Thông điệp chính + CTA trải nghiệm
- **Core Focus**: Các năng lực cốt lõi (Spreadsheet & Integration, AI Orchestrator, ERP...)
- **Workflow**: Quy trình hoạt động theo từng step
- **Visual Workflow**: Biểu diễn luồng dữ liệu/logic
- **Roadmap**: Lộ trình phát triển đến 2027
- **Contact**: Form đăng ký nhận thông báo sớm khi MVP ra mắt

## Getting Started

### Yêu cầu

- Node.js (khuyến nghị bản LTS)
- npm (hoặc yarn/pnpm/bun)

### Cài đặt & chạy dev server

```bash
npm install
npm run dev
# (hoặc yarn dev / pnpm dev / bun dev)
```

Mở:

- http://localhost:3000

### Build & chạy production

```bash
npm run build
npm run start
```

## Deploy

Dự án phù hợp triển khai lên **Vercel** (Next.js).

- Bạn có thể xem/đối chiếu cấu hình deploy thông qua Vercel dashboard
- Live site hiện tại: https://cluster-landing-page-xi.vercel.app

## Liên hệ

Nếu cần thay đổi nội dung README hoặc cập nhật thông tin theo tiến độ dự án, có thể chỉnh trực tiếp file này.

