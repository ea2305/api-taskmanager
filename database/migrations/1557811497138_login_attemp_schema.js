'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestAttempSchema extends Schema {
  up () {
    this.create('request_attemps', (table) => {
      table.increments()

      table.string('ip', 128).notNullable()
      table.integer('attemps').defaultTo(0)
      table.date('last_try')

      table.timestamps()
    })
  }

  down () {
    this.drop('request_attemps')
  }
}

module.exports = RequestAttempSchema
