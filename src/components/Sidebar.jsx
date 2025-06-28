
import { useDrag } from 'react-dnd';

// A single draggable block component
const DraggableBlock = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: block,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-row items-center bg-blue-500 text-white px-4 py-2 my-2 text-sm cursor-pointer rounded-lg ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {block.label}
    </div>
  );
};

export default function Sidebar() {
  // Define all available blocks here
  const blocks = [
    // Motion
    { id: 'MOVE', label: 'Move 10 steps' },
    { id: 'TURN_RIGHT', label: 'Turn ↻ 15 degrees' },
    { id: 'GOTO_XY', label: 'Go to x: 0 y: 0' },
    // Looks
    { id: 'SAY_FOR_SECS', label: 'Say Hello for 2 secs' },
    { id: 'THINK_FOR_SECS', label: 'Think Hmm... for 2 secs' },
    // Events - For Repeat
    { id: 'REPEAT', label: 'Repeat 10 times' },
  ];

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold mb-4">Motion</div>
      <DraggableBlock block={{ id: 'MOVE', label: 'Move 10 steps', values: [10] }} />
      <DraggableBlock block={{ id: 'TURN_RIGHT', label: 'Turn ↻ 15 degrees', values: [15] }} />
      <DraggableBlock block={{ id: 'GOTO_XY', label: 'Go to x: __ y: __', values: [0, 0] }} />
      <DraggableBlock block={{ id: 'REPEAT', label: 'Repeat __ times', values: [10] }} />

      <div className="font-bold mt-6 mb-4">Looks</div>
      <DraggableBlock block={{ id: 'SAY_FOR_SECS', label: 'Say __ for __ secs', values: ['Hello!', 2] }} />
      <DraggableBlock block={{ id: 'THINK_FOR_SECS', label: 'Think __ for __ secs', values: ['Hmm...', 2] }} />
      
      <div className="font-bold mt-6 mb-4">Controls</div>
      
    </div>
  );
}