import { useEffect } from 'react';

const GoogleAnalyticsTracker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4GE4P5D1DW';
    document.body.appendChild(script);

    const dataLayer = window.dataLayer || [];

    function gtag(...args) {
      dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-4GE4P5D1DW');
  }, []);

  return null;
};

export default GoogleAnalyticsTracker;
