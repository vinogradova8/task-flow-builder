import { memo, useEffect, useRef, useState } from 'react';
import { type NodeProps, Handle, Position } from '@xyflow/react';
import './TaskNode.scss';
import { type TaskNodeType } from '../../types/TaskNodeType';
import { useDispatch } from 'react-redux';
import { editTaskNode, deleteTaskNode } from '../../features/task';

export const TaskNode = memo(function TaskNode({
  id,
  data,
  selected,
}: NodeProps<TaskNodeType>) {
  const [label, setLabel] = useState(data.label || '');
  const [edited, setEdited] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteTaskNode = (id: string) => dispatch(deleteTaskNode({ id }));

  const handleEditTaskNodes = (id: string, newLabel: string) => {
    if (newLabel !== data.label) {
      dispatch(editTaskNode({ id, label: newLabel }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditTaskNodes(id, label);
    setEdited(false);
  };

  const item = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item.current) {
      item.current.focus();
      item.current.select();
    }
  }, [edited]);

  return (
    <div
      className={`task-node ${selected ? 'task-node--selected' : ''}`}
      onDoubleClick={() => {
        setEdited(!edited);
      }}
    >
      <button onClick={() => handleDeleteTaskNode(id)}>х</button>
      {edited && selected ? (
        <form action='' onSubmit={handleSubmit}>
          <input
            ref={item}
            type='text'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className='task-node__input'
            onBlur={() => handleEditTaskNodes(id, label)}
          />
        </form>
      ) : (
        <p>{label}</p>
      )}
      <>
        <Handle type='target' position={Position.Top} />
        <Handle type='source' position={Position.Bottom} />
      </>
    </div>
  );
});
