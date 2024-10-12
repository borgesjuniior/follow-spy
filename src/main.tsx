import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const INSTAGRAM_HOSTNAME = 'www.instagram.com';
const { hostname } = document.location;

if (hostname !== INSTAGRAM_HOSTNAME) {
  alert('This app can only run on Instagram routes');
} else {
  document.title = 'Follow Spy';
  document.body.innerHTML = '<div id="root"></div>';

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
