import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { addAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  // Mutation for adding a new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote]);

      // Show success notification
      dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote "${newAnecdote.content}" added` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: (error) => {
      // Show error notification if anecdote is too short
      dispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();

    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
