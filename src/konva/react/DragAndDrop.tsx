import { useState } from "react"
import { Layer, Stage, Text } from "react-konva"

export const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50
  })

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          text="Draggable text"
          x={position.x}
          y={position.y}
          draggable
          fill={isDragging ? 'green' : 'black'}
          onDragStart={() => {
            setIsDragging(true)
          }}
          onDragEnd={(event) => {
            setIsDragging(false)
            setPosition({
              x: event.target.x(),
              y: event.target.y()
            })
          }}
        />
      </Layer>
    </Stage>
  )
}

