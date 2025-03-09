import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );
    }
  }
});

// Thunk Action Creator to Fetch Anecdotes
export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get(baseUrl);
    dispatch(setAnecdotes(response.data));
  };
};

// Thunk Action Creator to Create a New Anecdote Asynchronously
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = { content, votes: 0 };
    const response = await axios.post(baseUrl, newAnecdote);
    dispatch(addAnecdote(response.data));
  };
};

// Thunk Action Creator to Vote for an Anecdote (Updates Backend)
export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    dispatch(updateAnecdote(response.data));
  };
};

// Export Actions
export const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
