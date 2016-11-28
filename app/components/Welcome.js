/**
 * @file Welcome.js
 *
 * Stateless Functional Component to render a welcome screen prior to a room being selected
 */

import React, { Component } from 'react'

import Account from './Account'
import RoomListContainer from '../containers/RoomListContainer'
import AddRoom from './AddRoom'

/**
 * Render the JSX for the Component
   * @returns {string}
 */
export default () => (
  <div className="chat">
    <div className="chat__roomlist">
      <Account />
      <RoomListContainer />
      <AddRoom />
    </div>
    <div className="chat__welcome">
      <h1 className="text-center">Welcome!</h1>
      <div className="lead">Choose a room from the list on the left.</div>
    </div>
  </div>
)
