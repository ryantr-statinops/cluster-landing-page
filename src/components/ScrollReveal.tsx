'use client';

import { useEffect } from 'react';

/**
 * ScrollReveal
 * Mounts một IntersectionObserver để thêm class "visible" vào
 * tất cả elements có class "reveal" khi chúng đi vào viewport.
 *
 * Đây là Client Component vì dùng useEffect + DOM API.
 * Đặt ở cuối layout hoặc page để không block render.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // Không render gì ra DOM
}