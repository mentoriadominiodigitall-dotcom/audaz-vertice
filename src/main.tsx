import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ContentProvider } from '@/context/ContentContext';
import { AuthProvider } from '@/context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
