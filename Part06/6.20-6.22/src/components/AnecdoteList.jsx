import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, voteAnecdote } from '../services/anecdotes';

const AnecdoteList = () => {
  const queryClient = useQueryClient();

  // Fetch anecdotes using React Query
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  });

  // Mutation for voting
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      // Update the cache with new vote count
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) =>
        oldAnecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
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
