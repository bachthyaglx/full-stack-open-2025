import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  // Use Mutation to Add a New Anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      // Update the cache immediately after a successful mutation
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote]);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();

    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long.');
      return;
    }

    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
