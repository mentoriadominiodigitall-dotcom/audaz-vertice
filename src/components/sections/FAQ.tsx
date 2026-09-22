import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function FAQ() {
  const { content } = useContent();
  const faqItems = content.faqItems;
  const section = content.sectionConfigs.find(s => s.section_key === 'faq');
  const sectionVideo = section?.video_url;
  const [open, setOpen] = useState<number | null>(0);

  if (section && !section.enabled) return null;

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-audaz-black-soft">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <div className="absolute inset-0 bg-grid opacity-15" />
      )}

      <div className="container-base relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left — Heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="reveal label-tag">
              <span className="h-px w-8 bg-audaz-red" />
              FAQ
            </span>
            <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
              Perguntas <span className="text-gradient-red">frequentes.</span>
            </h2>
            <p className="reveal stagger-2 mt-6 text-base text-audaz-white-muted">
              Ainda com dúvidas? Fale com a gente — respondemos em até 24 horas.
            </p>
            <a href="#contato" className="reveal stagger-3 btn-secondary mt-8">
              Entrar em contato
            </a>
          </div>

          {/* Right — Accordion */}
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.id}
                  className={`reveal stagger-${Math.min(i + 1, 6)} overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-audaz-red/30 bg-white/[0.04]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display text-base font-semibold transition-colors ${
                      isOpen ? 'text-audaz-white' : 'text-audaz-white-muted'
                    }`}>
                      {item.question}
                    </span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'border-audaz-red bg-audaz-red/10 text-audaz-red'
                        : 'border-white/10 text-audaz-white-muted'
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-500 ease-expo"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-audaz-white-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
