// In src/components/ErrorBoundary.jsx - fix the missing React import
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorInfo: null };
  
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error);
    this.setState({ errorInfo });
    
    // Optional: log to a service like Sentry
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-4">
          <h2 className="text-xl font-bold text-red-700 mb-2">Нещо се обърка</h2>
          <p className="text-gray-700">Моля опитайте отново или се свържете с нас</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

