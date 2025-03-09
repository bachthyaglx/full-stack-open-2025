## 1.6: unicafe step1
Like most companies, <ins>[Unicafe](https://unicafe.fi/#/9/4)</ins> collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

The application must display the total number of collected feedback for each category. Your final application could look like this:

![image](https://user-images.githubusercontent.com/62774638/117334908-38c0e500-aea3-11eb-81a1-65f7a81b8315.png)

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in material and previous exercise. File _index.js_ is as follows:
```ruby
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```
You can use the code below as a starting point for the App.js file:
```ruby
import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App
```
