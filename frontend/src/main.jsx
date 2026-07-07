import React from 'react';
import { createRoot } from 'react-dom/client';
import { TransitNavigation } from './components/TransitNavigation';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransitNavigation />
  </React.StrictMode>
);
