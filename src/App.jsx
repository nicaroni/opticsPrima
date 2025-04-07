import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home'; 
import PrivacyPolicy from './containers/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <CookieConsent />
    
    </Router>
  );
}

export default App;