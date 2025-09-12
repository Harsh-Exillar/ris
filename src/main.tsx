import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set dynamic CSP policy using environment variables
const setDynamicCSP = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  
  const cspContent = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    `connect-src 'self' ${supabaseUrl} ${webhookUrl}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');

  // Create and set the CSP meta tag
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', cspContent);
  document.head.appendChild(meta);
};

// Set CSP before rendering the app
setDynamicCSP();

createRoot(document.getElementById("root")!).render(<App />);
