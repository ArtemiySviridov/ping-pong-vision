import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.scss';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
