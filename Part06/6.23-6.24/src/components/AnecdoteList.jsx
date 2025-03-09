import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { getAnecdotes, voteAnecdote } from '../services/anecdotes';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  // Fetch anecdotes
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  });

  // Mutation for voting
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      // Update React Query cache
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) =>
        oldAnecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );

      // Show notification
      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted "${updatedAnecdote.content}"` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: () => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Error: Vote failed!' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  // Show loading state
  if (isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  // Show error message if request fails
  if (isError) {
    return <div>Anecdote service not available due to problems in the server.</div>;
  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes) // Sort by votes (descending)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
