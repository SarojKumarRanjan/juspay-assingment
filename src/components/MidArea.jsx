import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { SpriteContext } from '../contexts/SpriteContext';
import { v4 as uuidv4 } from 'uuid';

// Component to render a single block in the script
const ScriptBlock = ({ block, index }) => {
  const { sprites, setSprites, activeSprite } = useContext(SpriteContext);

  const handleValueChange = (valIndex, newValue) => {
    const newSprites = { ...sprites };
    newSprites[activeSprite].script[index].values[valIndex] = newValue;
    setSprites(newSprites);
  };

  const getInput = (value, valIndex) => {
      // Simple input for numbers, can be expanded for text
      return <input 
                type="number" 
                value={value}
                className="w-10 mx-1 text-black text-center rounded"
                onChange={(e) => handleValueChange(valIndex, parseInt(e.target.value, 10))}
             />;
  }
  
  // Custom rendering for each block type
  const renderLabel = () => {
    const parts = block.label.split('__');
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < block.values.length && getInput(block.values[i], i)}
      </React.Fragment>
    ));
  }

  return (
    <div className="flex flex-row items-center bg-blue-500 text-white px-4 py-2 my-1 text-sm rounded-lg">
      {renderLabel()}
    </div>
  );
};


export default function MidArea() {
  const { sprites, setSprites, activeSprite } = useContext(SpriteContext);
  const activeSpriteScript = sprites[activeSprite]?.script || [];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item) => {
      const newBlock = { ...item, key: uuidv4() }; // Give each dropped block a unique key
      const newSprites = { ...sprites };
      newSprites[activeSprite].script.push(newBlock);
      setSprites(newSprites);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-auto p-4 ${isOver ? 'bg-green-100' : ''}`}
    >
      <h2 className="text-xl font-bold mb-4">Script for {sprites[activeSprite]?.name}</h2>
      {activeSpriteScript.length === 0 && <p className="text-gray-400">Drag blocks here</p>}
      
      {activeSpriteScript.map((block, index) => (
        <ScriptBlock key={block.key} block={block} index={index} />
      ))}
    </div>
  );
}