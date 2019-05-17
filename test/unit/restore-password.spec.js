'use strict'

const Event = use('Event')
const Mail = use('Mail')
const Logger = use('Logger')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Restore Password')

trait('Test/ApiClient')

/**
 * in this file we will cover all the following requirements
 * [] request restore password with unregistered account
 * [] request restore password with registered account
 * [] reject request after 3 attemps with wrong email
 * [] wait for unlock cool down after ban of too many request
 */
test('[Restore password] Wrong email request ', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/password/restore')
    .send({ email: 'wrong_email' })
    .end()

  // Check response status
  response.assertStatus(404)
  
  // check response content
  response.assertJSONSubset({ error: 'The email is not registered' })

  // delete test user
  await user.delete()
})

test('[Restore password] Success, email registered ', async ({ assert, client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()
  // start listening
  Event.fake()

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/password/restore')
    .send({ email: user.email })
    .end()

  Event.trap('auth:password_restore', function (data) {
    assert.equal(data.username, user.username)
    assert.isString(data.token)
    assert.equal(data.email, user.email)
  })

  // End connection
  Event.restore()

  // Check response status
  response.assertStatus(200)
  
  // check response content
  response.assertJSONSubset({ message: 'The request was sent' })

  // delete test user
  await user.delete()
})