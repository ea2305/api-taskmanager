'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('User Login')
const RequestAttemp = use('App/Models/RequestAttemp')
const moment = require('moment')

trait('Test/ApiClient')

/**
 * In this test we will cover the following aspects
 * [ok] login request with bad email
 * [ok] login request with bad password
 * [ok] login successful request
 * [ok] login request with limit to request allowed
 * [] wait for unlock cool down after ban of too many request
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

  // Send request to API with invalid password
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

  // Send request to API 
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

test('[Login] Request limit', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API 5 times
  for (let i = 0; i < 5; i++) {
    await client.post('/api/v1/auth/login')
      .send({ email: user.email, password: 'fake_password_bad'}).end()
  }

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()

  // Check response status
  response.assertStatus(429)
  
  // check response content
  response.assertJSONSubset({ message: 'Too many request' })

  const attemps = await RequestAttemp.query().where('attemps', '>', 4).first()
  await attemps.delete()
  // delete test user
  await user.delete()
})

test('[Login] Attemp after cooldown request limit', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API 5 times
  for (let i = 0; i < 5; i++) {
    await client.post('/api/v1/auth/login')
      .send({ email: user.email, password: 'fake_password_bad'}).end()
  }

  const attemps = await RequestAttemp.query().where('attemps', '>', 3).first()
  attemps.last_try = moment.utc().subtract(1, 'day')
  await attemps

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()

  // Check response status
  response.assertStatus(429)
  
  // check response content
  response.assertJSONSubset({ message: 'Too many request' })

  await attemps.delete()
  // delete test user
  await user.delete()
})
