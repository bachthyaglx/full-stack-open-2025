# Exercises 1.1.-1.2.
Exercises are submitted through GitHub and by marking completed exercises in the submission application.

You may submit all the exercises of this course into the same repository, or use multiple repositories. If you submit exercises of different parts into the same repository, please use a sensible naming scheme for the directories.

One very functional file structure for the submission repository is as follows:
```c
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
```
See <ins>[this!](https://studies.cs.helsinki.fi/stats/courses/fullstackopen)</ins>

For each part of the course there is a directory, which further branches into directories containing a series of exercises, like "unicafe" for part 1.

For each web application for a series of exercises, it is recommended to submit all files relating to that application, except for the directory node_modules.

The exercises are submitted <b>one part at a time</b>. When you have submitted the exercises for a part of the course you can no longer submit undone exercises for the same part.

Note that in this part, there are more exercises besides those found below. Do not submit your work until you have completed all of the exercises you want to submit for the part.

## 1.1: course information, step1
The application that we will start working on in this exercise will be further developed in a few of the following exercises. In this and other upcoming exercise sets in this course, it is enough to only submit the final state of the application. If desired, you may also create a commit for each exercise of the series, but this is entirely optional.

Use create-react-app to initialize a new application. Modify index.js to match the following
```ruby
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```
and App.js to match the following
```ruby
import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App
```
and remove extra files (App.css, App.test.js, logo.svg, setupTests.js, reportWebVitals.js)).

Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

Define the new components in file App.js.

The App component's body will approximately be as follows:
```ruby
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```
<b>WARNING</b> create-react-app automatically makes the project a git repository unless the application is created within an already existing repository. Most likely you <b>do not want</b> the project to become a repository, so run the command `rm -rf .git` in the root of the project.

## 1.2: course information, step2
Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. Instead it only renders three Part components of which each renders the name and number of exercises of one part.
```ruby
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```
Our application passes on information in quite a primitive way at the moment, since it is based on individual variables. This situation will improve soon.
