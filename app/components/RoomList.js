/**
 * @file RoomList.js
 *
 * Component to display a list of Rooms
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { firebase  } from 'redux-react-firebase'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormField, FormInput, Spinner, Glyph } from 'elemental'

import { testEmailMatchesRoomRules } from '../utilities'

@firebase()
@connect(
  (state, props) => ({
    account: state.account
  })
)
export default class RoomList extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    rooms: PropTypes.array
  }

  /**
   * Render the JSX for an individual Room list item (currently selected items are not clickable)
   */
  renderRoomItem(id, room, isCurrent) {
    let lockSymbol = room.rules.trim() != '' ? (<Glyph icon="lock" />) : ''
    
    if (isCurrent) {
      return (<li key={id} className="roomlist__room roomlist__room--current"><span>#{room.name} &nbsp;{lockSymbol}</span></li>)
    } else {
      return (<li key={id} className="roomlist__room"><Link to={`/room/${room.name}`}>#{room.name} &nbsp;{lockSymbol}</Link></li>)
    }                                                       
  }

  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    const { rooms, current, loading } = this.props
    
    let roomsList = [];
    if (loading) {
      roomsList = (<p>Loading room list...</p>)
    } else if (rooms.length == 0) {
      roomsList = (<i>There are no Rooms</i>)
    } else {
      roomsList = rooms.map((room, id) => this.renderRoomItem(id, room, room.name == current) )
    }
    
    return (
      <ul className="roomlist">
        {roomsList}
      </ul>
    )
  }
}