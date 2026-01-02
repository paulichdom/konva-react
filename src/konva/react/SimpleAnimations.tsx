import type Konva from 'konva';
import { useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

export const SimpleAnimations = () => {
  const rectRef = useRef<Konva.Rect>(null)
  const changeSize = () => {
    const rectNode = rectRef.current
    
    if (!rectNode) return;

    rectRef.current?.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2
    })
  }
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          ref={(node) => {
            rectRef.current = node
          }}
          width={50}
          height={50}
          fill="green"
          draggable
          onDragEnd={changeSize}
          onDragStart={changeSize}
        />
      </Layer>
    </Stage>
  )
}
