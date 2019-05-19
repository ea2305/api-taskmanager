'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkspaceSchema extends Schema {
  up () {
    this.create('workspaces', (table) => {
      table.string('uid').notNullable().unique()

      table.string('name', 256).notNullable()
      table.string('slug_name').notNullable()
      table.string('description', 512).notNullable()

      table.string('owner_id')
        .references('uid')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('workspaces')
  }
}

module.exports = WorkspaceSchema
