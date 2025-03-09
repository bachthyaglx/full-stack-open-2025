import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    }
  }
});

// Improved Thunk Action Creator for Notifications
export const setNotification = (message, timeInSeconds) => {
  return (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    
    // Clear any existing timeout before setting a new one
    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout);
    }
    
    window.notificationTimeout = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
