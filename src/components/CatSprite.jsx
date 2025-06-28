import React, { useContext, useState, useEffect } from 'react';
import { SpriteContext } from '../contexts/SpriteContext';

export default function CatSprite({ sprite, id }) {
  const { setSprites } = useContext(SpriteContext);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent ghost drag outline
    setDragging(true);
    setOffset({
      x: e.clientX - sprite.x,
      y: e.clientY - sprite.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    setSprites(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: newX,
        y: newY,
      },
    }));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <img
      src={sprite.costume}
      alt={sprite.name}
      draggable={false} // Prevent ghost image
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: sprite.x,
        top: sprite.y,
        cursor: 'grab',
        width: 80,
        height: 80,
      }}
    />
  );
}
