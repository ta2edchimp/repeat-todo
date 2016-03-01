import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'an-uuid';
import TodoList from './todo-list'
import AddTodo from './add-todo'
import {arrayMoveToEnd, arrayRemoveElement} from './utils'
import Store from './store';
import migrations from './migrations';

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
    const newItem = {id: uuid(), value: val};
    const newList = [newItem, ...this.state.todoList];
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
    this.props.store.set(newList);
  },
  _updateStateFromStore() {
    const todoList = this.props.store.get() || [];
    this.setState({todoList})
  }
});

ReactDOM.render(
  <App store={new Store('todoList', migrations)} />,
  document.getElementById('app')
)

