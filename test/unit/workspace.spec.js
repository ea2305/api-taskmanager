'use strict'

const { test, trait } = use('Test/Suite')('Workspace')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

/**
 * Workspace configuration, users can create a workspace.
 * One user has many workspaces. WS has one owner, and many users.
 * [x] Create one workspace (name is required)
 * [x] Create one workspace (name min text)
 * [x] Create one workspace (name max text)
 * [x] Create one workspace (description is required)
 * [] Create one workspace (description min text)
 * [] Create one workspace (description max text)
 * [] Create one workspace success
 */

test('[Workspace] Create, name id required', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')    
      .send({
        description: 'Without description'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'name', validation: 'required' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, name min characters', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: 'a',
        description: 'Without description'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'name', validation: 'min' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, name max characters', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: '256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256256asdfasdfasdfas',
        description: 'Without description'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'name', validation: 'max' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, description is requiered', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: 'example name'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'description', validation: 'required' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, description min chars', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: 'example name',
        description: 'a'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'description', validation: 'min' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, description max chars', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: 'example name',
        description: '512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512512...'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(400)
    
    // check response content
    response.assertJSONSubset([{ field: 'description', validation: 'max' }])
  } finally {
    await user.delete()
  }
})

test('[Workspace] Create, description max chars', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/workspace')
      .header('accept', 'application/json')
      .send({
        name: 'example name',
        description: 'description'
      })
      .loginVia(user, 'jwt')
      .end()

    // Check response status
    response.assertStatus(201)
    
    // check response content
    response.assertJSONSubset({ name: 'example name', description: 'description' })
  } finally {
    await user.delete()
  }
})


