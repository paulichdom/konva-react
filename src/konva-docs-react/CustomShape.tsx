import { Layer, Shape, Stage } from 'react-konva'

export const CustomShape = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Shape
          width={260}
          height={170}
          sceneFunc={(context, shape) => {
            const width = shape.width();
            const height = shape.height();

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width - 40, height - 90);
            context.quadraticCurveTo(width - 110, height - 70, width, height);
            context.closePath()

            context.fillStrokeShape(shape)
          }}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  )
}
