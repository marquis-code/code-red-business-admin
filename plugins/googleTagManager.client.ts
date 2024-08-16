// plugins/googleTagManager.client.ts

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      // Add the Google Tag Manager script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LBKDWY7DZM';
      document.head.appendChild(script);
  
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', 'G-LBKDWY7DZM');
      };
    }
  });
  