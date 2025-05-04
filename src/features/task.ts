import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('task');

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: Node[] = loadCartFromStorage();

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
});

// export const {} = taskSlice.actions;
export default taskSlice.reducer;
