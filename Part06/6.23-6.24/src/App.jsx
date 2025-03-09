import { useEffect, useReducer } from 'react';
import { getAnecdotes, voteAnecdote } from './services/anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.payload; // Set initial anecdotes

    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );

    default:
      return state;
  }
};

const App = () => {
  const [anecdotes, dispatch] = useReducer(anecdoteReducer, []);

  // Fetch anecdotes when the component mounts
  useEffect(() => {
    getAnecdotes().then(data => {
      dispatch({ type: 'INIT_ANECDOTES', payload: data });
    });
  }, []);

  const handleVote = async (anecdote) => {
    const updatedAnecdote = await voteAnecdote(anecdote);
    dispatch({ type: 'VOTE', payload: updatedAnecdote });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm dispatch={dispatch} />

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
