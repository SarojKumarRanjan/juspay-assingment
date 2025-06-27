import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. Import the necessary components from react-dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Import your custom context provider as well
import { SpriteProvider } from './contexts/SpriteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Wrap your entire App with the DndProvider */}
    {/* It needs a 'backend' prop, HTML5Backend is the standard one for web */}
    <DndProvider backend={HTML5Backend}>
      {/* It's good practice to have your own providers inside library providers */}
      <SpriteProvider>
        <App />
      </SpriteProvider>
    </DndProvider>
  </React.StrictMode>
);