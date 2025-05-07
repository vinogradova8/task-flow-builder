import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskNodeType } from '../types/TaskNodeType';

type uiType = {
  activeTaskNode: TaskNodeType | null;
  isEditingTaskNode: boolean;
};

const initialState: uiType = {
  activeTaskNode: null,
  isEditingTaskNode: false,
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

    setActiveTaskNodeLabel(state, action: PayloadAction<string>) {
      if (state.activeTaskNode)
        state.activeTaskNode.data.label = action.payload;
    },

    setIsEditingTaskNode(state, action: PayloadAction<boolean>) {
      state.isEditingTaskNode = action.payload;
    },
  },
});

export const {
  setActiveTaskNode,
  clearActiveTaskNode,
  setActiveTaskNodeLabel,
  setIsEditingTaskNode,
} = uiSlice.actions;
export default uiSlice.reducer;
