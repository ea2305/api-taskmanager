'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const uuid = require('uuid')

const UserHook = exports = module.exports = {}

UserHook.uuid = async (user) => {
  user.primaryKeyValue = uuid.v4()
}

UserHook.password = async (user) => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}
