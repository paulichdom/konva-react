import React from 'react'
import Konva from 'konva';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';

export const CanvasFilters = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png', 'anonymous');
  const imageRef = React.useRef<Konva.Image | null>(null);

  const [color, setColor] = React.useState('green');
  const rectRef = React.useRef<Konva.Rect | null>(null);

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [image]);

  React.useEffect(() => {
    if (rectRef.current) {
      rectRef.current?.cache();
    }
  }, []);

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
    // recache shape when we updated it
    rectRef.current?.cache();
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          ref={imageRef}
          x={10}
          y={10}
          image={image}
          filters={[Konva.Filters.Blur]}
          blurRadius={10}
        />
        <Rect
          filters={[Konva.Filters.Noise]}
          noise={1}
          x={200}
          y={10}
          width={50}
          height={50}
          fill={color}
          shadowBlur={10}
          ref={rectRef}
          onClick={handleClick}
        />
      </Layer>
    </Stage>
  )
}
