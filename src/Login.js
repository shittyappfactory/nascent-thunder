import React, { Component } from "react";
import { connect } from "react-redux";
import constants from "./constants";
import NameInput from "./NameInput";

export default class Login extends Component {
  render() {
    const { state, dispatch } = this.props;

    return (<div className="Login">
        <form>
          <NameInput onButtonClicked={ username => {
            dispatch({
              type: "INIT_SELF",
              username
            }) }
          } />
        </form>
    </div>);
  }
}

export default connect(
  state => (state)
)(Login)
