/**
 * @file utlities.js
 * 
 * Helper functions to support the Chat application
 */

import _ from 'lodash'

/**
 * This function takes a rule string (a newline separated set of rules),
 * and uses each rule to match the supplied email address
 * 
 * Each rule consists of a string which must match the email address
 * precisely - however an asterisk can be used as a wildcard to match
 * a string of any length e.g.
 * 
 * ben@examples.com
 * *@examples.com
 * ben@*
 * b*@*.com
 * 
 * will all pass "ben@examples.com".
 * 
 * Any passing rule ends the test. Only fails overall if ALL tests fail.
 *
 * @param {string} rules - The rule list to be checked
 * @param {string} email - The email address of the account to be verified
 * @returns {Boolean}
 */
export function testEmailMatchesRoomRules(rules, email) {
  if (rules.trim() == '') return true

  for (const rule of rules.split(/\s/)) {
    if ((new RegExp('^' + _.escapeRegExp(rule).replace(/\\\*/g, '(.*)') + '$', 'i')).test(email)) {
      return true
    }
  }
  return false
}