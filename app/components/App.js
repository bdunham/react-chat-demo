/**
 * @file App.js
 *
 * Top level Component that wraps the application. Shows a Login form if no
 * account exists in the application state, otherwise constructs a Route
 * layout for navigation.
 */

import React, {Component} from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import cookie from 'react-cookie'

import * as actionCreators from '../actions'
import Login from './Login'
import Welcome from './Welcome'
import Room from './Room'

@connect(
  (state) => ({
    account: state.account
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
export default class App extends Component {

  /**
   * Intercept the componentDidMount callback and check to see if cookies
   * have been set with account credentials - if present, store in application
   * state using the SET_ACCOUNT action.
   */
  componentDidMount() {
    const { account, actions } = this.props
    
    if (account == null && cookie.load('chat__email') != null) {
      actions.setAccount({ email: cookie.load('chat__email'),
                           nick: cookie.load('chat__nick') })
    }
  }
  
  /**
   * Render the JSX for the Component
   * @returns {string}
   */
  render() {
    const { account } = this.props
    
    if (account == null) {
      return (
        <Provider store={this.props.store}>
          <Login />
        </Provider>
      )
    } else {
      return (
        <Provider store={this.props.store}>
          <Router history={browserHistory}>
            <Route path="/" component={Welcome} />
            <Route path="/room/:id" component={Room} />
          </Router>
        </Provider>
      )
    }
  }
}