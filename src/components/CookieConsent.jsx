import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Cookie consent preferences
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  });
  
  // Check for existing consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      // No consent found, show the banner
      setVisible(true);
    } else {
      try {
        // Parse saved preferences
        const savedPreferences = JSON.parse(savedConsent);
        setPreferences(prev => ({
          ...prev,
          ...savedPreferences
        }));
      } catch (e) {
        console.error('Error parsing saved cookie consent');
        setVisible(true);
      }
    }
  }, []);
  
  // Save consent and hide banner
  const saveConsent = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setVisible(false);
    
    // Apply consent settings to third-party scripts
    applyConsentSettings(preferences);
  };
  
  // Accept all cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setVisible(false);
    
    // Apply consent settings
    applyConsentSettings(allAccepted);
  };
  
  // Accept only necessary cookies
  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setVisible(false);
    
    // Apply consent settings
    applyConsentSettings(necessaryOnly);
  };
  
  // Handle preference changes
  const handlePreferenceChange = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // If banner is not visible, don't render anything
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg p-4 border-t-2 border-teal-600">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Политика за бисквитки</h3>
            <p className="text-sm text-gray-600 mb-2">
              Използваме бисквитки, за да подобрим вашето изживяване на сайта. Можете да приемете всички бисквитки или да изберете кои видове да разрешите.
            </p>
            <Link to="/privacy" className="text-teal-600 text-sm hover:underline">
              Научете повече за политиката ни за поверителност
            </Link>
            
            {/* Show detailed options when expanded */}
            {expanded && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="necessary"
                    checked={preferences.necessary}
                    disabled={true} // Always required
                    className="mr-2"
                  />
                  <label htmlFor="necessary" className="text-sm">
                    <span className="font-medium">Необходими</span> - Задължителни за функционирането на сайта
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                    className="mr-2"
                  />
                  <label htmlFor="analytics" className="text-sm">
                    <span className="font-medium">Аналитични</span> - Помагат ни да разберем как използвате сайта
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                    className="mr-2"
                  />
                  <label htmlFor="marketing" className="text-sm">
                    <span className="font-medium">Маркетингови</span> - Бисквитки от социални медии и реклами
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="functional"
                    checked={preferences.functional}
                    onChange={() => handlePreferenceChange('functional')}
                    className="mr-2"
                  />
                  <label htmlFor="functional" className="text-sm">
                    <span className="font-medium">Функционални</span> - За подобрена функционалност на сайта
                  </label>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 md:items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            >
              {expanded ? 'Скрий детайли' : 'Настройки'}
            </button>
            
            <button
              onClick={acceptNecessary}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Само необходимите
            </button>
            
            <button
              onClick={expanded ? saveConsent : acceptAll}
              className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              {expanded ? 'Запази избора' : 'Приеми всички'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to apply consent settings to third-party scripts
function applyConsentSettings(preferences) {
  // Google Analytics
  if (preferences.analytics) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID', 'google-analytics');
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID', { 'anonymize_ip': true });
  }
  
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

// Helper function to load scripts dynamically
function loadScript(src, id) {
  // Check if script already exists
  if (document.getElementById(id)) return;
  
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}