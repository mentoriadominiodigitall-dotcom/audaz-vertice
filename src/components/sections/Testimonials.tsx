import { useEffect, useState, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Testimonials() {
  const { content } = useContent();
  const testimonials = content.testimonials;
  const section = content.sectionConfigs.find(s => s.section_key === 'depoimentos');
  const sectionVideo = section?.video_url;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % Math.max(testimonials.length, 1));
  }, [testimonials.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % Math.max(testimonials.length, 1));
  };

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next, testimonials.length]);

  if (section && !section.enabled) return null;
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="section-padding relative overflow-hidden">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-audaz-red/5 blur-[180px]" />
      )}

      <div className="container-base relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal label-tag justify-center">
            <span className="h-px w-8 bg-audaz-red" />
            Depoimentos
            <span className="h-px w-8 bg-audaz-red" />
          </span>
          <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
            O que dizem nossos <span className="text-gradient-red">clientes.</span>
          </h2>
        </div>

        <div
          className="reveal stagger-2 mt-16 mx-auto max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="glass-panel relative p-6 sm:p-8 md:p-12">
            <Quote size={32} className="absolute right-4 top-4 text-audaz-red/20 sm:right-8 sm:top-8 sm:size-12" />

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-expo"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-1"
                  >
                    <blockquote className="text-base font-medium leading-relaxed text-audaz-white sm:text-lg md:text-xl">
                      "{testimonial.text}"
                    </blockquote>

                    {testimonial.rating > 0 && (
                      <div className="mt-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={16} className="fill-audaz-yellow text-audaz-yellow" />
                        ))}
                      </div>
                    )}

                    <div className="mt-8 flex items-center gap-4">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full border-2 border-audaz-red/30 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-display text-base font-semibold text-audaz-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-audaz-white-muted">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-white"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-audaz-red'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-audaz-white-muted transition-all duration-300 hover:border-audaz-red hover:text-audaz-white"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
