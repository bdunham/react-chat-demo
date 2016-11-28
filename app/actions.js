/**
 * @file actions.js
 * 
 * Actions relating to manipulation of the account state variable
 */

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const LOGOUT = 'LOGOUT'

/**
 * Set the account state variable
 * @param {Object} account - The account details to be stored in app state
 * @returns {Object}
*/
export function setAccount(account) {
  return { type: SET_ACCOUNT, account: account }
}

/**
 * Remove the account state variable
 * @returns {Object}
*/
export function logout() {
  return { type: LOGOUT }
}