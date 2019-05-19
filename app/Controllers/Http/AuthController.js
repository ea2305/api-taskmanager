'use strict'

// Models
const User = use('App/Models/User')

// Tools
const Logger = use('Logger')
const Event = use('Event')
const Env = use('Env')

// Libs
const randtoken = require('rand-token')

class AuthController {
  /**
   * Login user controller
   * @param {Object} ctx.request : HTTP Request
   * @param {Object} ctx.response : HTTP Request
   */
  async login ({ request, response, auth }) {
    // get user request information
    const filter = ['email', 'password']
    const { email, password } = request.only(filter)

    try {
      // Attemp login
      const token = await auth.attempt(email, password)
      // return token to client
      return response.ok({ token: token.token, type: token.type })
    } catch (error) {
      if (Env.get('Logger') == 'true')
        Logger.error(error)
        return response.unauthorized({ error: 'wrong credentials' })
    }
  }

  /**
   * Restore password intent
   * @param {Object} ctx.request  
   * @param {Object} ctx.response  
   */
  async restoreRequest ({ request, response }) {
    const { email } = request.only(['email'])

    try {
      // Find user
      const user = await User.findByOrFail('email', email)
      // Generate random token
      const token = randtoken.generate(16)
      // Create restore token
      // const token = await Token.create({ token, type: 'restore-password' })
      // Send email
      Event.fire('auth::restore_request', { 
        username: user.username,
        email: user.email,
        page: Env.get('MAIL_BASE_URL'),
        token
      })
      return response.ok({ message: 'The request was sent' })
    } catch (error) {
      if (Env.get('DEBUG') == 'true')
        Logger.error(error)
      return response.notFound({ error: 'The email is not registered' })
    }
  }

  /**
   * Get user information througth token
   * @param {Object} ctx.auth Auth service instance
   * @param {Object} ctx.response
   */
  async profile ({ auth, response }) {
    return response.ok({ user: auth.user, auth: true })
  }
}

module.exports = AuthController
