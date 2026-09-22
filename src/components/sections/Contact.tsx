import { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/lib/supabase';
import SectionVideo from '@/components/SectionVideo';

export default function Contact() {
  const { content } = useContent();
  const siteConfig = content.siteConfig;
  const section = content.sectionConfigs.find(s => s.section_key === 'contato');
  const sectionVideo = section?.video_url;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from('messages').insert({
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.message,
    });

    if (insertError) {
      setError('Não foi possível enviar. Tente novamente.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  if (section && !section.enabled) return null;

  const phoneHref = siteConfig ? `tel:${siteConfig.phone.replace(/\D/g, '')}` : '#';
  const whatsappHref = siteConfig ? `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}` : '#';
  const emailHref = siteConfig ? `mailto:${siteConfig.email}` : '#';

  const contactCards = [
    {
      icon: Phone,
      label: 'Telefone',
      value: siteConfig?.phone || '',
      href: phoneHref,
      accent: 'text-audaz-green',
    },
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig?.email || '',
      href: emailHref,
      accent: 'text-audaz-yellow',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: siteConfig?.instagram ? '@audaz_vertice' : '',
      href: siteConfig?.instagram || '#',
      accent: 'text-audaz-red',
    },
  ];

  return (
    <section id="contato" className="section-padding relative overflow-hidden bg-audaz-black-soft">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <>
          <div className="absolute inset-0 bg-dot opacity-20" />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-audaz-green/30 to-transparent" />
        </>
      )}

      <div className="container-base relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal label-tag justify-center">
            <span className="h-px w-8 bg-audaz-red" />
            Contato
            <span className="h-px w-8 bg-audaz-red" />
          </span>
          <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
            Vamos construir algo
            <span className="text-gradient-green"> extraordinário.</span>
          </h2>
          <p className="reveal stagger-2 mt-6 text-lg text-audaz-white-muted">
            Conte sua ideia. Nós cuidamos do resto — da estratégia ao resultado.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Left — Contact info */}
          <div className="reveal-left space-y-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.icon === Instagram ? '_blank' : undefined}
                  rel={card.icon === Instagram ? 'noopener noreferrer' : undefined}
                  className="card-base card-hover group flex items-center gap-5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-white/20">
                    <Icon size={22} className={card.accent} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                      {card.label}
                    </p>
                    <p className="mt-1 truncate font-display text-base font-medium text-audaz-white">
                      {card.value}
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-audaz-white-muted transition-all duration-300 group-hover:text-audaz-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}

            <div className="card-base flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <MapPin size={22} className="text-audaz-white-muted" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                  Endereço & Horário
                </p>
                <p className="mt-1 font-display text-base font-medium text-audaz-white">
                  {siteConfig?.address}
                </p>
                <p className="mt-1 text-sm text-audaz-white-muted">
                  {siteConfig?.hours}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Localização Audaz Vértice Digital"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-43.7%2C-23.2%2C-43.0%2C-22.7&layer=mapnik&marker=-22.9,-43.4"
                className="h-48 w-full grayscale invert-[0.85] opacity-70"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal-right glass-panel p-6 sm:p-8 md:p-10">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={56} className="text-audaz-green animate-scale-in" />
                <h3 className="mt-6 font-display text-2xl font-bold text-audaz-white">
                  Mensagem enviada!
                </h3>
                <p className="mt-3 text-base text-audaz-white-muted">
                  Recebemos seu contato. Nossa equipe responderá em até 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="voce@empresa.com"
                      className="input-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    className="input-base"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-audaz-white-muted">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seu projeto..."
                    className="input-base resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-audaz-red">{error}</p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Enviando...' : 'Enviar mensagem'}
                  {!submitting && <Send size={15} />}
                </button>

                <p className="text-center text-xs text-audaz-white-muted">
                  Ao enviar, você concorda em ser contatado pela equipe Audaz.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
