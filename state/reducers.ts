import { createReducer } from '@reduxjs/toolkit';
import { addActivity, updateActivity, deleteActivity } from './actions';
import { Activity } from './types';
  
  interface ActivityState {
    activities: Activity[];
  }
  
const initialState: ActivityState = {
activities: [],
};


// Create reducer
const activitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addActivity, (state, action) => {
      if (action.payload) {
        state.activities.push(action.payload);
      }
    })
    .addCase(updateActivity, (state, action) => {
      if (action.payload) {
        const index = state.activities.findIndex((activity: Activity) => action.payload && activity.id === (action.payload as Activity).id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      }
    })
    .addCase(deleteActivity, (state, action) => {
      state.activities = state.activities.filter(activity => activity.id !== action.payload);
    });
});
  
  export default activitiesReducer;