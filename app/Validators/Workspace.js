'use strict'

class Workspace {
  get rules () {
    return {
      name: 'required'
    }
  }

  get messages () {
    return {
      name: '{{ field }} field is required'
    }
  }

  get sanitizationRules () {
    return {
      name: 'trim'
    }
  }
}

module.exports = Workspace
