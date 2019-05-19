'use strict'

class RestoreAccount {
  get rules () {
    return {
      email: 'required|email'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get messages () {
    return {
      email: 'Invalid email format',
      required: '{{ field }} field is required'
    }
  }
}

module.exports = RestoreAccount
