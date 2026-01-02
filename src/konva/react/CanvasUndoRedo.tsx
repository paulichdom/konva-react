import type Konva from 'konva';
import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';

export const CanvasUndoRedo = () => {
  const [position, setPosition] = React.useState({ x: 20, y: 20 });

  // We use refs to keep history to avoid unnecessary re-renders
  const history = React.useRef([{ x: 20, y: 20 }]);
  const historyStep = React.useRef(0);

  const handleUndo = () => {
    if (historyStep.current === 0) {
      return;
    }

    historyStep.current -= 1;
    const previous = history.current[historyStep.current]
    setPosition(previous)
  }
  const handleRedo = () => {
    if (historyStep.current === history.current.length - 1) {
      return;
    }

    historyStep.current += 1;
    const next = history.current[historyStep.current]
    setPosition(next)
  }

  const handleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    // Remove all states after current step
    history.current = history.current.slice(0, historyStep.current + 1);
    const position = {
      x: event.target.x(),
      y: event.target.y(),
    }

    // Push the new state
    history.current = history.current.concat([position]);
    historyStep.current += 1;
    setPosition(position)
  }
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        <Rect
          x={position.x}
          y={position.y}
          width={50}
          height={50}
          fill="black"
          draggable
          onDragEnd={handleDragEnd}
        />
      </Layer>
    </Stage>
  )
}
