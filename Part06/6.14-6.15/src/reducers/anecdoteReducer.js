import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// Fetch anecdotes from backend
export const fetchAnecdotes = createAsyncThunk('anecdotes/fetchAnecdotes', async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

// Create new anecdote in backend
export const createAnecdote = createAsyncThunk('anecdotes/createAnecdote', async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
});

// Vote for an anecdote in backend
export const voteAnecdote = createAsyncThunk('anecdotes/voteAnecdote', async (id, { getState }) => {
  const anecdote = getState().anecdotes.find(a => a.id === id);
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
});

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        return state.map(anecdote =>
          anecdote.id === action.payload.id ? action.payload : anecdote
        );
      });
  }
});

export default anecdoteSlice.reducer;
