// In src/components/applyConsentSettings.jsx
export function applyConsentSettings(preferences) {
  console.log('Applying consent settings:', preferences);
  
  // Facebook (marketing)
  if (preferences.marketing) {
    // Re-enable Facebook embeds if needed
    const facebookElements = document.querySelectorAll('.fb-embed-placeholder');
    facebookElements.forEach(el => {
      // Replace placeholder with actual Facebook embed
      const iframe = document.createElement('iframe');
      iframe.src = el.dataset.src;
      iframe.className = el.dataset.class;
      iframe.title = "Facebook Page";
      iframe.style.border = 'none';
      iframe.allow = "encrypted-media";
      el.parentNode.replaceChild(iframe, el);
    });
  }
  
  // Calendly (functional)
  if (preferences.functional) {
    loadScript('https://assets.calendly.com/assets/external/widget.js', 'calendly-script');
    
    // Re-initialize Calendly widgets if needed
    const calendlyElements = document.querySelectorAll('.calendly-inline-widget');
    if (window.Calendly) {
      calendlyElements.forEach(el => {
        const url = el.dataset.url;
        // Re-initialize Calendly
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: el
        });
      });
    }
  }
}

// Also export this helper function
export function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    try {
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onerror = (e) => {
        console.warn(`Failed to load script: ${src}`);
        // Don't reject to avoid breaking other functionality
        resolve();
      };
      script.onload = () => resolve();
      document.head.appendChild(script);
    } catch (err) {
      console.warn('Error loading script:', err);
      resolve(); // Still resolve to avoid breaking functionality
    }
  });
}