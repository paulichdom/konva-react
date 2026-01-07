import { useState } from 'react';
import { CanvasPortal } from './konva/react/CanvasPortal';
import { NodesAndExport } from './konva/react/NodesAndExport';
import { ComplexAnimations } from './konva/react/ComplexAnimations';
import { CustomShape } from './konva/react/CustomShape';
import { DOMPortal } from './konva/react/DOMPortal';
import { DragAndDrop } from './konva/react/DragAndDrop';
import { DropImage } from './konva/react/DropImage';
import { CanvasShapeEvent } from './konva/react/CanvasShapeEvent';
import { CanvasFilters } from './konva/react/CanvasFilters';
import { FreeDrawing } from './konva/react/FreeDrawing';
import { CanvasImages } from './konva/react/CanvasImages';
import { CanvasShapes } from './konva/react/CanvasShapes';
import { SimpleAnimations } from './konva/react/SimpleAnimations';
import { KonvaTransformer } from './konva/react/KonvaTransformer';
import { CanvasUndoRedo } from './konva/react/CanvasUndoRedo';
import { NodeZIndex } from './konva/react/NodeZIndex';
import { ToggleComponent } from './xstate/quick-start/ToggleComponent';
import { JotaiXStateApp } from './xstate/jotai-xstate/JotaiXStateApp';
import { JotaiSandbox } from './jotai/JotaiSandbox';

type ComponentKey =
  'canvas-portal' |
  'nodes-and-export' |
  'complex-animations' |
  'custom-shape' |
  'dom-portal' |
  'drag-and-drop' |
  'drop-image' |
  'canvas-shape-event' |
  'canvas-filters' |
  'free-drawing' |
  'canvas-images' |
  'canvas-shapes' |
  'simple-animations' |
  'konva-transformer' |
  'canvas-undo-redo' |
  'node-z-index' |
  'xstate-toggle-machine' |
  'jotai-xstate-light' |
  'jotai-sandbox';

const components: Record<ComponentKey, { name: string; component: React.ComponentType }> = {
  'canvas-portal': {
    name: 'Canvas Portal',
    component: CanvasPortal
  },
  'nodes-and-export': {
    name: 'Nodes and Export',
    component: NodesAndExport
  },
  'complex-animations': {
    name: 'Complex Animations',
    component: ComplexAnimations
  },
  'custom-shape': {
    name: 'Custom Shape',
    component: CustomShape
  },
  'dom-portal': {
    name: 'DOM Portal',
    component: DOMPortal
  },
  'drag-and-drop': {
    name: 'Drag and drop',
    component: DragAndDrop
  },
  'drop-image': {
    name: 'Drop Image',
    component: DropImage
  },
  'canvas-shape-event': {
    name: 'Canvas shape event',
    component: CanvasShapeEvent
  },
  'canvas-filters': {
    name: 'Canvas Filters',
    component: CanvasFilters
  },
  'free-drawing': {
    name: 'Free drawing',
    component: FreeDrawing
  },
  'canvas-images': {
    name: 'Canvas Images',
    component: CanvasImages
  },
  'canvas-shapes': {
    name: 'Canvas Shapes',
    component: CanvasShapes
  },
  'simple-animations': {
    name: 'Simple Animations',
    component: SimpleAnimations
  },
  'konva-transformer': {
    name: 'Konva Transformer',
    component: KonvaTransformer
  },
  'canvas-undo-redo': {
    name: 'Canvas Undo / Redo',
    component: CanvasUndoRedo
  },
  'node-z-index': {
    name: 'Node Z Index',
    component: NodeZIndex
  },
  'xstate-toggle-machine': {
    name: 'xState - Toggle Machine',
    component: ToggleComponent
  },
  'jotai-xstate-light': {
    name: 'Jotai - xState: light',
    component: JotaiXStateApp
  },
  'jotai-sandbox': {
    name: 'Jotai Sandbox',
    component: JotaiSandbox
  },
};

export const App = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentKey>('nodes-and-export');

  const SelectedComponent = components[selectedComponent].component;

  return (
    <div>
      <div style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #ddd',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <label htmlFor="component-selector" style={{ fontWeight: 'bold' }}>
          Select Component:
        </label>
        <select
          id="component-selector"
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value as ComponentKey)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {Object.entries(components).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          padding: '1rem'
        }}>
        <SelectedComponent />
      </div>
    </div>
  )
}


