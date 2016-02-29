import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from './todo-list'
import AddTodo from './add-todo'
import {arrayMoveToEnd, arrayRemoveElement} from './utils'

const App = React.createClass({
  getInitialState() {
    return {todoList: []}
  },
  componentDidMount() {
    this._updateStateFromStore()
  },
  render() {
    return (
      <div>
        <h1>Repeat Todo</h1>
        <AddTodo
          onAdd={this._onAdd}
        />
        <TodoList
          todos={this.state.todoList}
          onComplete={this._onComplete}
          onDelete={this._onDelete}
        />
      </div>
    )
  },
  _onAdd(val) {
    const newList = [val, ...this.state.todoList]
    this._updateStoreAndState(newList)
  },
  _onComplete(currentIndex) {
    const newList = arrayMoveToEnd(this.state.todoList, currentIndex)
    this._updateStoreAndState(newList)
  },
  _onDelete(index) {
    const newList = arrayRemoveElement(this.state.todoList, index)
    this._updateStoreAndState(newList)
  },
  _updateStoreAndState(newList) {
    this._updateStore(newList)
    this._updateStateFromStore()
  },
  _updateStore(newList) {
    const newListJson = JSON.stringify(newList)
    this.props.store.setItem('todoList', newListJson)
  },
  _updateStateFromStore() {
    const todoListJson = this.props.store.getItem('todoList') || '[]'
    const todoList = JSON.parse(todoListJson)
    this.setState({todoList})
  }
})

ReactDOM.render(
  <App store={window.localStorage} />,
  document.getElementById('app'),
)

