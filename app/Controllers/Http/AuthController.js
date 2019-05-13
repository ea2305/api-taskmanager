'use strict'

class AuthController {
  /**
   * Login user controller
   * @param {Object} request : HTTP Request
   * @param {Object} response : HTTP Request
   */
  async login ({ request, response }) {
    // get user request information
    const filter = ['email', 'password']
    const { email, password } = request.only(filter)

    try {
      // Attemp login
      const token = await auth.attempt(email, password)
      // return token to client
      return response.ok({ token: token.token, type: token.type })
    } catch (error) {
      return response.unauthorized({ error: 'bad credentials' })
    }
  }
}

module.exports = AuthController
