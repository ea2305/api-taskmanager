'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:5|max:64'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get messages () {
    return {
      'email': 'Invalid email format',
      'required': '{{ field }} field is required',
      'min': 'The field has not the minimum {{ argument.0 }} characters',
      'max': 'The field has more than {{ argument.0 }} characters'
    }
  }
}

module.exports = Login
