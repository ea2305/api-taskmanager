'use strict'

const { test, trait } = use('Test/Suite')('Auth')
const Factory = use('Factory')


trait('Test/ApiClient')
trait('Auth/Client')

/**
 * Test Auth middleware functionality
 * [] User is not auth
 * [] User is auth
 */

test('[Auth] User is authenticated', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/v1/auth/profile')
    .loginVia(user, 'jwt')
    .end()

  try {
    // Check response status
    response.assertStatus(200)
    
    // check response content
    response.assertJSONSubset({ auth: true })

  } finally {
    // delete test user
    await user.delete()
  }
})

test('[Auth] User is not authenticated', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/v1/auth/profile')
    .header('accept', 'application/json')  
    .end()

  try {
    // Check response status
    response.assertStatus(401)
    
    // check response content
    response.assertJSONSubset({ status: 401 })

  } finally {
    // delete test user
    await user.delete()
  }
})
