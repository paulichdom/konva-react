import type Konva from 'konva';
import React from 'react'
import { Stage, Layer, Line, Text } from 'react-konva';

type Lines = {
  tool: string;
  points: number[];
}

type Tool = 'pen' | 'eraser'

export const FreeDrawing = () => {
  const [tool, setTool] = React.useState<Tool>('pen');
  const [lines, setLines] = React.useState<Lines[]>([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;

    const stage = event.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    let lastLine = lines[lines.length - 1];

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value as Tool);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
