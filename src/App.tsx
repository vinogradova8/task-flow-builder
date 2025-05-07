import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
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
import { addTaskNode, editTaskNode, setTaskNodes } from './features/task';
import { addNewEdge, deleteEdge, setEdges } from './features/edge';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { EdgeType } from './types/EdgeType';
import './App.scss';
import { SideBar } from './components/SideBar/SideBar';
import { clearActiveTaskNode, setActiveTaskNode } from './features/ui';

export default function App() {
  const taskNodes = useAppSelector((state) => state.task);
  const edges = useAppSelector((state) => state.edge);
  const ui = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  const taskNodesWithActiveProperty = taskNodes.map((node: TaskNodeType) => ({
    ...node,
    data: {
      ...node.data,
      isActive: node.id === ui.activeTaskNode?.id,
    },
  }));

  const handleCloseSideBar = () => {
    dispatch(clearActiveTaskNode());
  };

  const handleOpenSideBar = (node: TaskNodeType) => {
    dispatch(setActiveTaskNode(node));
  };

  const handleAddTaskNode = () => {
    const newId =
      taskNodes.length > 0
        ? (
            Math.max(...taskNodes.map((item: TaskNodeType) => +item.id)) + 1
          ).toString()
        : '1';

    const newNode: TaskNodeType = {
      id: newId,
      type: 'task',
      position: { x: 0, y: 0 },
      data: { label: 'New Task', isActive: false },
    };

    dispatch(addTaskNode(newNode));
  };

  const handleSaveTaskNode = (newLabel: string) => {
    if (ui.activeTaskNode && newLabel !== ui.activeTaskNode.data.label) {
      dispatch(editTaskNode({ id: ui.activeTaskNode.id, label: newLabel }));
    }
    handleCloseSideBar();
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

    const storedEdges = localStorage.getItem('edge');
    const storedTasks = localStorage.getItem('task');

    if ((storedEdges && !JSON.parse(storedEdges).length)) {
      localStorage.removeItem('edge');
    }

    if (storedTasks && !JSON.parse(storedTasks).length) {
      localStorage.removeItem('task');
    }
  }, [edges, taskNodes]);

  useEffect(() => {
    const currentActiveTask = taskNodesWithActiveProperty.find(
      (node) => node.id === ui.activeTaskNode?.id
    );

    if (!currentActiveTask && ui.activeTaskNode) {
      dispatch(clearActiveTaskNode());
    }
  }, [dispatch, taskNodesWithActiveProperty, ui.activeTaskNode]);

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
    <div className='page' style={{ width: '100vw', height: '100vh' }}>
      <button className='add-button' onClick={handleAddTaskNode}>
        Add Task
      </button>
      <ReactFlow
        className={'position: relative'}
        nodes={taskNodesWithActiveProperty}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(_event, node) => handleOpenSideBar(node)}
        onEdgeDoubleClick={(_event, edge) => dispatch(deleteEdge(edge.id))}
        onPaneClick={() => handleCloseSideBar()}
      >
        {ui.activeTaskNode && !ui.isEditingTaskNode && (
          <SideBar onSave={handleSaveTaskNode}></SideBar>
        )}

        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
