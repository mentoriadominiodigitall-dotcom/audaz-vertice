import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminLogin from '@/admin/pages/AdminLogin';
import AdminLayout from '@/admin/layout/AdminLayout';
import Dashboard from '@/admin/pages/Dashboard';
import GeneralInfo from '@/admin/pages/GeneralInfo';
import HeroEditor from '@/admin/pages/HeroEditor';
import SectionsManager from '@/admin/pages/SectionsManager';
import ServicesManager from '@/admin/pages/ServicesManager';
import ProductsManager from '@/admin/pages/ProductsManager';
import CasesManager from '@/admin/pages/CasesManager';
import TestimonialsManager from '@/admin/pages/TestimonialsManager';
import FaqManager from '@/admin/pages/FaqManager';
import BlogManager from '@/admin/pages/BlogManager';
import MessagesInbox from '@/admin/pages/MessagesInbox';
import ThemeSettings from '@/admin/pages/ThemeSettings';
import SeoSettings from '@/admin/pages/SeoSettings';
import AnalyticsSettings from '@/admin/pages/AnalyticsSettings';
import SettingsPage from '@/admin/pages/SettingsPage';
import SectionMedia from '@/admin/pages/SectionMedia';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-audaz-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-audaz-red" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="general" element={<GeneralInfo />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="sections" element={<SectionsManager />} />
        <Route path="section-media" element={<SectionMedia />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="cases" element={<CasesManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="faq" element={<FaqManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="messages" element={<MessagesInbox />} />
        <Route path="theme" element={<ThemeSettings />} />
        <Route path="seo" element={<SeoSettings />} />
        <Route path="analytics" element={<AnalyticsSettings />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
