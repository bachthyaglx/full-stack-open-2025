/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map((todo, index) => (
        <React.Fragment key={todo.text + index}>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>{todo.text}</span>
            {todo.done ? (
              <>
                <span>This todo is done</span>
                <span>
                  <button onClick={onClickDelete(todo)}>Delete</button>
                </span>
              </>
            ) : (
              <>
                <span>This todo is not done</span>
                <span>
                  <button onClick={onClickDelete(todo)}>Delete</button>
                  <button onClick={onClickComplete(todo)}>Set as done</button>
                </span>
              </>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default TodoList
