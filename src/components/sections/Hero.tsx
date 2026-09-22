import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { content } = useContent();
  const hero = content.heroConfig;
  const stats = content.stats;
  const siteConfig = content.siteConfig;
  const heroSection = content.sectionConfigs.find(s => s.section_key === 'home' || s.section_key === 'hero');
  const heroVideo = heroSection?.video_url;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!hero || !hero.enabled) return null;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {heroVideo ? (
          <SectionVideo
            videoUrl={heroVideo}
            className="absolute inset-0 h-full w-full"
            overlayOpacity={hero.overlay_opacity}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${hero.background_url})`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(5,5,5,${hero.overlay_opacity}), rgba(5,5,5,${hero.overlay_opacity * 0.85}), #050505)`,
              }}
            />
          </>
        )}
        {!heroVideo && (
          <>
            <div className="absolute inset-0 bg-grid opacity-30" />
            {/* Floating orbs */}
            <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-audaz-red/20 blur-[120px] animate-pulse-soft" />
            <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-audaz-green/10 blur-[120px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          </>
        )}
      </div>

      <div className="container-base relative z-10 pt-20 sm:pt-24">
        <div className="max-w-4xl">
          <div
            className={`mb-8 flex items-center gap-3 transition-all duration-1000 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="label-tag">
              <Sparkles size={14} />
              {siteConfig?.slogan || hero.subtitle}
            </span>
          </div>

          <h1
            className={`text-hero font-bold text-balance transition-all duration-1000 delay-100 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-gradient-white">{hero.title_line1}</span>
            <br />
            <span className="text-gradient-red">{hero.title_line2}</span>
            <br />
            <span className="text-audaz-white">{hero.title_line3}</span>
          </h1>

          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed text-audaz-white-muted transition-all duration-1000 delay-300 sm:mt-8 sm:text-lg ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {hero.description}
          </p>

          <div
            className={`mt-8 flex flex-col gap-4 sm:flex-row sm:mt-10 transition-all duration-1000 delay-500 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <a href={hero.button1_link} className="btn-primary">
              {hero.button1_label}
              <ArrowRight size={16} />
            </a>
            <a href={hero.button2_link} className="btn-secondary">
              {hero.button2_label}
            </a>
          </div>

          {/* Stats */}
          <div
            className={`mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 transition-all duration-1000 delay-700 sm:mt-16 sm:grid-cols-4 sm:gap-8 sm:pt-8 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="font-display text-2xl font-bold text-audaz-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-audaz-white-muted sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-audaz-white-muted transition-colors hover:text-audaz-white"
        aria-label="Rolar para baixo"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce-soft" />
      </a>
    </section>
  );
}
