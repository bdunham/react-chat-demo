/**
 * @file Account.js
 *
 * Component to display an account nickname, also provides a Logout button
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Glyph, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'elemental'
import cookie from 'react-cookie'

import * as actionCreators from '../actions'

@connect(
  (state, props) => ({
    account: state.account
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
export default class Account extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    account: PropTypes.object
  }
  
  /**
   * Initialize the Account Component
   * @constructor
   * @param props - the props passed to the Component
   */
  constructor(props) {
    super(props)
    this.state = { modalIsOpen: false, newRoomName: '', newRoomRules: '' }
  }

  /**
   * Toggle the value of the modalIsOpen state variable to be true/false
   * @param e - Native brower event provided by onClick 
   */
  toggleModal = (e) => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }
  
  /**
   * Remove the cookies that store the account nickname and email. Issues the SET_ACCOUNT
   * action which removes the account from the application state.
   * @param e - Native brower event provided by onClick 
   */
  handleLogout = (e) => {
    const { actions } = this.props
    
    cookie.remove('chat__email', { path: '/' })
    cookie.remove('chat__nick', { path: '/' })
    actions.logout()
  }
  
  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    const { account } = this.props
    
    return (
      <div className="chat__account">
        <a href="#" onClick={this.toggleModal}><Glyph icon="log-out" /></a>
        <Glyph icon="person" /> <strong>{account.nick}</strong>
        <Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal} backdropClosesModal>
          <ModalHeader text="Please confirm" showCloseButton onClose={this.toggleModal} />
          <ModalBody>
            <p>Are you absolutely sure you want to log out?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleLogout}> Yes, I am sure</Button>
          	<Button type="link-cancel" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}