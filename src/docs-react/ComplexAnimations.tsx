import React from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import { useSpring } from '@react-spring/web';

export const ComplexAnimations = () => {
  const [flag, setFlag] = React.useState(false);
  const rectRef = React.useRef<any>(null);
  
  const springProps = useSpring({
    x: flag ? 150 : 50,
    y: 50,
    shadowBlur: flag ? 25 : 5,
    fill: flag ? 'seagreen' : 'hotpink',
    width: flag ? 300 : 50,
    height: flag ? 300 : 50,
    onChange: () => {
      if (rectRef.current) {
        rectRef.current.x(springProps.x.get());
        rectRef.current.y(springProps.y.get());
        rectRef.current.width(springProps.width.get());
        rectRef.current.height(springProps.height.get());
        rectRef.current.fill(springProps.fill.get());
        rectRef.current.shadowBlur(springProps.shadowBlur.get());
        rectRef.current.getLayer()?.batchDraw();
      }
    }
  });

  const handleClick = () => {
    setFlag(prev => !prev)
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try clicking the rectangle" />
        <Rect 
          ref={rectRef}
          x={50}
          y={50}
          width={50}
          height={50}
          fill="hotpink"
          shadowBlur={5}
          onClick={handleClick} 
        />
      </Layer>
    </Stage>
  )
}

