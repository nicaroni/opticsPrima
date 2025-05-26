// In src/components/applyConsentSettings.jsx
export function applyConsentSettings(preferences) {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Applying consent settings:', preferences);
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
    
    // Handle Facebook pixel loading - with ad blocker detection
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Attempting to load Facebook tracking');
      }
      
      // Check if likely blocked by ad blocker
      const adBlockDetected = isAdBlockerActive();
      if (adBlockDetected) {
        // Skip loading Facebook script if ad blocker detected
        if (process.env.NODE_ENV === 'development') {
          console.log('Ad blocker detected, skipping Facebook tracking');
        }
        return;
      }
      
      // Only try once, with error suppression
      loadScriptSilently('https://connect.facebook.net/en_US/fbevents.js', 'fb-pixel');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Calendly (functional)
  if (preferences.functional) {
    loadScriptSilently('https://assets.calendly.com/assets/external/widget.js', 'calendly-script')
      .then(() => {
        if (window.Calendly) {
          const calendlyElements = document.querySelectorAll('.calendly-inline-widget');
          calendlyElements.forEach(el => {
            const url = el.dataset.url;
            window.Calendly.initInlineWidget({
              url: url,
              parentElement: el
            });
          });
        }
      })
      .catch(() => {});  // Silent fail
  }
}

// Simple ad blocker detection
function isAdBlockerActive() {
  // Most ad blockers block elements with these common ad-related class names
  const testElem = document.createElement('div');
  testElem.className = 'ads ad adsbox doubleclick pub_300x250 pub_300x250m pub_728x90 text-ad textAd';
  testElem.style.height = '1px';
  testElem.style.position = 'absolute';
  testElem.style.left = '-10000px';
  testElem.style.top = '-10000px';
  document.body.appendChild(testElem);
  
  // Check if the element is hidden by ad blocker
  const isBlocked = testElem.offsetHeight === 0;
  document.body.removeChild(testElem);
  return isBlocked;
}

// Load script silently without console errors
export function loadScriptSilently(src, id, timeout = 5000) {
  return new Promise((resolve) => {
    // Check if script already exists
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    try {
      // Temporarily override console error to suppress script loading errors
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      
      // Only suppress errors related to the script we're trying to load
      console.error = function(...args) {
        if (args.some(arg => 
            typeof arg === 'string' && 
            (arg.includes(src) || arg.includes(id)))) {
          return; // Suppress errors related to this script
        }
        return originalConsoleError.apply(console, args);
      };
      
      console.warn = function(...args) {
        if (args.some(arg => 
            typeof arg === 'string' && 
            (arg.includes(src) || arg.includes(id)))) {
          return; // Suppress warnings related to this script
        }
        return originalConsoleWarn.apply(console, args);
      };
      
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      
      // Handle timeouts and errors silently
      const timeoutId = setTimeout(() => {
        // Restore console functions
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        resolve(); // Resolve anyway after timeout
      }, timeout);
      
      script.onerror = () => {
        clearTimeout(timeoutId);
        // Restore console functions
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        resolve(); // Resolve anyway on error
      };
      
      script.onload = () => {
        clearTimeout(timeoutId);
        // Restore console functions
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        resolve();
      };
      
      document.head.appendChild(script);
    } catch (err) {
      resolve(); // Resolve anyway on exception
    }
  });
}