import { memo, useState } from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import "./TaskNode.scss";

export type TaskData = {
  label: string;
};

export type TaskNode = Node<TaskData, 'label'>;

export const TaskNode = memo(function TaskNode({ data }: NodeProps<TaskNode>) {
  const [label, setLabel] = useState(data.label || '');

  return (
    <div className='task-node'>
      <p>{label}</p>
      <input
        type='text'
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className='task-node__input'
      />
    </div>
  );
});
