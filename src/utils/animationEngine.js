// Utility to wait for a certain amount of time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility for collision detection (Bounding Box)
const checkCollision = (spriteA, spriteB) => {
  const rectA = { x: spriteA.x, y: spriteA.y, width: 80, height: 80 }; // Assuming 80x80 sprite
  const rectB = { x: spriteB.x, y: spriteB.y, width: 80, height: 80 };
  
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  );
};

// The main animation runner
export default async function runAnimation(spriteId, allSprites, setSprites) {
  let currentSprites = { ...allSprites };
  const script = currentSprites[spriteId].script;

  const executeBlock = async (block) => {
    switch (block.id) {
      case 'MOVE': {
        const steps = block.values[0];
        const rad = (currentSprites[spriteId].direction * Math.PI) / 180;
        const newX = currentSprites[spriteId].x + steps * Math.cos(rad);
        const newY = currentSprites[spriteId].y + steps * Math.sin(rad);
        
        currentSprites[spriteId].x = newX;
        currentSprites[spriteId].y = newY;
        setSprites({ ...currentSprites });
        await wait(50); // Small delay to see movement
        break;
      }
      case 'TURN_RIGHT': {
        const degrees = block.values[0];
        currentSprites[spriteId].direction += degrees;
        setSprites({ ...currentSprites });
        await wait(50);
        break;
      }
      case 'GOTO_XY': {
        currentSprites[spriteId].x = block.values[0];
        currentSprites[spriteId].y = block.values[1];
        setSprites({ ...currentSprites });
        await wait(50);
        break;
      }
      case 'SAY_FOR_SECS': {
        const message = block.values[0];
        const duration = block.values[1] * 1000;
        currentSprites[spriteId].message = message;
        currentSprites[spriteId].isThinking = false;
        setSprites({ ...currentSprites });
        await wait(duration);
        currentSprites[spriteId].message = null;
        setSprites({ ...currentSprites });
        break;
      }
      case 'THINK_FOR_SECS': {
        const message = block.values[0];
        const duration = block.values[1] * 1000;
        currentSprites[spriteId].message = message;
        currentSprites[spriteId].isThinking = true;
        setSprites({ ...currentSprites });
        await wait(duration);
        currentSprites[spriteId].message = null;
        setSprites({ ...currentSprites });
        break;
      }
      case 'REPEAT': {
        const times = block.values[0];
        // NOTE: This is a simplified repeat. A real implementation
        // would need to handle nested blocks properly.
        // For this demo, we'll assume it repeats the *entire* script.
        // This is a placeholder for a more complex implementation.
        console.warn("Repeat block is simplified for this demo.");
        break;
      }
      default:
        break;
    }
    
    // HERO FEATURE: Collision Detection and Script Swap
    for (const otherSpriteId in currentSprites) {
      if (spriteId !== otherSpriteId) {
        if (checkCollision(currentSprites[spriteId], currentSprites[otherSpriteId])) {
          console.log(`Collision detected between ${currentSprites[spriteId].name} and ${currentSprites[otherSpriteId].name}! Swapping scripts.`);
          const scriptA = currentSprites[spriteId].script;
          const scriptB = currentSprites[otherSpriteId].script;

          currentSprites[spriteId].script = scriptB;
          currentSprites[otherSpriteId].script = scriptA;
          
          setSprites({ ...currentSprites });

          // To prevent immediate re-swapping, we might add a cooldown, but for now this is fine.
          return true; // Return true to indicate a swap happened
        }
      }
    }
    return false; // No swap
  };

  // Main execution loop
  let keepRunning = true;
  while(keepRunning) {
      for (const block of script) {
          const swapped = await executeBlock(block);
          if(swapped) {
            // If scripts were swapped, we stop this sprite's current execution
            // to let the new script take over on the next 'Play' click.
            console.log(`${currentSprites[spriteId].name}'s script execution halted due to swap.`);
            keepRunning = false;
            break;
          }
      }
      // If we are not repeating, break the loop
      if (!script.find(b => b.id === 'REPEAT')) {
        keepRunning = false;
      }
  }
}