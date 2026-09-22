import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-scale, .reveal-left, .reveal-right',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);

  return ref;
}
