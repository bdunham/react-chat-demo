/**
 * @file MessageList.js
 *
 * Component to display a list of Messages
 */

import React, { Component, PropTypes } from 'react'
import { Alert, Spinner, FormInput } from 'elemental'

import Message from './Message'

export default class MessageList extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    messages: PropTypes.array,
    loading: PropTypes.bool
  }
  
  /**
   * Intercept the componentDidMount callback and scroll the messagelist node 
   * down to the bottom so the most recent message is always in view
   */
  componentDidMount() {
    let node = this.refs.messagelist
    node.scrollTop = node.scrollHeight
  }
  
  /**
   * Intercept the componentWillUpdate callback and store a boolean to indicate
   * whether the user is currently at the bottom of the messagelist
   */
  componentWillUpdate() {
    let node = this.refs.messagelist
    this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight
  }
 
  /**
   * Intercept the componentDidUpdate callback and if the user was previously
   * at the end of the messagelist, scroll the viewport down so the new message
   * is brought into view
   */
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      let node = this.refs.messagelist
      node.scrollTop = node.scrollHeight
    }
  }

  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    const { messages, loading } = this.props
    
    let messageList = [];
    if (loading) {
      return (<div className="chat__messages" ref={"messagelist"}><div className="loading"><Spinner size="lg" /></div></div>)
    } else if (messages.length == 0) {
      return (<div className="chat__messages" ref={"messagelist"}><Alert type="info"><strong>Room Info:</strong> There are currently no messages in this room</Alert></div>)
    } else {
      return (
        <ul className="chat__messages" ref={"messagelist"}>
          {messages.map((message, id) => (<Message key={id} id={id} message={message} />))}
        </ul>
      )
    }
  }
}