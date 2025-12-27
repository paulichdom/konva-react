import React from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image"
import Konva from "konva";

type DroppedImage = {
  x: number;
  y: number;
  src: string
}

const URLImage = ({ image }: { image: DroppedImage }) => {
  const [img] = useImage(image.src);

  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
    />
  )
}
export const DropImage = () => {
  const dragUrl = React.useRef<string | null>(null);
  const stageRef = React.useRef<Konva.Stage>(null);
  const [images, setImages] = React.useState<DroppedImage[]>([]);

  return (
    <div>
      <p>Try to drag and drop the images into the stage:</p>
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(event) => {
          dragUrl.current = event.currentTarget.src;
        }}
      />
      <div
        onDrop={(event) => {
          event.preventDefault();
          const stage = stageRef.current;
          if (!stage) return;

          // register event position
          stage.setPointersPositions(event);
          const pointerPosition = stage.getPointerPosition();
          if (!pointerPosition) return;

          // add image
          setImages(
            images.concat([
              {
                x: pointerPosition.x,
                y: pointerPosition.y,
                src: dragUrl.current ?? ''
              }
            ])
          )
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage key={Math.random()} image={image} />
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}
