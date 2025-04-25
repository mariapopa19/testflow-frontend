import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppWrapper } from './components/common/PageMeta';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AppWrapper>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''} // Ensure this is set in your .env file
          >
            <App />
            <Toaster richColors position="top-right" />
          </GoogleOAuthProvider>
        </AppWrapper>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
);

console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
