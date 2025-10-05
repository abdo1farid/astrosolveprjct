import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import App from './App.jsx';
import './index.css';
import 'lenis/dist/lenis.css'
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

const Root = () => {
  // Temporarily set to false while debugging to render the app immediately
  const [isLoading, setIsLoading] = useState(false);

  return (
    <React.StrictMode>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthProvider>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
