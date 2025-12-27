import { useState } from 'react';
import { CanvasPortal } from './docs-react/CanvasPortal';
import { NodesAndExport } from './docs-react/NodesAndExport';
import { ComplexAnimations } from './docs-react/ComplexAnimations';
import { CustomShape } from './docs-react/CustomShape';
import { DOMPortal } from './docs-react/DOMPortal';

type ComponentKey =
  'canvas-portal' |
  'nodes-and-export' |
  'complex-animations' |
  'custom-shape' |
  'dom-portal';

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
  }

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


