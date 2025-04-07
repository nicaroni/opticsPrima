import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import the function from your file
import { applyConsentSettings } from './applyConsentSettings';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Cookie consent preferences - removed analytics
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    marketing: false,
    functional: false
  });
  
  // Check for existing consent on mount
  useEffect(() => {
    // Short timeout to allow page to render first
    setTimeout(() => {
      try {
        const savedConsent = localStorage.getItem('cookie-consent');
        if (!savedConsent) {
          // No consent found, show the banner
          setVisible(true);
        } else {
          try {
            // Parse saved preferences AND verify it's valid
            const savedPreferences = JSON.parse(savedConsent);
            
            // Check if it has the expected structure
            if (!savedPreferences || typeof savedPreferences !== 'object' || 
                !('necessary' in savedPreferences)) {
              // Invalid data structure, show banner
              localStorage.removeItem('cookie-consent');
              setVisible(true);
              return;
            }
            
            setPreferences(prev => ({
              ...prev,
              ...savedPreferences
            }));
            
            // Important: Apply settings on page load for returning visitors
            applyConsentSettings(savedPreferences);
          } catch (e) {
            console.error('Error parsing saved cookie consent');
            localStorage.removeItem('cookie-consent');
            setVisible(true);
          }
        }
      } catch (storageError) {
        console.error('Error accessing localStorage:', storageError);
        setVisible(true);
      }
    }, 300); // Small delay for better UX
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
    console.log("Accept all clicked");
    const allAccepted = {
      necessary: true,
      marketing: true,
      functional: true
    };
    
    setPreferences(allAccepted);
    
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
    
    setVisible(false);
    applyConsentSettings(allAccepted);
  };
  
  // Accept only necessary cookies
  const acceptNecessary = () => {
    console.log("Accept necessary clicked");
    const necessaryOnly = {
      necessary: true,
      marketing: false,
      functional: false
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    console.log("Setting visible to false");
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
  useEffect(() => {
    if (visible) {
      console.log("Cookie consent banner should be visible now!");
    }
  }, [visible]);

  // Make sure this is right before your return statement
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-lg p-4 border-t-2 border-teal-600">
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

