import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// Fetch all anecdotes
export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Add a new anecdote
export const addAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

// Update votes using PATCH
export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { votes: anecdote.votes + 1 };
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
  return response.data;
};
