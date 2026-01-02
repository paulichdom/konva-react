import type Konva from 'konva';
import React from 'react'
import { Stage, Layer, Rect, Transformer } from 'react-konva';

type RectangleShapeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
}

type RectangleProps = {
  shapeProps: RectangleShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attr: RectangleShapeProps) => void;
}

export const Rectangle: React.FC<RectangleProps> = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef<Konva.Rect>(null);
  const transformerRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef.current) {
      // we need to attach transformer manually
      transformerRef.current?.nodes([shapeRef.current])
    }
  }, [isSelected])

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(event) => {
          onChange({
            ...shapeProps,
            x: event.target.x(),
            y: event.target.y()
          })
        }}
        onTransformEnd={(_event) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node?.scaleX();
          const scaleY = node?.scaleY();

          // we will reset it back;
          node?.scaleX(1);
          node?.scaleY(1);
          onChange({
            ...shapeProps,
            x: node?.x() ?? shapeProps.x,
            y: node?.y() ?? shapeProps.y,
            // set minimal value
            width: Math.max(5, (node?.width() ?? 0) * (scaleX ?? 1)),
            height: Math.max((node?.height() ?? 0) * (scaleY ?? 1))
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox
            }

            return newBox
          }}
        />
      )}
    </React.Fragment>
  )
}

const initialRectangles: RectangleShapeProps[] = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
];

export const KonvaTransformer = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const checkDeselect = (event: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage();

    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rectangle, index) => {
          return (
            <Rectangle
              key={index}
              shapeProps={rectangle}
              isSelected={rectangle.id === selectedId}
              onSelect={() => {
                setSelectedId(rectangle.id)
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[index] = newAttrs;
                setRectangles(rects);
              }}
            />
          )
        })}
      </Layer>
    </Stage>
  )
}
