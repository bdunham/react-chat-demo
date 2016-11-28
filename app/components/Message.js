/**
 * @file Message.js
 *
 * Component to display an individual message
 */

import React, { Component, PropTypes } from 'react'
import moment from 'moment'

export default class Message extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    message: PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  }
  
  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    const { message } = this.props
    
    // Use Momemnt.js to format the timestamp into a human friendly format (HH:MM PM/AM)
    let time = moment(message.timestamp).format('LT')

    return (
      <li className="message">
        <strong className="message__author">{message.author}</strong><span className="message__timestamp">{time}</span>
        <div className="message__text">{message.text}</div>
      </li>
    )
  }
}
