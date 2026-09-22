import { useEffect } from 'react';
import { useContent } from '@/context/ContentContext';

export function useSeoApplier() {
  const { content, loading } = useContent();
  const seo = content.seoSettings;

  useEffect(() => {
    if (loading || !seo) return;

    document.title = seo.meta_title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', seo.meta_description);
    setMeta('keywords', seo.keywords);
    setMeta('robots', seo.robots);
    setMeta('author', 'Audaz Vértice Digital');

    setMeta('og:title', seo.meta_title, 'property');
    setMeta('og:description', seo.meta_description, 'property');
    setMeta('og:type', seo.og_type, 'property');
    setMeta('og:image', seo.og_image, 'property');

    setMeta('twitter:card', seo.twitter_card);
    setMeta('twitter:title', seo.meta_title);
    setMeta('twitter:description', seo.meta_description);

    const canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalEl) {
      canonicalEl.href = seo.canonical;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = seo.canonical;
      document.head.appendChild(link);
    }

    let schemaEl = document.getElementById('schema-org') as HTMLScriptElement | null;
    if (Object.keys(seo.schema_org).length > 0) {
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = 'schema-org';
        schemaEl.type = 'application/ld+json';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(seo.schema_org);
    }
  }, [seo, loading]);
}
