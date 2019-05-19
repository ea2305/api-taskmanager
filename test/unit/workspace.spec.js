'use strict'

const { test, trait } = use('Test/Suite')('Workspace')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

/**
 * Workspace configuration, users can create a workspace.
 * One user has many workspaces. WS has one owner, and many users.
 * [] Create one workspace (name is required)
 * [] Create one workspace (name min text)
 * [] Create one workspace (name max text)
 * [] Create one workspace (description is required)
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
