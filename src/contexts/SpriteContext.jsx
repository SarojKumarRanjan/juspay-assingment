import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const SpriteContext = createContext();

// Initial sprite setup
const initialSprites = {
  [uuidv4()]: {
    name: "Sprite1",
    x: 0,
    y: 0,
    direction: 90,
    costume: "/cat.png", // Assume cat.png is in the public folder
    script: [],
  }
};

export const SpriteProvider = ({ children }) => {
  const [sprites, setSprites] = useState(initialSprites);
  const [activeSprite, setActiveSprite] = useState(Object.keys(initialSprites)[0]);

  const value = { sprites, setSprites, activeSprite, setActiveSprite };

  return (
    <SpriteContext.Provider value={value}>
      {children}
    </SpriteContext.Provider>
  );
};