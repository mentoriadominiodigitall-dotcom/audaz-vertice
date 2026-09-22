export interface SiteConfig {
  id: string;
  company_name: string;
  description: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  tiktok: string;
  address: string;
  hours: string;
  logo_light: string;
  logo_dark: string;
  favicon: string;
}

export interface HeroConfig {
  id: string;
  title_line1: string;
  title_line2: string;
  title_line3: string;
  subtitle: string;
  description: string;
  button1_label: string;
  button1_link: string;
  button2_label: string;
  button2_link: string;
  background_type: string;
  background_url: string;
  overlay_opacity: number;
  enabled: boolean;
}

export interface SectionConfig {
  id: string;
  section_key: string;
  section_label: string;
  title: string;
  subtitle: string;
  description: string;
  enabled: boolean;
  position: number;
  video_url?: string | null;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  position: number;
  enabled: boolean;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  position: number;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  text: string;
  position: number;
}

export interface Diferencial {
  id: string;
  icon: string;
  title: string;
  text: string;
  position: number;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
  category: string;
  position: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  status: string;
  position: number;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  text: string;
  position: number;
}

export interface CaseResult {
  metric: string;
  label: string;
}

export interface CaseItem {
  id: string;
  client: string;
  description: string;
  image: string;
  results: CaseResult[];
  tags: string[];
  position: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  photo: string;
  rating: number;
  position: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  position: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publish_date: string | null;
  read_time: string;
  image: string;
  slug: string;
  published: boolean;
  position: number;
}

export interface Partner {
  id: string;
  name: string;
  position: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  responded: boolean;
  created_at: string;
}

export interface SeoSettings {
  id: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
  og_type: string;
  twitter_card: string;
  robots: string;
  canonical: string;
  schema_org: Record<string, unknown>;
}

export interface AnalyticsSettings {
  id: string;
  ga4_id: string;
  gtm_id: string;
  meta_pixel_id: string;
  microsoft_clarity_id: string;
}

export interface ThemeSettings {
  id: string;
  color_primary: string;
  color_secondary: string;
  color_accent: string;
  color_button: string;
  color_button_hover: string;
  color_title: string;
  color_text: string;
  color_link: string;
  color_card: string;
  color_background: string;
  color_hover: string;
  font_display: string;
  font_body: string;
  font_base_size: string;
  font_heading_weight: string;
  font_body_weight: string;
  font_heading_line_height: string;
  font_body_line_height: string;
  font_letter_spacing: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
}

export interface SiteContent {
  siteConfig: SiteConfig | null;
  heroConfig: HeroConfig | null;
  sectionConfigs: SectionConfig[];
  navLinks: NavLink[];
  stats: Stat[];
  values: ValueItem[];
  diferenciais: Diferencial[];
  services: Service[];
  products: Product[];
  processSteps: ProcessStep[];
  cases: CaseItem[];
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  blogPosts: BlogPost[];
  partners: Partner[];
  seoSettings: SeoSettings | null;
  analyticsSettings: AnalyticsSettings | null;
  themeSettings: ThemeSettings | null;
}
