import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func,
  },
  render() {
    return (
      <div style={{display: 'flex'}}>
        <input
          type="text"
          ref="input"
          style={{flex: 1}}
        />
        <button onClick={this._onAddClick}>
          Add
        </button>
      </div>
    )
  },
  _onAddClick() {
    const input = this.refs.input
    if (input.value) {
      this.props.onAdd(input.value)
      input.value = ''
    }
  },
})

