import { ArrowUpRight, Tag } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Products() {
  const { content } = useContent();
  const products = content.products.filter(p => p.status === 'active');
  const section = content.sectionConfigs.find(s => s.section_key === 'produtos');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="produtos" className="section-padding relative overflow-hidden bg-audaz-black-soft">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <div className="absolute inset-0 bg-grid opacity-20" />
      )}

      <div className="container-base relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="reveal label-tag">
              <span className="h-px w-8 bg-audaz-red" />
              Produtos
            </span>
            <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
              Soluções prontas para
              <span className="text-gradient-gold"> acelerar</span> seu negócio.
            </h2>
          </div>
          <p className="reveal stagger-2 max-w-sm text-base text-audaz-white-muted">
            Pacotes desenhados para necessidades específicas. Transparência total
            em escopo e investimento.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <article
              key={product.id}
              className={`reveal-scale stagger-${i + 1} group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent transition-all duration-500 hover:border-audaz-yellow/30 hover:-translate-y-1`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-audaz-black via-audaz-black/30 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-audaz-black/60 px-3 py-1 text-xs font-medium text-audaz-yellow backdrop-blur-md">
                  <Tag size={11} />
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-semibold text-audaz-white">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-audaz-white-muted">
                  {product.description}
                </p>
                <div className="mt-auto pt-6">
                  <p className="font-display text-sm font-bold text-audaz-green">
                    {product.price}
                  </p>
                  <a
                    href="#contato"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-audaz-white transition-colors hover:text-audaz-yellow"
                  >
                    Quero este
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
