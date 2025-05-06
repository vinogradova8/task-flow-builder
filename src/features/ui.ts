import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskNodeType } from '../types/TaskNodeType';

type uiType = {
  activeTaskNode: TaskNodeType | null;
};

const initialState: uiType = {
  activeTaskNode: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTaskNode(state, action: PayloadAction<TaskNodeType>) {
      state.activeTaskNode = action.payload;
    },

    clearActiveTaskNode(state) {
      state.activeTaskNode = null;
    },
  },
});

export const { setActiveTaskNode, clearActiveTaskNode } = uiSlice.actions;
export default uiSlice.reducer;
