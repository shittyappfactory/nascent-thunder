import React, { Component } from "react";

export default class NameInput extends Component {
  setUsername(name) {
    this.setState({ username: name });
  }

  render() {
    return (
      <div>
        <label>Enter a username:</label>
        <input type="text" onChange={ (e) => this.setUsername(e.target.value) }/>
        <button onClick={
          (e) => {
            this.props.onButtonClicked(this.state.username);
            e.preventDefault();
          }
        }>Create User</button>
      </div>
    )
  }
}
