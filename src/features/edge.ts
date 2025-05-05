import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerType } from '@xyflow/react';
import { EdgeType } from '../types/EdgeType';

const defaultEdges: EdgeType[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    type: 'default',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 25,
      height: 25,
    },
  },
];

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

    setEdges(_state, action: PayloadAction<EdgeType[]>) {
      return action.payload;
    },
  },
});

export const { addNewEdge, setEdges } = edgeSlice.actions;
export default edgeSlice.reducer;
