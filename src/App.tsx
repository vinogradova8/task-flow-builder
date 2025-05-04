import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  BackgroundVariant,
  Connection,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TaskNode, TaskData } from './components/TaskNode/TaskNode';

const initialNodes: Node<TaskData>[] = [
  {
    id: '1',
    type: 'task',
    position: { x: 0, y: 0 },
    data: { label: '1' },
  },
  {
    id: '2',
    type: 'task',
    position: { x: 0, y: 100 },
    data: { label: '2' },
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    type: 'default',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 25,
      height: 25,
    },
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<TaskData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 25,
              height: 25,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const nodeTypes = {
    task: TaskNode,
  };

  const addTask = () => {
    const newId = (Math.max(...nodes.map((n) => +n.id)) + 1).toString();
    const newNode: Node<TaskData> = {
      id: newId,
      type: 'task',
      position: { x: 0, y: 400 },
      data: { label: 'New Task' },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addTask}>Add Task</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
