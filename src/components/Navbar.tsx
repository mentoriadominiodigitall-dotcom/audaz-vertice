import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Navbar() {
  const { content } = useContent();
  const navLinks = content.navLinks;
  const siteConfig = content.siteConfig;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const companyName = siteConfig?.company_name || 'Audaz Vértice Digital';
  const nameParts = companyName.split(' ');
  const firstPart = nameParts[0] || 'Audaz';
  const restPart = nameParts.slice(1).join(' ') || 'Vértice';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-audaz-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-base flex items-center justify-between py-4">
          <a href="#home" className="group flex items-center gap-2" aria-label={`${companyName} — Início`}>
            <span className="font-display text-xl font-bold tracking-tight text-audaz-white transition-colors group-hover:text-white">
              {firstPart}
            </span>
            <span className="font-display text-xl font-light tracking-tight text-audaz-red">
              {restPart}
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-audaz-white-muted transition-colors duration-300 hover:text-audaz-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a href="#contato" className="btn-primary">
              Fale Conosco
              <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            className="flex items-center justify-center rounded-lg p-2 text-audaz-white transition-colors hover:bg-white/5 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[150] flex flex-col bg-audaz-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-audaz-white">{firstPart}</span>
            <span className="font-display text-xl font-light text-audaz-red">{restPart}</span>
          </div>
          <button
            className="flex items-center justify-center rounded-lg p-2 text-audaz-white transition-colors hover:bg-white/5"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              className={`transition-all duration-500 ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${menuOpen ? i * 60 : 0}ms` }}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/5 py-4 font-display text-2xl font-medium text-audaz-white transition-colors hover:text-audaz-red"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-10">
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="btn-primary w-full"
          >
            Fale Conosco
            <ArrowUpRight size={16} />
          </a>
          <p className="mt-4 text-center text-sm text-audaz-white-muted">
            {siteConfig?.phone}
          </p>
        </div>
      </div>
    </>
  );
}
