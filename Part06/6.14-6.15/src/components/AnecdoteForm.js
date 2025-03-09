import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    if (newAnecdote.trim() === '') return;
    
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`You added "${newAnecdote}"`, 5));
    
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
