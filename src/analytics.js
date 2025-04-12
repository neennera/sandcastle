// src/analytics.js
export const initGA = () => {
    if (typeof window !== 'undefined') {
      // Ensure the Google Analytics script is loaded
      if (!document.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=G-RXJRJGKVM6"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RXJRJGKVM6';
        document.head.appendChild(script);
  
        script.onload = () => {
          // Initialize Google Analytics after the script is loaded
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          window.gtag = gtag; // Expose gtag globally
          gtag('js', new Date());
          gtag('config', 'G-RXJRJGKVM6');
        };
      }
    }
  };