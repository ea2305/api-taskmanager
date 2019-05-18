'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('User Login')
const RequestAttemp = use('App/Models/RequestAttemp')
const moment = require('moment')

trait('Test/ApiClient')

/**
 * In this test we will cover the following aspects
 * [x]  login request with wrong email
 * [x] login email required validation
 * [x] login email format validation
 * [x]  login request with wrong password
 * [x] login password require validation
 * [x] login password min validation
 * [x] login password min validation
 * [x]  login successful request
 * [x]  login request with limit to request allowed
 * [x]  wait for unlock cool down after ban of too many request
 */
test('[Login] access with a wrong email', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: 'wrong_email@example.com',
      password: 'fake_password'
    })
    .end()
  // Check response status
  response.assertStatus(401)
  
  // check response content
  response.assertJSONSubset({ error: 'wrong credentials' })

  // delete test user
  await user.delete()
})

test('[Login] require email field', async ({ client }) => {
  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')  
    .send({ password: 'fake_password' })
    .end()
  // Check response status
  response.assertStatus(400)

  try {
    // Check response status
    response.assertStatus(400)
    // check response content
    response.assertJSONSubset([
      {
        "field": "email",
        "validation": "required"
      }
    ])
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
  }
})

test('[Login] email field format', async ({ client }) => {
  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')  
    .send({ email: 'asdfaasdfasdfasdf', password: 'fake_password' })
    .end()

  try {
    // Check response status
    response.assertStatus(400)
    // check response content
    response.assertJSONSubset([
      {
        "field": "email",
        "validation": "email"
      }
    ])
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
  }
})

test('[Login] access with a wrong password', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API with invalid password
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'wrong_password___'
    })
    .end()
  // Check response status
  response.assertStatus(401)
  
  // check response content
  response.assertJSONSubset({ error: 'wrong credentials' })

  // delete test user
  await user.delete()
})

test('[Login] password required', async ({ client }) => {
  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')  
    .send({ email: 'asdf@asdf.com' })
    .end()

  try {
    // Check response status
    response.assertStatus(400)
    // check response content
    response.assertJSONSubset([
      {
        "field": "password",
        "validation": "required"
      }
    ])
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
  }
})

test('[Login] password min req', async ({ client }) => {
  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')  
    .send({ email: 'asdf@asdf.com', password: 'asdf' })
    .end()

  try {
    // Check response status
    response.assertStatus(400)
    // check response content
    response.assertJSONSubset([
      {
        "field": "password",
        "validation": "min"
      }
    ])
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
  }
})

test('[Login] password max req', async ({ client }) => {
  // Send request to API with invalid email
  const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')  
    .send({ email: 'asdf@asdf.com', password: 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf' })
    .end()

  try {
    // Check response status
    response.assertStatus(400)
    // check response content
    response.assertJSONSubset([
      {
        "field": "password",
        "validation": "max"
      }
    ])
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
  }
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
      .send({ email: user.email, password: 'wrong_fake_password'}).end()
  }

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()

  try {
    // Check response status
    response.assertStatus(429)
    
    // check response content
    response.assertJSONSubset({ message: 'Too many request' })
  } finally {
    const attemps = await RequestAttemp.last()
    await attemps.delete()
    // delete test user
    await user.delete()
  }
})

test('[Login] Attemp after cooldown request limit', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  // Send request to API 5 times
  for (let i = 0; i < 5; i++) {
    await client.post('/api/v1/auth/login')
      .send({ email: user.email, password: 'wrong_fake_password'}).end()
  }

  const attemps = await RequestAttemp.last()
  attemps.last_try = moment.utc().subtract(1, 'day').toISOString()
  await attemps.save()

  // send one more time to get the message of error
  const response = await client.post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()

  try {
    // Check response status
    response.assertStatus(200)
    
    // check response content
    response.assertJSONSubset({ type: 'bearer' })
  } finally {
    await attemps.delete()
    // delete test user
    await user.delete()
  }

})
