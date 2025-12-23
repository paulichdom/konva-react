import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import type Konva from 'konva';

function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const App = () => {
  const stageRef = React.useRef<Konva.Stage>(null);
  const rectShapeRef = React.useRef(null);
  const [rectPos, setRectPos] = useState({ x: 20, y: 50 });
  const [circlePos, setCirclePos] = useState({ x: 200, y: 100 });

  useEffect(() => {
    console.log(rectShapeRef.current)
  }, [])

  const handleClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    console.log(event.target);
  };

  const handleRectDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    setRectPos({
      x: event.target.x(),
      y: event.target.y()
    })
  }

  const handleCircleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    setCirclePos({
      x: event.target.x(),
      y: event.target.y()
    }
    )
  }

  const handleExport = () => {
    const { current: stageRefCurrent } = stageRef;
    if (!stageRefCurrent) return;

    const dataURL = stageRefCurrent.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 2 // Higher resolution export
    });

    downloadURI(dataURL, 'stage.png')
  }

  return (
    <div>
      <button onClick={handleExport}>
        Click here to export stage as image
      </button>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}>
        <Layer>
          <Text text="Try to drag shapes" />
          <Rect
            ref={rectShapeRef}
            x={rectPos.x}
            y={rectPos.y}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            draggable
            onDragEnd={handleRectDragEnd}
          />
          <Circle
            x={circlePos.x}
            y={circlePos.y}
            radius={50}
            fill="green"
            draggable
            onDragEnd={handleCircleDragEnd}
            onClick={handleClick}
          />
        </Layer>
      </Stage>
    </div>
  )
}

