import React, { Component } from "react";

export default class NameInput extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  setUsername(name) {
    this.setState({ username: name });
  }

  render() {
    return (
      <div className="NameInput">
        <label>Enter a username:</label>
        <div className="input-group">
          <input type="text" className="form-control" onChange={ (e) => this.setUsername(e.target.value) }/>
          <span className="input-group-btn">
          <button className="btn btn-default" disabled={!this.state.username} onClick={
            (e) => {
              if (!this.state.username) return;
              this.props.onButtonClicked(this.state.username);
              e.preventDefault();
            }
          }>Create User <i className="fa fa-angle-double-right" /></button>
          </span>
        </div>
      </div>
    )
  }
}
