'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoginAttempSchema extends Schema {
  up () {
    this.create('login_attemps', (table) => {
      table.increments()

      table.string('ip', 128).notNullable()
      table.integer('attemps').defaultTo(0)
      table.date('last_login')

      table.timestamps()
    })
  }

  down () {
    this.drop('login_attemps')
  }
}

module.exports = LoginAttempSchema
