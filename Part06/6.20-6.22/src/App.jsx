import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './services/anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  // Fetch anecdotes using React Query
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1 // Only retry once on failure
  });

  const handleVote = (anecdote) => {
    console.log('vote');
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
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote => (
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

export default App;
