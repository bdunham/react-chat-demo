/**
 * @file Room.js
 *
 * Component to display a Room (room name, the message list and the reply interface)
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers  } from 'redux-react-firebase'
import { Alert, Spinner, FormInput } from 'elemental'

import { testEmailMatchesRoomRules } from '../utilities'
import Account from './Account'
import RoomListContainer from '../containers/RoomListContainer'
import AddRoom from './AddRoom'
import MessageListContainer from '../containers/MessageListContainer'

const {isLoaded, isEmpty, dataToJS} = helpers

@firebase()
@connect(
  (state, props) => ({
    room: dataToJS(state.firebase, `rooms/${props.params.id}`),
    account: state.account
  })
)
export default class Room extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    room: PropTypes.object
  }
  
  /**
   * Handle the onKeyUp event isued by the messageText input field. Look for
   * Enter key to be pressed, then generate a new Message in Firebase recording
   * the message text, author and timestamp
   * TODO: Currrently uses the browsers local time - Firebase has a mechanism to provide
   * server time, but the redux-react-firebase plugin does not expose this except
   * via a Thunk middleware.
   * @param e - Native brower event provided by onChange 
   */
  handleReply = (e) => {
    if (e.key == 'Enter' && e.target.value.trim().length > 0) {
      const {firebase, room, account} = this.props
      
      firebase.push(`messages/${room.name}`, {
        text: e.target.value,
        author: account.nick,
        timestamp: Date.now()
      }).catch(function() {
        alert("An error prevented your message from being sent")
      })
      
      e.target.value = ''
    }
  }
  
  /**
   * Intercept the componentDidUpdate callback and place focus into the messageText
   * for rapid fire message sending
   */
  componentDidUpdate() {
    const { messageText } = this.refs
    messageText.focus()
  }
  
  /**
   * Render the JSX for the Component. If the room does not exist or the room is 
   * forbidden to the currently logged in account, show a Spinner
   * @returns {string}
   */
  render() {
    const { room, account } = this.props
    
    let roomElement = ''
    
    // Ensure the same visible result if no room found, or room actively blocked to this user
    if (!isLoaded(room) || !testEmailMatchesRoomRules(room.rules, account.email)) {
      roomElement = (
        <div className="chat__room">
          <div className="loading"><Spinner size="lg" /></div>
        </div>
      )
    } else {
      roomElement = (
        <div className="chat__room">
          <h2>#{room.name}</h2>
          <MessageListContainer room={room} />
          <div className="chat__reply">
            <FormInput autoFocus type="text" placeholder="Type your message..." name="messageText" onKeyPress={this.handleReply} ref="messageText" />
          </div>
        </div>
      )
    }
    
    return (
      <div className="chat">
        <div className="chat__roomlist">
          <Account />
          <RoomListContainer current={this.props.params.id} />
          <AddRoom />
        </div>
        {roomElement}
      </div>
    )
  } 
}