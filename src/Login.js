import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import constants from "./constants";
import NameInput from "./NameInput";

export default class Login extends Component {
  render() {
    const { state, dispatch } = this.props;

    return (<div className="Login">
      <h1>Nascent Thunder <i className="fa fa-bolt" /></h1>
        <form>
          <NameInput onButtonClicked={ username => {
            dispatch({
              type: "INIT_SELF",
              username
            })
            browserHistory.push("world")}
          } />
        </form>
    </div>);
  }
}

export default connect(
  state => (state)
)(Login)
