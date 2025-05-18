/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable linebreak-style */

const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Serve static files from the React app
app.use(express.static('dist'))

// Fallback to index.html for React Router routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
