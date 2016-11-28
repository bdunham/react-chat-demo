/**
 * @file MessageListContainer.js
 *
 * Container Component to fetch messages from Firebase and render them as a MessageList
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers  } from 'redux-react-firebase'

import MessageList from '../components/MessageList'

const {isLoaded, isEmpty, dataToJS} = helpers

@firebase(
  props => ([
    `/messages/${props.room.name}#orderByChild=timestamp&endAt=0&limitToLast=50`
  ])
)
@connect(
  (state, props) => ({
    messages: dataToJS(state.firebase, `messages/${props.room.name}`)
  })
)
export default class MessageListContainer extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    messages: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  
  /**
   * Render the MessageList component populated with Messages from Firebase
   * @returns {string}
   */
  render() {
    const { messages } = this.props
    
    let loading = false
    let messageList = []
    
    if (!isLoaded(messages)) {
      loading = true
    } else if (isEmpty(messages)) {
      messageList = []
    } else {
      messageList = Object.keys(messages)
                          .map(key => messages[key])
                          .sort((a, b) => a.timestamp - b.timestamp)
    }
    
    return (
      <MessageList messages={messageList} loading={loading} />
    )
  }
}