'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Workspace extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'WorkspaceHook.uuid')
    this.addHook('beforeSave', 'WorkspaceHook.slug')
  }

  static get primaryKey () {
    return 'uid'
  }

  static get incrementing () {
    return false
  }
}

module.exports = Workspace
