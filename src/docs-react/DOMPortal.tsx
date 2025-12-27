import { Layer, Rect, Stage } from "react-konva"
import { Html } from "react-konva-utils"

export const DOMPortal = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Html>
          <input placeholder="DOM input from Konva nodes" />
        </Html>
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill="red"
          shadowBlur={5}
        />
      </Layer>
    </Stage>
  )
}
