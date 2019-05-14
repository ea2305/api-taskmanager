'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('User Login')
trait('Test/ApiClient')

/**
 * In this test we will cover the following aspects
 * [ok] login request with bad email
 * [ok] login request with bad password
 * [ok] login successful request
 * login request with limit to request allowed
 */
test('[Login] Request access with a wrong email', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: 'bad_email@example.com',
      password: 'fake_password'
    })
    .end()
  // Check response status
  response.assertStatus(401)
  
  // check response content
  response.assertJSONSubset({ error: 'bad credentials' })

  // delete test user
  await user.delete()
})

test('[Login] Request access with a wrong password', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'bad_password___'
    })
    .end()
  // Check response status
  response.assertStatus(401)
  
  // check response content
  response.assertJSONSubset({ error: 'bad credentials' })

  // delete test user
  await user.delete()
})

test('[Login] Successful request login with email & password', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()
  // Check response status
  response.assertStatus(200)
  
  // check response content
  response.assertJSONSubset({ type: 'bearer' })

  // delete test user
  await user.delete()
})

