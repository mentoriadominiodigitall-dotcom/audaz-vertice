import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Process() {
  const { content } = useContent();
  const processSteps = content.processSteps;
  const section = content.sectionConfigs.find(s => s.section_key === 'processo');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="processo" className="section-padding relative overflow-hidden">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.8}
        />
      )}
      {!sectionVideo && (
        <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-audaz-red/5 blur-[150px]" />
      )}

      <div className="container-base relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal label-tag justify-center">
            <span className="h-px w-8 bg-audaz-red" />
            Processo
            <span className="h-px w-8 bg-audaz-red" />
          </span>
          <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
            Do diagnóstico à <span className="text-gradient-red">escala.</span>
          </h2>
          <p className="reveal stagger-2 mt-6 text-lg text-audaz-white-muted">
            Um método comprovado, estruturado em cinco etapas que garantem clareza,
            execução e crescimento.
          </p>
        </div>

        <div className="mt-12 sm:mt-20">
          {/* Vertical line for mobile, horizontal for desktop */}
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-audaz-red via-white/10 to-transparent md:left-0 md:top-1/2 md:h-px md:w-full md:bg-gradient-to-r md:from-audaz-red md:via-white/15 md:to-transparent" />

            <div className="grid gap-12 md:grid-cols-5 md:gap-6">
              {processSteps.map((step, i) => (
                <div
                  key={step.id}
                  className={`reveal stagger-${i + 1} relative pl-20 md:pl-0 md:text-center`}
                >
                  {/* Number node */}
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-audaz-black font-display text-sm font-bold text-audaz-red transition-all duration-500 hover:border-audaz-red hover:bg-audaz-red/10 md:relative md:mx-auto md:mb-6">
                    {step.number}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-audaz-white md:mt-2">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-audaz-white-muted">
                    {step.text}
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
