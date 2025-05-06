import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskNodeType } from '../types/TaskNodeType';

const defaultTasks: TaskNodeType[] = [
  {
    id: '1',
    type: 'task',
    position: { x: 0, y: 0 },
    data: { label: 'Task 1', isActive: false },
  },
  {
    id: '2',
    type: 'task',
    position: { x: 0, y: 100 },
    data: { label: 'Task 2', isActive: false },
  },
];

const loadTasksFromStorage = (): TaskNodeType[] => {
  try {
    const stored = localStorage.getItem('task');
    return stored ? JSON.parse(stored) : defaultTasks;
  } catch {
    return defaultTasks;
  }
};

const initialState: TaskNodeType[] = loadTasksFromStorage();

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskNode(state: TaskNodeType[], action: PayloadAction<TaskNodeType>) {
      state.push(action.payload);
    },

    editTaskNode(state, action: PayloadAction<{ id: string; label: string }>) {
      const node = state.find((item) => item.id === action.payload.id);
      if (node) {
        node.data.label = action.payload.label;
      }
    },

    deleteTaskNode(
      state: TaskNodeType[],
      action: PayloadAction<string>
    ) {
      return state.filter((item) => item.id !== action.payload);
    },

    setTaskNodes(
      _state: TaskNodeType[],
      action: PayloadAction<TaskNodeType[]>
    ) {
      return action.payload;
    },
  },
});

export const { addTaskNode, editTaskNode, deleteTaskNode, setTaskNodes } = taskSlice.actions;
export default taskSlice.reducer;
