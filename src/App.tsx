import { useState } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';

export const App = () => {
  const [rectPos, setRectPos] = useState({ x: 20, y: 50 });
  const [circlePos, setCirclePos] = useState({ x: 200, y: 100 });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag shapes" />
        <Rect
          x={rectPos.x}
          y={rectPos.y}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
          draggable
          onDragEnd={(e) => {
            setRectPos({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
        <Circle
          x={circlePos.x}
          y={circlePos.y}
          radius={50}
          fill="green"
          draggable
          onDragEnd={(e) => {
            setCirclePos({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      </Layer>
    </Stage>
  )
}

