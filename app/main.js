/**
 * @file main.js
 *
 * Application entry point
 */

import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { reduxReactFirebase, firebaseStateReducer } from 'redux-react-firebase'

import { firebaseConfig } from './config'
import { SET_ACCOUNT, LOGOUT } from './actions'
import App from './components/App'

/**
 * State Reducer pure function returning new state with account variable set according
 * to actions performed
 * @param {Object} state - Current state
 * @returns {Object}
 */
function accountStateReducer(state = null, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return Object.assign({}, state, action.account)
    case LOGOUT:
      return null
    default:
      return state
  }
}

/**
 * Combine the accountStateReducer and firebaseStateReducer into a single
 * state reducer to producer the overall state of the application
 */
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  account: accountStateReducer
})

const createStoreWithFirebase = compose(
  reduxReactFirebase(firebaseConfig),
)(createStore)

const store = createStoreWithFirebase(rootReducer)

// Render the application using the App component as the root element
ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
)