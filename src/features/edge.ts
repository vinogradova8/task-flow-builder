import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EdgeType } from '../types/EdgeType';

const defaultEdges: EdgeType[] = [];

const loadEdgesFromStorage = (): EdgeType[] => {
  try {
    const stored = localStorage.getItem('edge');
    return stored ? JSON.parse(stored) : defaultEdges;
  } catch {
    return defaultEdges;
  }
};

const initialState: EdgeType[] = loadEdgesFromStorage();

const edgeSlice = createSlice({
  name: 'edge',
  initialState,
  reducers: {
    addNewEdge(state: EdgeType[], action: PayloadAction<EdgeType>) {
      state.push(action.payload);
    },

    deleteEdge(state: EdgeType[], action: PayloadAction<string>) {
      return state.filter((edge) => edge.id !== action.payload);
    },

    setEdges(_state, action: PayloadAction<EdgeType[]>) {
      return action.payload;
    },
  },
});

export const { addNewEdge, deleteEdge, setEdges } = edgeSlice.actions;
export default edgeSlice.reducer;
