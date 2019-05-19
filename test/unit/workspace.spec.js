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

test('[Workspace] ', async ({ client }) => {
  // Create test user
  const user = await Factory.model('App/Models/User').create()

  try {
    // send one more time to get the message of error
    const response = await client.post('/api/v1/auth/login')
    .header('accept', 'application/json')    
    .send({
      email: user.email,
      password: 'fake_password'
    })
    .end()
  } finally {
    await user.delete()
  }
})
