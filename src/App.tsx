import { Routes, Route } from 'react-router-dom';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Diferenciais from '@/components/sections/Diferenciais';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';
import Process from '@/components/sections/Process';
import Cases from '@/components/sections/Cases';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import AdminApp from '@/admin/AdminApp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useThemeApplier } from '@/hooks/useThemeApplier';
import { useSeoApplier } from '@/hooks/useSeoApplier';
import { useAnalyticsApplier } from '@/hooks/useAnalyticsApplier';
import { useContent } from '@/context/ContentContext';

function PublicSite() {
  const { loading, content } = useContent();
  const ref = useScrollReveal<HTMLDivElement>([loading]);

  useThemeApplier();
  useSeoApplier();
  useAnalyticsApplier();

  return (
    <>
      <Loader />
      <Navbar />
      {loading && null}
      <div ref={ref} style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <main>
          <Hero />
          <About />
          <Diferenciais />
          <Services />
          <Products />
          <Process />
          <Cases />
          <Testimonials />
          <FAQ />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
      {loading && null}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}

export default App;
