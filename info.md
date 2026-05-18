Tổng quan về dự án Cluster Landing Page.
Đây là một trang giới thiệu (Landing Page) cho dự án "Cluster" - một hệ thống điều hành doanh nghiệp (Enterprise OS) tích hợp AI Agent và ERP.

Tóm tắt các điểm chính:

  1. Công nghệ sử dụng
   - Framework: Next.js (phiên bản mới nhất), React 19.
   - Styling: Tailwind CSS v4, sử dụng nhiều hiệu ứng hiện đại như gradients (grad-text, grad-border), glassmorphism, và các hiệu ứng phát sáng (orb).
   - Ngôn ngữ: TypeScript.
   - Tính năng đặc biệt: Sử dụng IntersectionObserver thông qua thành phần <ScrollReveal /> để tạo hiệu ứng xuất hiện khi cuộn trang.

  2. Cấu trúc trang (src/app/page.tsx)
  Trang web được chia thành các phần rõ rệt:
   - HeroSection: Giới thiệu thông điệp chính "Quản lý doanh nghiệp hiệu quả bằng AI Agent & ERP".
   - CoreFocusSection: Giải thích các tính năng cốt lõi như tích hợp Spreadsheet, AI Orchestrator và hệ thống ERP.
   - ArchitectureSection: Trình bày kiến trúc 3 lớp (Core, Logic, Interface).
   - RoadmapSection: Lộ trình phát triển từ năm 2025 đến 2027.
   - TechStackSection: Các công nghệ nền tảng (Python, Docker, PostgreSQL, Redis, Next.js).
   - ContactSection: Form liên hệ/đăng ký nhận tin.

  3. Các thành phần chính
   - ContactForm.tsx: Xử lý logic biểu mẫu liên hệ.
   - ScrollReveal.tsx: Một Client Component chuyên trách việc kích hoạt các hiệu ứng hoạt ảnh khi người dùng cuộn trang, giúp tối ưu hiệu suất render phía Server.
   - globals.css: Chứa các định nghĩa về biến màu sắc, font chữ (Syne, Geist Mono) và các lớp tiện ích tùy chỉnh cho hiệu ứng thị giác.

  Dự án hiện đang ở giai đoạn R&D (Nghiên cứu và Phát triển) với mục tiêu ra mắt chính thức vào năm 2027.

  Bạn có muốn tôi hỗ trợ thực hiện thay đổi hay thêm tính năng nào cho dự án này không?