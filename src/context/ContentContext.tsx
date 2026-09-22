import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteContent } from '@/types';

const emptyContent: SiteContent = {
  siteConfig: null,
  heroConfig: null,
  sectionConfigs: [],
  navLinks: [],
  stats: [],
  values: [],
  diferenciais: [],
  services: [],
  products: [],
  processSteps: [],
  cases: [],
  testimonials: [],
  faqItems: [],
  blogPosts: [],
  partners: [],
  seoSettings: null,
  analyticsSettings: null,
  themeSettings: null,
};

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue>({
  content: emptyContent,
  loading: true,
  refresh: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(emptyContent);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [
        siteConfig, heroConfig, sectionConfigs, navLinks, stats,
        values, diferenciais, services, products, processSteps,
        cases, testimonials, faqItems, blogPosts, partners,
        seoSettings, analyticsSettings, themeSettings,
      ] = await Promise.all([
        supabase.from('site_config').select('*').maybeSingle(),
        supabase.from('hero_config').select('*').maybeSingle(),
        supabase.from('section_config').select('*').order('position'),
        supabase.from('nav_links').select('*').eq('enabled', true).order('position'),
        supabase.from('stats').select('*').order('position'),
        supabase.from('values').select('*').order('position'),
        supabase.from('diferenciais').select('*').order('position'),
        supabase.from('services').select('*').order('position'),
        supabase.from('products').select('*').order('position'),
        supabase.from('process_steps').select('*').order('position'),
        supabase.from('cases').select('*').order('position'),
        supabase.from('testimonials').select('*').order('position'),
        supabase.from('faq_items').select('*').order('position'),
        supabase.from('blog_posts').select('*').eq('published', true).order('position'),
        supabase.from('partners').select('*').order('position'),
        supabase.from('seo_settings').select('*').maybeSingle(),
        supabase.from('analytics_settings').select('*').maybeSingle(),
        supabase.from('theme_settings').select('*').maybeSingle(),
      ]);

      setContent({
        siteConfig: siteConfig.data as SiteContent['siteConfig'],
        heroConfig: heroConfig.data as SiteContent['heroConfig'],
        sectionConfigs: (sectionConfigs.data || []) as SiteContent['sectionConfigs'],
        navLinks: (navLinks.data || []) as SiteContent['navLinks'],
        stats: (stats.data || []) as SiteContent['stats'],
        values: (values.data || []) as SiteContent['values'],
        diferenciais: (diferenciais.data || []) as SiteContent['diferenciais'],
        services: (services.data || []) as SiteContent['services'],
        products: (products.data || []) as SiteContent['products'],
        processSteps: (processSteps.data || []) as SiteContent['processSteps'],
        cases: (cases.data || []) as SiteContent['cases'],
        testimonials: (testimonials.data || []) as SiteContent['testimonials'],
        faqItems: (faqItems.data || []) as SiteContent['faqItems'],
        blogPosts: (blogPosts.data || []) as SiteContent['blogPosts'],
        partners: (partners.data || []) as SiteContent['partners'],
        seoSettings: seoSettings.data as SiteContent['seoSettings'],
        analyticsSettings: analyticsSettings.data as SiteContent['analyticsSettings'],
        themeSettings: themeSettings.data as SiteContent['themeSettings'],
      });
    } catch (err) {
      console.error('Failed to load content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
