/**
 * @file AddRoom.js
 *
 * Component to provide a button which reveals a Dialog where new Room information 
 * can be added.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers  } from 'redux-react-firebase'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormField, FormInput, Glyph } from 'elemental'

import { testEmailMatchesRoomRules } from '../utilities'

@firebase()
@connect(
  (state, props) => ({
    account: state.account
  })
)
export default class AddRoom extends Component {
  
  // Enforce PropTypes
  static propTypes = {
    newRoomName: PropTypes.string,
    handleNewNameChange: PropTypes.function,
    newRoomRules: PropTypes.string,
    handleNewRulesChange: PropTypes.function,
    handleCreateRoom: PropTypes.function,
    modalIsOpen: PropTypes.boolean,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  
  /**
   * Initialize the AddRoom Component
   * @constructor
   * @param props - the props passed to the Component
   */
  constructor(props) {
    super(props)
    this.state = { newRoomName: '', newRoomRules: '', modalIsOpen: false }
  }
  
  /**
   * Handle the onChange event isued by an input field and store the value in the state
   * @param e - Native brower event provided by onChange 
   */
  handleNewNameChange = (e) => {
    this.setState({ newRoomName: e.target.value })
  }
  
  /**
   * Handle the onChange event isued by a textarea field and store the value in the state
   * @param e - Native brower event provided by onChange 
   */
  handleNewRulesChange = (e) => {
    this.setState({ newRoomRules: e.target.value })
  }
  
  /**
   * Toggle the value of the modalIsOpen state variable to be true/false
   * @param e - Native brower event provided by onClick 
   */
  toggleModal = (e) => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }

  /**
   * Handle the onSubmit event isued by a form element and use the values
   * stored in the Component state to create a new Room in Firebase
   * @param e - Native brower event provided by onChange 
   */
  handleCreateRoom = (e) => {
    const { account, firebase } = this.props
    let errors = []
    
    e.preventDefault()
    
    // Validate that a Room name consists only of letters, numbers and hyphens (so that it is valid in the URL)
    if (/^[\w-]+$/.test(this.state.newRoomName) != true) {
      errors.push("Room name may consist of letters, numbers and hyphens only")
    }
    
    // Validate that the Room rules would not exclude the currently active user
    if (testEmailMatchesRoomRules(this.state.newRoomRules, account.email) != true) {
      errors.push("The rule(s) you have specified would not allow you to see this room!")
    }
    
    // If all rules pass (no errors) then create a new Room record in Firebase
    if (errors.length == 0) {
      const { firebase, params } = this.props

        firebase.set(`rooms/${this.state.newRoomName}`, {
          name: this.state.newRoomName,
          rules: this.state.newRoomRules,
          timestamp: Date.now()
        }, (err) => {
          if (!err) {
            this.setState({ newRoomName: '', newRoomRules: '', modalIsOpen: false })
          }
        }).catch(function() {
          alert("A room with this name already exists")
        });
    } else {
      alert(errors.join("\n"))
    }
  }
  
  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    return (
      <div>
        <Button onClick={this.toggleModal}><Glyph icon="plus" /> Add a room...</Button>
        <Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal} backdropClosesModal>
          <Form onSubmit={this.handleCreateRoom}>
            <ModalHeader text="Room Details" showCloseButton onClose={this.toggleModal} />
              <ModalBody>
                <FormField label="Room name" htmlFor="room-form-name">
                  <FormInput autoFocus type="text" onChange={this.handleNewNameChange} value={this.newRoomName} placeholder="e.g. general, random, bobs-stuff" name="room-form-name" />
                  <div className="form-info"><Glyph icon="info" /> Room names can only contain letters, numbers and hyphens. No spaces!</div>
                </FormField>
                <FormField label="Access Rules (one per line)" htmlFor="room-form-access-rules">
                  <FormInput onChange={this.handleNewRulesChange} value={this.newRoomRules} placeholder="e.g. ben@example.com, *@example.com" name="room-form-access-rules" multiline />
                  <div className="form-info"><Glyph icon="info" /> Entering no rules will make the room accessible to everyone</div>
                </FormField>
              </ModalBody>
              <ModalFooter>
                <Button submit>Create Room</Button>
              <Button type="link-cancel" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}