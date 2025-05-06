import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/task';
import edgeReducer from './features/edge';
import uiReducer from './features/ui';

const store = configureStore({
  reducer: {
    task: taskReducer,
    edge: edgeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
