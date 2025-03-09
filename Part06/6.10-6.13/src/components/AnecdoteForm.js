import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdoteWithNotification } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    if (newAnecdote.trim() === '') return;
    dispatch(createAnecdoteWithNotification(newAnecdote));
    setNewAnecdote('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            type="text"
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
            placeholder="Write an anecdote"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
