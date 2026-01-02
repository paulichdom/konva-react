import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Circle } from 'react-konva';

const generateItems = () => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: 'node-' + i,
      color: Konva.Util.getRandomColor(),
    });
  }
  return items;
}

export const NodeZIndex = () => {
  const [items, setItems] = React.useState(generateItems());

  const handleDragStart = (event: Konva.KonvaEventObject<DragEvent>) => {
    const id = event.target.name();
    const itemsCopy = items.slice();
    const item = itemsCopy.find((i) => i.id === id);

    if (!item) return;

    const index = itemsCopy.indexOf(item);
    // remove from the list:
    itemsCopy.splice(index, 1);
    // add to the top
    itemsCopy.push(item);

    setItems(itemsCopy);
  };
  const onDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    const id = event.target.name();
    const itemsCopy = items.slice();
    const item = items.find((i) => i.id === id);

    if (!item) return;

    const index = items.indexOf(item);
    // update item position
    itemsCopy[index] = {
      ...item,
      x: event.target.x(),
      y: event.target.y(),
    };

    setItems(itemsCopy);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {items.map((item) => (
          <Circle
            key={item.id}
            name={item.id}
            draggable
            x={item.x}
            y={item.y}
            fill={item.color}
            radius={50}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  )
}
