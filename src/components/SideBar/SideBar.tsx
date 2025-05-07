import { useEffect, useRef, useState } from 'react';
import './SideBar.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearActiveTaskNode } from '../../features/ui';

type Props = {
  onSave: (label: string) => void;
};

export const SideBar = ({ onSave }: Props) => {
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [label, setLabel] = useState(ui.activeTaskNode?.data.label || '');

  const item = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(label);
    dispatch(clearActiveTaskNode());
  };

  useEffect(() => {
    if (item.current) {
      item.current.focus();
      item.current.select();
    }
  }, [ui.activeTaskNode]);

  useEffect(() => {
    if (ui.activeTaskNode) setLabel(ui.activeTaskNode.data.label);
  }, [ui.activeTaskNode]);

  return (
    <div className='sidebar'>
      <h3>Editing</h3>
      <form action='#' onSubmit={handleSubmit}>
        <input
          ref={item}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className='sidebar__input'
          placeholder='enter your task'
        />
      </form>

      <div className='sidebar__actions'>
        <button onClick={() => onSave(label)} className='sidebar__button'>
          Save
        </button>
        <button
          onClick={() => dispatch(clearActiveTaskNode())}
          className='sidebar__button'
        >
          Close
        </button>
      </div>
    </div>
  );
};
