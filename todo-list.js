import React from 'react'
import ReactDOM from 'react-dom'

export default TodoList

function TodoList({todos, onComplete, onDelete}) {
  return (
    <ol>
      {todos.map(
        (todo, index) => {
          return <Todo
            key={index}
            todo={todo}
            onComplete={() => onComplete(index)}
            onDelete={() => onDelete(index)}
          />
        })
      }
    </ol>
  )
}

function Todo({
  todo,
  onComplete,
  onDelete,
}) {
  return (
    <li>
      <strong>{todo}</strong>
      <br />
      <button
        className="success"
        onClick={onComplete}
      >
        Complete
      </button>
      <button
        className="danger"
        onClick={verifyAndDelete}
      >
        Delete
      </button>
    </li>
  )

  function verifyAndDelete() {
    const result = window.confirm(`Are you sure you want to delete "${todo}"?`)
    if (result) {
      onDelete()
    }
  }
}
