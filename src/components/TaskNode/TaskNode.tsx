import { memo, useEffect, useRef, useState } from 'react';
import { type NodeProps, type Node, Handle, Position } from '@xyflow/react';
import './TaskNode.scss';

export type TaskData = {
  label: string;
};

export type TaskNode = Node<TaskData, 'label'>;

export const TaskNode = memo(function TaskNode({
  data,
  selected,
}: NodeProps<TaskNode>) {
  const [label, setLabel] = useState(data.label || '');
  const [edited, setEdited] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      {edited && selected ? (
        <form action='' onSubmit={handleSubmit}>
          <input
            ref={item}
            type='text'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className='task-node__input'
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
