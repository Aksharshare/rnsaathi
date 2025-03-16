import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './reducers';

export const store = configureStore({
  reducer: {
    activityReducer : activityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;