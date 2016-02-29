import React from 'react'
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom'

const ITEM_HEIGHT = 80;//TODO: find a way without hardcoded height

export default TodoList

function TodoList({todos, onComplete, onDelete}) {
  return (
    <ol className="todo-list">
      {todos.map(
        (todo, index) => {
          return <Motion
            key={todo}
            style={{top: spring(index*ITEM_HEIGHT)}}>
              {val =>
                <Todo
                  style={{...val}}
                  todo={todo}
                  onComplete={() => onComplete(index)}
                  onDelete={() => onDelete(index)}
                  />
          }</Motion>
        })
      }
    </ol>
  )
}

function Todo({
  style,
  todo,
  onComplete,
  onDelete,
}) {
  return (
    <li style={style} className="todo-item">
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
