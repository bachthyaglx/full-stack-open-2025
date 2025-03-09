/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = { paddingRight: 5 }

  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
      <Link to="/users" style={padding}>login</Link>
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
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0
    })

    setNotification(`A new anecdote "${content.inputProps.value}" has been created!`)
    setTimeout(() => setNotification(''), 5000)

    content.reset()
    author.reset()
    info.reset()

    navigate('/')
  }

  // Function to reset all fields
  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content <input {...content.inputProps} />
        </div>
        <div>
          Author <input {...author.inputProps} />
        </div>
        <div>
          URL for more info <input {...info.inputProps} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </form>
    </div>
  )
}

const Users = ({ anecdotes, notification }) => (
  ...
)

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
          <Route path="/users" element={<Users  .../>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
