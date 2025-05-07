import { memo, useEffect, useRef, useState } from 'react';
import { type NodeProps, Handle, Position } from '@xyflow/react';
import './TaskNode.scss';
import { type TaskNodeType } from '../../types/TaskNodeType';
import { useDispatch } from 'react-redux';
import { editTaskNode, deleteTaskNode } from '../../features/task';
import {
  clearActiveTaskNode,
  setActiveTaskNodeLabel,
  setIsEditingTaskNode,
} from '../../features/ui';
import { useAppSelector } from '../../store/hooks';

export const TaskNode = memo(function TaskNode({
  id,
  data,
  selected,
}: NodeProps<TaskNodeType>) {
  const [label, setLabel] = useState(data.label || '');
  const [edited, setEdited] = useState(false);

  const ui = useAppSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleDeleteTaskNode = (id: string) => {
    dispatch(deleteTaskNode(id));
  };

  const handleEditTaskNodes = (id: string, newLabel: string) => {
    if (newLabel !== data.label) {
      dispatch(editTaskNode({ id, label: newLabel }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditTaskNodes(id, label);
    dispatch(clearActiveTaskNode());
    setEdited(false);
    dispatch(setIsEditingTaskNode(false));
  };

  const item = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item.current) {
      item.current.focus();
      item.current.select();
    }
  }, [edited]);

  useEffect(() => {
    if (!ui.activeTaskNode) {
      setEdited(false);
      dispatch(setIsEditingTaskNode(false));
    }
	}, [dispatch, ui.activeTaskNode]);

	useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
				setEdited(false);
				dispatch(setIsEditingTaskNode(false));
				dispatch(clearActiveTaskNode());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
	
	const styleHandle = {
    width: 10,
    height: 10,
	};
	const styleInlineHandleOut = {
    ...styleHandle,
		top: 30,
  };

  return (
    <div
      className={`task-node ${selected ? 'task-node--selected' : ''}`}
      onDoubleClick={() => {
        setEdited(true);
        dispatch(setIsEditingTaskNode(true));
      }}
      onClick={() => {
        setEdited(false);
        dispatch(setIsEditingTaskNode(false));
      }}
    >
      {data.isActive && (
        <button
          className='task-node__delete'
          onClick={() => handleDeleteTaskNode(id)}
        >
          х
        </button>
      )}

      {edited && selected ? (
        <form action='#' onSubmit={handleSubmit}>
          <input
            ref={item}
            type='text'
            value={ui.activeTaskNode?.data.label}
            onChange={(e) => {
              setLabel(e.target.value);
              dispatch(setActiveTaskNodeLabel(e.target.value));
            }}
            className='task-node__input'
            onBlur={() => handleEditTaskNodes(id, label)}
            placeholder='enter your task'
          />
        </form>
      ) : (
        <p className='task-node__title'>{data.label}</p>
      )}
      <>
        <Handle style={styleHandle} type='target' position={Position.Top} />
        <Handle style={styleHandle} type='source' position={Position.Bottom} />

        <Handle
          style={styleHandle}
          type='target'
          position={Position.Left}
          id='left-in'
        />
        <Handle
          style={styleInlineHandleOut}
          type='source'
          position={Position.Left}
          id='left-out'
        />

        <Handle
          style={styleHandle}
          type='target'
          position={Position.Right}
          id='right-in'
        />
        <Handle
          style={styleInlineHandleOut}
          type='source'
          position={Position.Right}
          id='right-out'
        />
      </>
    </div>
  );
});
