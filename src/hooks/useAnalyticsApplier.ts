import { useEffect } from 'react';
import { useContent } from '@/context/ContentContext';

export function useAnalyticsApplier() {
  const { content, loading } = useContent();
  const analytics = content.analyticsSettings;

  useEffect(() => {
    if (loading || !analytics) return;

    // GA4
    if (analytics.ga4_id) {
      const existing = document.getElementById('ga4-script');
      if (!existing) {
        const s1 = document.createElement('script');
        s1.id = 'ga4-script';
        s1.async = true;
        s1.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.ga4_id}`;
        document.head.appendChild(s1);

        const s2 = document.createElement('script');
        s2.id = 'ga4-init';
        s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analytics.ga4_id}');`;
        document.head.appendChild(s2);
      }
    }

    // GTM
    if (analytics.gtm_id) {
      const existing = document.getElementById('gtm-script');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'gtm-script';
        s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analytics.gtm_id}');`;
        document.head.appendChild(s);
      }
    }

    // Meta Pixel
    if (analytics.meta_pixel_id) {
      const existing = document.getElementById('meta-pixel');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'meta-pixel';
        s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${analytics.meta_pixel_id}');fbq('track','PageView');`;
        document.head.appendChild(s);
      }
    }

    // Microsoft Clarity
    if (analytics.microsoft_clarity_id) {
      const existing = document.getElementById('clarity-script');
      if (!existing) {
        const s = document.createElement('script');
        s.id = 'clarity-script';
        s.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${analytics.microsoft_clarity_id}");`;
        document.head.appendChild(s);
      }
    }
  }, [analytics, loading]);
}
