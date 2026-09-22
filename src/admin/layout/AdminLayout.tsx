import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Image, Code2, Package, Briefcase,
  MessageSquare, FileText, Palette, Search, BarChart3, Mail,
  LogOut, Menu, X, Sun, Moon, Home, Layers, HelpCircle, Star,
  Type, ShoppingBag, ArrowUpRight, Film,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/general', label: 'Informações Gerais', icon: Settings },
  { to: '/admin/hero', label: 'Hero / Banner', icon: Image },
  { to: '/admin/sections', label: 'Seções', icon: Layers },
  { to: '/admin/section-media', label: 'Vídeos das Seções', icon: Film },
  { to: '/admin/services', label: 'Serviços', icon: Code2 },
  { to: '/admin/products', label: 'Produtos', icon: Package },
  { to: '/admin/cases', label: 'Cases', icon: Briefcase },
  { to: '/admin/testimonials', label: 'Depoimentos', icon: Star },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
  { to: '/admin/messages', label: 'Mensagens', icon: Mail },
  { to: '/admin/theme', label: 'Cores & Fontes', icon: Palette },
  { to: '/admin/seo', label: 'SEO', icon: Search },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Configurações', icon: Settings },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-audaz-black' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${darkMode ? 'bg-audaz-black-soft border-white/5' : 'bg-white border-gray-200'} border-r lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-2">
              <span className={`font-display text-lg font-bold ${darkMode ? 'text-audaz-white' : 'text-gray-900'}`}>Audaz</span>
              <span className="font-display text-lg font-light text-audaz-red">Admin</span>
            </div>
            <button
              className="text-white/40 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-audaz-red/10 text-audaz-red'
                            : darkMode
                              ? 'text-white/50 hover:bg-white/5 hover:text-white'
                              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon size={18} strokeWidth={1.5} />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/5 p-3">
            <a
              href="/"
              target="_blank"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                darkMode ? 'text-white/50 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Home size={18} strokeWidth={1.5} />
              Ver site
              <ArrowUpRight size={14} className="ml-auto" />
            </a>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-audaz-red transition-colors hover:bg-audaz-red/10"
            >
              <LogOut size={18} strokeWidth={1.5} />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header
          className={`sticky top-0 z-30 flex items-center justify-between border-b px-6 py-4 ${
            darkMode ? 'bg-audaz-black/80 border-white/5 backdrop-blur-xl' : 'bg-white/80 border-gray-200 backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              className={`lg:hidden ${darkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Buscar..."
                className={`w-64 rounded-lg border py-2 pl-9 pr-3 text-sm transition-colors ${
                  darkMode
                    ? 'border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-audaz-red/50'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-audaz-red/50'
                } focus:outline-none`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                darkMode ? 'border-white/10 text-white/60 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'
              }`}
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-audaz-red/15 text-sm font-bold text-audaz-red">
                {profile?.display_name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {profile?.display_name || 'Administrador'}
                </p>
                <p className="text-xs text-white/40">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
