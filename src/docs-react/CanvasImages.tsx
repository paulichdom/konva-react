import React from 'react'
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

type URLImageProps = {
  src: string
}

const URLImage: React.FC<URLImageProps> = ({ src }) => {
  const [image] = useImage(src, 'anonymous');
  return <Image image={image} x={150} />
}

export const CanvasImages = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <URLImage src='https://konvajs.org/assets/yoda.jpg' />
      </Layer>
    </Stage>
  )
}
