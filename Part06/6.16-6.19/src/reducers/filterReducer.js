import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload;
    }
  }
});

// Export the action creator
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
