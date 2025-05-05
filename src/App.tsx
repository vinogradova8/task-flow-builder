import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TaskNode } from './components/TaskNode/TaskNode';
import { TaskNodeType } from './types/TaskNodeType';
import { addTaskNode, setTaskNodes } from './features/task';
import { addNewEdge, setEdges } from './features/edge';
import { useAppDispatch, useAppSelector } from './hooks';
import { EdgeType } from './types/EdgeType';
import "./App.scss";

export default function App() {
  const taskNodes = useAppSelector((state) => state.task);
  const edges = useAppSelector((state) => state.edge);

  const dispatch = useAppDispatch();

  const handleAddTaskNode = () => {
    const newId = taskNodes.length > 0 ? (
      Math.max(...taskNodes.map((item) => +item.id)) + 1
		).toString() : "1";
		
    const newNode: TaskNodeType = {
      id: newId,
      type: 'task',
      position: { x: 0, y: 400 },
      data: { label: 'New Task' },
    };

    dispatch(addTaskNode(newNode));
  };

  const handleAddEdge = useCallback(
    (edge: EdgeType) => {
      dispatch(addNewEdge(edge));
    },
    [dispatch]
  );

  const handleSetEdges = (edges: EdgeType[]) => {
    dispatch(setEdges(edges));
  };

  const onEdgesChange = (changes: EdgeChange<EdgeType>[]) => {
    const updated = applyEdgeChanges(changes, edges);
    handleSetEdges(updated);
  };

  const onNodesChange = (changes: NodeChange<TaskNodeType>[]) => {
    const updated = applyNodeChanges(changes, taskNodes);
    dispatch(setTaskNodes(updated));
  };

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskNodes));
    localStorage.setItem('edge', JSON.stringify(edges));
  }, [edges, taskNodes]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: EdgeType = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 25,
          height: 25,
        },
      };

      handleAddEdge(newEdge);
    },
    [handleAddEdge]
  );

  const nodeTypes = {
    task: TaskNode,
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button className='add-button' onClick={handleAddTaskNode}>
        Add Task
      </button>
      <ReactFlow
        nodes={taskNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <aside className='side-bar'></aside>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
