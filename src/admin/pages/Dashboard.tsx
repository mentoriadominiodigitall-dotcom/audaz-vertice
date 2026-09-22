import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, FileText, Code2, Package, Briefcase,
  Star, HelpCircle, TrendingUp, ArrowUpRight, Eye,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useContent } from '@/context/ContentContext';

interface DashboardStats {
  messages: number;
  unreadMessages: number;
  services: number;
  products: number;
  cases: number;
  testimonials: number;
  faq: number;
  blog: number;
}

export default function Dashboard() {
  const { content } = useContent();
  const [stats, setStats] = useState<DashboardStats>({
    messages: 0, unreadMessages: 0, services: 0, products: 0,
    cases: 0, testimonials: 0, faq: 0, blog: 0,
  });
  const [recentMessages, setRecentMessages] = useState<Array<{
    id: string; name: string; email: string; created_at: string; responded: boolean;
  }>>([]);

  useEffect(() => {
    (async () => {
      const [msgs, unread, svcs, prods, cases_, test, faq, blog, recent] = await Promise.all([
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }).eq('responded', false),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('cases').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('faq_items').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('id,name,email,created_at,responded').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        messages: msgs.count || 0,
        unreadMessages: unread.count || 0,
        services: svcs.count || 0,
        products: prods.count || 0,
        cases: cases_.count || 0,
        testimonials: test.count || 0,
        faq: faq.count || 0,
        blog: blog.count || 0,
      });
      setRecentMessages((recent.data as typeof recentMessages) || []);
    })();
  }, []);

  const cards = [
    { label: 'Mensagens', value: stats.messages, sub: `${stats.unreadMessages} não respondidas`, icon: MessageSquare, to: '/admin/messages', color: 'text-audaz-red' },
    { label: 'Serviços', value: stats.services, icon: Code2, to: '/admin/services', color: 'text-audaz-green' },
    { label: 'Produtos', value: stats.products, icon: Package, to: '/admin/products', color: 'text-audaz-yellow' },
    { label: 'Cases', value: stats.cases, icon: Briefcase, to: '/admin/cases', color: 'text-audaz-red' },
    { label: 'Depoimentos', value: stats.testimonials, icon: Star, to: '/admin/testimonials', color: 'text-audaz-green' },
    { label: 'FAQ', value: stats.faq, icon: HelpCircle, to: '/admin/faq', color: 'text-audaz-yellow' },
    { label: 'Blog', value: stats.blog, icon: FileText, to: '/admin/blog', color: 'text-audaz-red' },
    { label: 'Visitas (mês)', value: '—', icon: TrendingUp, to: '/admin/analytics', color: 'text-audaz-green' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Visão geral do seu site</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.to}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">{card.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">{card.value}</p>
                  {card.sub && <p className="mt-1 text-xs text-audaz-red">{card.sub}</p>}
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${card.color}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-white/30 transition-colors group-hover:text-white/60">
                <Eye size={12} />
                Ver detalhes
                <ArrowUpRight size={12} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent messages */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Mensagens recentes</h2>
          <Link to="/admin/messages" className="text-sm text-audaz-red transition-colors hover:text-audaz-red-light">
            Ver todas
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <p className="py-8 text-center text-sm text-white/30">Nenhuma mensagem recebida</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-audaz-red/15 text-xs font-bold text-audaz-red">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{msg.name}</p>
                    <p className="text-xs text-white/40">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!msg.responded && (
                    <span className="rounded-full bg-audaz-red/15 px-2.5 py-0.5 text-xs font-medium text-audaz-red">
                      Nova
                    </span>
                  )}
                  <span className="text-xs text-white/30">
                    {new Date(msg.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/general" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-audaz-red/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-red/10 text-audaz-red">
            <Code2 size={22} strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-white">Editar conteúdo</p>
            <p className="text-xs text-white/40">Altere textos, imagens e links</p>
          </div>
        </Link>
        <Link to="/admin/theme" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-audaz-green/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-green/10 text-audaz-green">
            <Star size={22} strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-white">Cores e fontes</p>
            <p className="text-xs text-white/40">Personalize a aparência</p>
          </div>
        </Link>
        <Link to="/admin/seo" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-audaz-yellow/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-audaz-yellow/10 text-audaz-yellow">
            <TrendingUp size={22} strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-white">SEO</p>
            <p className="text-xs text-white/40">Otimize para o Google</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
