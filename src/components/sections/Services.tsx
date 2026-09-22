import { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { getIcon } from '@/lib/icons';
import SectionVideo from '@/components/SectionVideo';

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null);
  const { content } = useContent();
  const services = content.services;
  const section = content.sectionConfigs.find(s => s.section_key === 'servicos');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="servicos" className="section-padding relative overflow-hidden">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-audaz-green/5 blur-[150px]" />
      )}

      <div className="container-base relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal label-tag justify-center">
            <span className="h-px w-8 bg-audaz-red" />
            Serviços
            <span className="h-px w-8 bg-audaz-red" />
          </span>

          <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
            Tudo o que sua marca precisa para
            <span className="text-gradient-red"> crescer online.</span>
          </h2>

          <p className="reveal stagger-2 mt-6 text-lg text-audaz-white-muted">
            Soluções integradas que cobrem toda a jornada digital — da estratégia
            ao resultado.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <article
                key={service.id}
                className={`reveal-scale stagger-${(i % 6) + 1} group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent transition-all duration-500 hover:border-white/20 hover:-translate-y-1`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-audaz-black via-audaz-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-audaz-black/60 backdrop-blur-md">
                    <Icon size={22} className="text-audaz-red" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-audaz-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-audaz-white-muted">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.features.slice(0, 3).map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-audaz-white-muted">
                        <Check size={14} className="text-audaz-green shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelected(i)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-audaz-white transition-colors hover:text-audaz-green"
                  >
                    Saber mais
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected !== null && services[selected] && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-audaz-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-panel relative max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={services[selected].image}
                alt={services[selected].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-audaz-black via-audaz-black/40 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-audaz-black/60 text-audaz-white backdrop-blur-md transition-colors hover:bg-audaz-red/20"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8">
              <h3 className="font-display text-2xl font-bold text-audaz-white">
                {services[selected].title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-audaz-white-muted">
                {services[selected].description}
              </p>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-audaz-red">
                O que está incluso
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {services[selected].features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-audaz-white">
                    <Check size={16} className="text-audaz-green shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#contato" onClick={() => setSelected(null)} className="btn-primary mt-8 w-full">
                Solicitar orçamento
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
