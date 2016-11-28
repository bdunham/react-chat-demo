/**
 * @file RoomListContainer.js
 *
 * Container Component to fetch rooms from Firebase and render them as a RoomList
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers  } from 'redux-react-firebase'

import { testEmailMatchesRoomRules } from '../utilities'
import RoomList from '../components/RoomList'

const {isLoaded, isEmpty, dataToJS} = helpers

@firebase(
  (['/rooms#orderByChild=timestamp'])
)
@connect(
  (state, props) => ({
    rooms: dataToJS(state.firebase, `rooms`),
    account: state.account
  })
)
export default class RoomListContainer extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    rooms: PropTypes.object
  }
  
  /**
   * Render the RoomList component populated with Rooms from Firebase
   * @returns {string}
   */
  render() {
    const { rooms, current, account } = this.props
    
    let loading = false
    let roomsList = []
    
    if (!isLoaded(rooms)) {
      loading = true
    } else if (isEmpty(rooms)) {
      roomsList = []
    } else {
      roomsList = Object.keys(rooms)
                        .map(key => rooms[key])
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .filter(room => testEmailMatchesRoomRules(room.rules, account.email))
    }
    
    return (
      <RoomList current={current} loading={loading} rooms={roomsList} />
    )
  }
}