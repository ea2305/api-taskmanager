'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const EntityLoginAttemp = use('App/Models/LoginAttemp')
const moment = require('moment')

const Env = use('Env')
const Logger = use('Logger')

// Const validation
const _allowed_attemps = 5
const _cooldown_time = 10

class LoginAttemp {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, clientIp }, next) {
    // find last login attemp
    const loginAttemp = await EntityLoginAttemp.findBy('ip', clientIp)

    if (loginAttemp) {
      // how many tries
      const attemps = loginAttemp.attemps
      if (attemps >= _allowed_attemps) {
        // wait for time
        let now = moment()
        let last_login = moment(loginAttemp.last_login)
        // validation
        if (now.diff(last_login, 'minutes') >= _cooldown_time) {
          // update attemps
          loginAttemp.attemps = 1
          await loginAttemp.save()
          // allow flow
          await next()
        } else {
          // error to many request
          return response.tooManyRequests({ message: 'Too many request' })
        }
      } else {
        loginAttemp.attemps += 1
        loginAttemp.last_login = moment()
        await loginAttemp.save()
        // call next to advance the request
        await next()
      }
    } else {
      await EntityLoginAttemp.create({
        last_login: moment(),
        ip: clientIp,
        attemps: 1
      })
      // call next to advance the request
      await next()
    }
  }
}

module.exports = LoginAttemp
