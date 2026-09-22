import { Phone, Mail, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const siteConfig = content.siteConfig;
  const navLinks = content.navLinks;
  const year = new Date().getFullYear();

  const companyName = siteConfig?.company_name || 'Audaz Vértice Digital';
  const nameParts = companyName.split(' ');
  const firstPart = nameParts[0] || 'Audaz';
  const restPart = nameParts.slice(1).join(' ') || 'Vértice';

  const phoneHref = siteConfig ? `tel:${siteConfig.phone.replace(/\D/g, '')}` : '#';
  const emailHref = siteConfig ? `mailto:${siteConfig.email}` : '#';

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-audaz-black">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container-base relative">
        {/* Top */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-audaz-white">{firstPart}</span>
              <span className="font-display text-xl font-light text-audaz-red">{restPart}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-audaz-white-muted">
              {siteConfig?.description}
            </p>
            <div className="mt-6 flex gap-3">
              {siteConfig?.phone && (
                <a
                  href={phoneHref}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-red"
                  aria-label="Telefone"
                >
                  <Phone size={16} />
                </a>
              )}
              {siteConfig?.email && (
                <a
                  href={emailHref}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-red"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
              {siteConfig?.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-red"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {siteConfig?.facebook && (
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-red"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {siteConfig?.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-red"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
              Navegação
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
              Serviços
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.slice(5).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#produtos" className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
              Contato
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={phoneHref} className="text-sm text-audaz-white-muted transition-colors hover:text-audaz-white">
                  {siteConfig?.phone}
                </a>
              </li>
              <li>
                <a href={emailHref} className="break-all text-sm text-audaz-white-muted transition-colors hover:text-audaz-white">
                  {siteConfig?.email}
                </a>
              </li>
              <li className="text-sm text-audaz-white-muted">{siteConfig?.address}</li>
              <li className="text-sm text-audaz-white-muted">{siteConfig?.hours}</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-xs text-audaz-white-muted">
            &copy; {year} {companyName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-audaz-white-muted transition-colors hover:text-audaz-white">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-audaz-white-muted transition-colors hover:text-audaz-white">
              Termos de Uso
            </a>
          </div>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs font-semibold text-audaz-white-muted transition-colors hover:text-audaz-green"
          >
            Voltar ao topo
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
