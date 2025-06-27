import React from 'react';

export default function CatSprite({ sprite }) {
  const { x, y, direction, costume, message, isThinking } = sprite;

  const bubbleClasses = "absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-gray-400 rounded-lg px-2 py-1 text-sm";
  
  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${direction - 90}deg)`, // Adjusting so 90deg is right
      }}
    >
      {message && (
        <div className={bubbleClasses}>
          {message}
          {/* Add a small tail for the bubble */}
          <div className={`absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 ${isThinking ? "" : "border-t-8 border-t-white"}`}></div>
        </div>
      )}
      <img src={costume} alt="sprite" className="w-20 h-20" />
    </div>
  );
}