import React, { Component } from "react";

export default class MessageBox extends Component {
  render() {
    const hasMessages = !!this.props.children.length
    const messages = hasMessages
        ? this.props.children.map((message, i) => <p key={ i }>{ message }</p>)
        : [<p key="0">"You are alone"</p>];

    return (<div className="MessageBox">{ messages }</div>);
  }
}
