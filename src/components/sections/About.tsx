import { useContent } from '@/context/ContentContext';
import { getIcon } from '@/lib/icons';
import SectionVideo from '@/components/SectionVideo';

export default function About() {
  const { content } = useContent();
  const values = content.values;
  const stats = content.stats;
  const section = content.sectionConfigs.find(s => s.section_key === 'sobre');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-audaz-red/5 blur-[150px]" />

      <div className="container-base">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Video or Image */}
          <div className="reveal-left relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              {sectionVideo ? (
                <SectionVideo
                  videoUrl={sectionVideo}
                  className="aspect-[4/5] w-full"
                  overlayOpacity={0.3}
                />
              ) : (
                <img
                  src="https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Equipe Audaz Vértice Digital em reunião estratégica"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-audaz-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 right-2 glass-panel p-4 sm:-bottom-8 sm:-right-4 sm:p-6 lg:-right-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-audaz-green/15 sm:h-12 sm:w-12">
                  <span className="font-display text-base font-bold text-audaz-green sm:text-lg">7+</span>
                </div>
                <div>
                  <p className="font-display text-xs font-semibold text-audaz-white sm:text-sm">
                    Anos de experiência
                  </p>
                  <p className="text-[10px] text-audaz-white-muted sm:text-xs">no mercado digital</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div className="reveal">
              <span className="label-tag">
                <span className="h-px w-8 bg-audaz-red" />
                Sobre Nós
              </span>
            </div>

            <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
              Uma história de <span className="text-gradient-red">audácia</span> e
              <span className="text-gradient-gold"> resultado.</span>
            </h2>

            <p className="reveal stagger-2 mt-6 text-base leading-relaxed text-audaz-white-muted sm:text-lg">
              Nascemos da convicção de que toda marca tem um potencial extraordinário
              — basta a estratégia certa para revelá-lo. Há mais de sete anos,
              ajudamos empresas a se posicionarem, crescerem e se tornarem
              referências em seus mercados.
            </p>

            <p className="reveal stagger-3 mt-4 text-base leading-relaxed text-audaz-white-muted">
              Não somos mais uma agência. Somos parceiros de negócio que combinam
              criatividade, tecnologia e dados para construir presenças digitais
              que geram impacto real.
            </p>

            {/* Values cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {values.map((value, i) => {
                const Icon = getIcon(value.icon);
                return (
                  <div
                    key={value.id}
                    className={`reveal stagger-${Math.min(i + 2, 6)} card-base card-hover`}
                  >
                    <Icon size={24} className="text-audaz-red" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-base font-semibold text-audaz-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-audaz-white-muted">
                      {value.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mini stats */}
            <div className="reveal stagger-5 mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/10 pt-8">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.id}>
                  <p className="font-display text-2xl font-bold text-audaz-white">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-audaz-white-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
