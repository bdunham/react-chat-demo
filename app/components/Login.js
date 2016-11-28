/**
 * @file Login.js
 *
 * Component to display a Login form and handle the storing of entered account
 * credentials in cookies and application state.
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormField, FormInput, Button } from 'elemental'
import cookie from 'react-cookie'

import * as actionCreators from '../actions'

@connect(
  null,
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
export default class Login extends Component {
  
  /**
   * Initialize the Login Component
   * @constructor
   * @param props - the props passed to the Component
   */
  constructor(props) {
    super(props)
    this.state = { email: '', nick: '' }
  }
  
  /**
   * Handle the onChange event isued by the email address input field and store 
   * the value in the email state variable
   * @param e - Native brower event provided by onChange 
   */
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }
  
  /**
   * Handle the onChange event isued by the nickname address input field and store 
   * the value in the nick state variable
   * @param e - Native brower event provided by onChange 
   */
  handleNickChange = (e) => {
    this.setState({ nick: e.target.value })
  }
  
  /**
   * Handle the onSubmit event isued by a form element and use the values
   * stored in the Component state to set the account app state variable
   * and cookie values to persist the account details across page loads
   * @param e - Native brower event provided by onChange 
   */
  handleSubmit = (e) => {
    let errors = []
    
    e.preventDefault()
    
    /**
     * Validate the an email address consists of any character before and after 
     * an @ symbol - deliberately vague
    */
    if (/.+\@.+/.test(this.state.email) != true) {
      errors.push("Please enter a valid email address")
    }
    
    // Validate that a nickname has been added
    if (this.state.nick.length == 0) {
      errors.push("Enter your nickname")
    }
    
    /*
    * If all validation rules pass (no errors) then store the account details 
    * in the app state. Also store details in cookie for page reload persistance
    */
    if (errors.length == 0) {
      const { actions } = this.props
      
      cookie.save('chat__email', this.state.email, { path: '/' })
      cookie.save('chat__nick', this.state.nick, { path: '/' })
      actions.setAccount({
        email: this.state.email,
        nick: this.state.nick
      })
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
      <div className="chat__login">
        <h2>Hello!</h2>
        <Form onSubmit={this.handleSubmit}>
        	<FormField label="Choose a name that you will be known by" htmlFor="form-input-password">
        		<FormInput autoFocus type="text" placeholder="Type chosen nickname..." onChange={this.handleNickChange} name="form-input-nickname" />
        	</FormField>
        	<FormField label="Please enter your email address" htmlFor="form-input-email">
        		<FormInput  type="email" placeholder="Type email address..." onChange={this.handleEmailChange} name="form-input-email" />
        	</FormField>
        	<Button submit>Login</Button>
        </Form>
      </div>
    )
  }
}