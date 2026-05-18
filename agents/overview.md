# Cluster Landing Page — Project Overview

## 1) Mục tiêu dự án
**Cluster** là một “Enterprise OS” theo hướng **AI-first**: dùng **AI Agent / Orchestrator** để tự động đọc–phân tích–đồng bộ dữ liệu và điều phối luồng xử lý, sau đó **xuất kết quả** vào các module kiểu **ERP (Dashboards / Pivot / Alerts)**.

Code hiện tại trong repo chủ yếu mô tả **landing page** (UI/UX + mô phỏng luồng) để truyền tải kiến trúc và giá trị sản phẩm.

---

## 2) Stack công nghệ chính
- **Framework**: Next.js (App Router)
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (kết hợp CSS tự viết trong `globals.css`)
- **Hiệu ứng khi cuộn**: `IntersectionObserver` (thông qua component `ScrollReveal`)
- **Font**: `next/font/google` (Be Vietnam Pro, Space Mono) + gán CSS variables cho theme

---

## 3) Kiến trúc file / luồng render
### Root layout
- **`src/app/layout.tsx`**
  - Import `./globals.css`
  - Cấu hình font bằng `next/font/google` và gán biến CSS:
    - `--font-syne`
    - `--font-space-mono`
  - Export `metadata` (title/description/openGraph)
  - Bọc toàn bộ app bằng `<html>` và `<body>` (thiết lập nền #080808, màu chữ #e5e5e5)

### Trang chủ (route `/`)
- **`src/app/page.tsx`**
  - Là **Server Component** (không có `use client`)
  - Chia trang thành các section:
    - `Navbar`
    - `HeroSection`
    - `CoreFocusSection`
    - `WorkflowSection`
    - `VisualWorkflow` (component mô phỏng tương tác)
    - `RoadmapSection`
    - `ContactSection`
    - `Footer`
  - Gắn `ScrollReveal` ở cuối page để kích hoạt hiệu ứng “reveal on scroll” mà không làm block render phần lớn nội dung.

---

## 4) Các thành phần UI quan trọng
### Hiệu ứng xuất hiện khi cuộn
- **`src/components/ScrollReveal.tsx`** (Client Component)
  - Lấy tất cả element có class `.reveal`
  - Dùng `IntersectionObserver` để thêm class `.visible` khi phần tử vào viewport
  - Unobserve sau khi kích hoạt để giảm work

### Form liên hệ / waitlist
- **`src/components/ContactForm.tsx`** (Client Component)
  - Validate client-side (name/email/phone/subject/message)
  - Submit qua **Google Apps Script** (fetch POST JSON)
  - Hiển thị trạng thái: idle → loading → success/error

### Mô phỏng “Visual Workflow”
- **`src/components/VisualWorkflow.tsx`** (Client Component)
  - Mô phỏng “spatial canvas” với các node dạng:
    - data-field (df1/df2/df3)
    - data-hub (dh1/dh2)
    - pivot-table (pivot)
    - graph (graph)
  - Có các tương tác chính:
    - **Bật/tắt node** (toggle visibility)
    - **Run mô phỏng pipeline** theo bước (step-by-step highlight)
    - **Đổi theme**: `sleek-neon` vs `classic-blueprint`
    - **Zoom** canvas
  - Render luồng bằng **SVG overlay** (các đường nối có marker, neon glow khi theme phù hợp)
  - Dữ liệu chạy là **mock**, nhưng luồng phản ứng đúng theo trạng thái node và các setting:
    - sorting/grouping cho DataHub
    - pivot metric (Revenue/Efficiency)
    - graph view (pie/donut/bar)

---

## 5) Styling / design system
- **`src/app/globals.css`**
  - Định nghĩa `@theme` (Tailwind v4 theme variables, keyframes gridScroll, blink, ...)
  - Style nền, typography, scrollbar
  - Các utility/component classes tự viết:
    - `grad-text`, `grad-border`
    - `btn-primary`, `btn-ghost`
    - `.reveal` / `.reveal.visible` (animation cho scroll)
    - `nav-blur`, `orb`, `tag`, `hr-grad`

---

## 6) Ý nghĩa phần UI so với “Cluster”
Các section trên landing mô phỏng một bức tranh tổng thể:
- **Core Focus**: pipeline dữ liệu + AI Orchestrator + ERP output
- **Workflow**: quy trình data source → storage → structuring → execution
- **VisualWorkflow**: tương tác trực quan hoá luồng bằng node và connections
- **Roadmap**: Ideation (Q4/2025) → R&D (Q1–Q2/2026) → Launch & Testing (2026–2027)
- **Contact**: waitlist để thông báo khi MVP ra mắt

---

## 7) Trạng thái hiện tại
Landing đã có đầy đủ UI/UX + mô phỏng tương tác và form waitlist; backend thực (nếu có) nằm ngoài repo, hiện form gửi vào Google Apps Script qua URL cấu hình trực tiếp trong component.
