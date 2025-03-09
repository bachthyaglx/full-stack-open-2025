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

// Action Creator to Show Notification for a Set Time
export const setNotification = (message, timeInSeconds) => {
  return (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
