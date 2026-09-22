import { ArrowUpRight, Clock, User } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import SectionVideo from '@/components/SectionVideo';

export default function Blog() {
  const { content } = useContent();
  const blogPosts = content.blogPosts;
  const partners = content.partners.map(p => p.name);
  const section = content.sectionConfigs.find(s => s.section_key === 'blog');
  const sectionVideo = section?.video_url;

  if (section && !section.enabled) return null;

  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      {sectionVideo && (
        <SectionVideo
          videoUrl={sectionVideo}
          className="absolute inset-0 h-full w-full"
          overlayOpacity={0.85}
        />
      )}
      {!sectionVideo && (
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-audaz-yellow/5 blur-[150px]" />
      )}

      <div className="container-base relative">
        {/* Partners marquee */}
        {partners.length > 0 && (
          <div className="reveal mb-16 overflow-hidden sm:mb-24">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-audaz-white-muted">
              Empresas que confiam na Audaz
            </p>
            <div className="mask-fade-edges overflow-hidden">
              <div className="flex w-max animate-marquee gap-16">
                {[...partners, ...partners].map((partner, i) => (
                  <span
                    key={i}
                    className="font-display text-xl font-bold text-white/20 transition-colors hover:text-white/40"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="reveal label-tag">
              <span className="h-px w-8 bg-audaz-red" />
              Blog
            </span>
            <h2 className="reveal stagger-1 mt-6 text-display-lg font-bold text-balance">
              Insights para sua marca
              <span className="text-gradient-red"> crescer.</span>
            </h2>
          </div>
          <p className="reveal stagger-2 max-w-sm text-base text-audaz-white-muted">
            Artigos, estudos e tendências do universo digital, escritos pelo nosso
            time de especialistas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              className={`reveal-scale stagger-${i + 1} group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent transition-all duration-500 hover:border-white/20 hover:-translate-y-1`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-audaz-black/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-audaz-black/60 px-3 py-1 text-xs font-semibold text-audaz-red backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-xs text-audaz-white-muted">
                  <span className="flex items-center gap-1.5">
                    <User size={12} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.read_time}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-audaz-white transition-colors group-hover:text-audaz-red">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-audaz-white-muted">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6">
                  <span className="text-xs text-audaz-white-muted">
                    {post.publish_date ? new Date(post.publish_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                  </span>
                  <a
                    href="#blog"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-audaz-white transition-colors hover:text-audaz-red"
                  >
                    Ler artigo
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
