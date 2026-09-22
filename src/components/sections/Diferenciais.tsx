import { useContent } from '@/context/ContentContext';
import { getIcon } from '@/lib/icons';
import SectionVideo from '@/components/SectionVideo';

export default function Diferenciais() {
  const { content } = useContent();
  const diferenciais = content.diferenciais;
  const section = content.sectionConfigs.find(s => s.section_key === 'diferenciais');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="diferenciais" className="section-padding relative overflow-hidden bg-audaz-black-soft">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.75}
        />
      )}
      {!sectionVideo && (
        <>
          <div className="absolute inset-0 bg-dot opacity-30" />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-audaz-red/30 to-transparent" />
        </>
      )}

      <div className="container-base relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal label-tag justify-center">
            <span className="h-px w-8 bg-audaz-red" />
            Por que a Audaz
            <span className="h-px w-8 bg-audaz-red" />
          </span>

          <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
            Diferenciais que <span className="text-gradient-red">definem</span> o
            resultado.
          </h2>

          <p className="reveal stagger-2 mt-6 text-lg text-audaz-white-muted">
            Não prometemos milagres. Entregamos processo, estratégia e execução de
            alto nível — em cada detalhe.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className={`reveal-scale stagger-${(i % 6) + 1} card-base card-hover group relative overflow-hidden`}
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-audaz-red/5 blur-2xl transition-all duration-500 group-hover:bg-audaz-red/15" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-audaz-red/40 group-hover:bg-audaz-red/10">
                    <Icon size={26} className="text-audaz-red transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-audaz-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-audaz-white-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
