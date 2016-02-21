import React, { Component } from "react";

export default class MessageBox extends Component {
  render() {
    const hasMessages = !!this.props.children.length
    const messages = hasMessages
        ? this.props.children.map((message, i) => {
            const messageData = message.split("$");
            const color = { color: messageData[0] };
            return <p key={ i } style={ color }>{ messageData[1] }</p> })
        : [<p key="0">"You are alone"</p>];

    return (<div className="MessageBox">{ messages }</div>);
  }
}
