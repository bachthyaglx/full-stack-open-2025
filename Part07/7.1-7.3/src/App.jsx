/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

const Menu = () => {
  const padding = { paddingRight: 5 }

  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

// New component to display a single anecdote
const SingleAnecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))

  if (!anecdote) return <p>Anecdote not found.</p>

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has: {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info} target="_blank" rel="noopener noreferrer">{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an incident...
    </em>
    <p>Software engineering is full of excellent anecdotes...</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See <a href="https://github.com/fullstack-hy2020/routed-anecdotes">https://github.com/fullstack-hy2020/routed-anecdotes</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate() // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ content, author, info, votes: 0 })
  
    // Show success message
    setNotification(`A new anecdote "${content}" has been created!`)
  
    // Clear notification after 5 seconds
    setTimeout(() => setNotification(''), 5000)
  
    // Redirect to the homepage
    navigate('/')
  }
  

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          Author <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          URL for more info <input value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { content: `If it hurts, do it more often by author by Jez Humble`, info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0, id: 1 },
    { content: 'Premature optimization is the root of all evil by Donald Knuth', info: 'http://wiki.c2.com/?PrematureOptimization', votes: 0, id: 2 }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<SingleAnecdote anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
