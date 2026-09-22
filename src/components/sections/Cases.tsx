import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Cases() {
  const { content } = useContent();
  const cases = content.cases;
  const section = content.sectionConfigs.find(s => s.section_key === 'cases');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="cases" className="section-padding relative overflow-hidden bg-audaz-black-soft">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.8}
        />
      )}
      {!sectionVideo && (
        <div className="absolute inset-0 bg-dot opacity-20" />
      )}

      <div className="container-base relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="reveal label-tag">
              <span className="h-px w-8 bg-audaz-red" />
              Cases
            </span>
            <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
              Resultados que <span className="text-gradient-green">falam</span> por si.
            </h2>
          </div>
          <p className="reveal stagger-2 max-w-sm text-base text-audaz-white-muted">
            Projetos reais, métricas reais. Veja o impacto que entregamos para
            nossos parceiros.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => (
            <article
              key={item.id}
              className={`reveal-scale stagger-${i + 1} group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent transition-all duration-500 hover:border-white/20 hover:-translate-y-1`}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={`Case ${item.client}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-audaz-black via-audaz-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="rounded-full border border-white/10 bg-audaz-black/60 px-3 py-1 text-xs font-medium text-audaz-white-muted backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-audaz-white">
                  {item.client}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-audaz-white-muted">
                  {item.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  {item.results.map((result, ri) => (
                    <div key={ri}>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={16} className="text-audaz-green" />
                        <p className="font-display text-2xl font-bold text-audaz-green">
                          {result.metric}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-audaz-white-muted">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href="#contato"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-audaz-white transition-colors hover:text-audaz-green"
                >
                  Ver case completo
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
