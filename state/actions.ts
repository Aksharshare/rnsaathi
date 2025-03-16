import { createAction } from '@reduxjs/toolkit';
import { Activity } from './types';

// Define action types
const ADD_ACTIVITY = 'activities/addActivity';
const UPDATE_ACTIVITY = 'activities/updateActivity';
const DELETE_ACTIVITY = 'activities/deleteActivity';

// Create actions
const addActivity = createAction<Activity>(ADD_ACTIVITY);
const updateActivity = createAction<Activity>(UPDATE_ACTIVITY);
const deleteActivity = createAction<string>(DELETE_ACTIVITY);

// Export actions

export { addActivity, updateActivity, deleteActivity };