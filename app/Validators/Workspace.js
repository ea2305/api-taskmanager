'use strict'

class Workspace {
  get rules () {
    return {
      name: 'required|min:5|max:256'
    }
  }

  get messages () {
    return {
      name: '{{ field }} field is required',
      min: 'Min 5 characteres are required',
      max: 'Max 256 characteres are required'
    }
  }

  get sanitizationRules () {
    return {
      name: 'trim'
    }
  }
}

module.exports = Workspace
