'use strict'

const Env = use('Env')
const Logger = use('Logger')

class AuthController {
  /**
   * Login user controller
   * @param {Object} request : HTTP Request
   * @param {Object} response : HTTP Request
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
        return response.unauthorized({ error: 'bad credentials' })
    }
  }
}

module.exports = AuthController
