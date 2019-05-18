'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const EntityRequestAttemp = use('App/Models/RequestAttemp')
const moment = require('moment')

// Const validation
const _allowed_attemps = 5
const _cooldown_time = 10

class RequestAttemp {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, clientIp }, next) {
    // find last login attemp
    const requestAttemp = await EntityRequestAttemp.findBy('ip', clientIp)

    if (requestAttemp) {
      // how many tries
      const attemps = requestAttemp.attemps
      if (attemps >= _allowed_attemps) {
        // wait for time
        let now = moment()
        let last_try = moment(requestAttemp.last_try)
        console.log(now, last_try, requestAttemp.last_try)
        // validation
        if (now.diff(last_try, 'minutes') >= _cooldown_time) {
          // update attemps
          requestAttemp.attemps = 1
          await requestAttemp.save()
          // allow flow
          await next()
        } else {
          // error to many request
          return response.tooManyRequests({ message: 'Too many request' })
        }
      } else {
        requestAttemp.attemps += 1
        requestAttemp.last_try = moment()
        await requestAttemp.save()
        // call next to advance the request
        await next()
      }
    } else {
      await EntityRequestAttemp.create({
        last_try: moment().toISOString(),
        ip: clientIp,
        attemps: 1
      })
      // call next to advance the request
      await next()
    }
  }
}

module.exports = RequestAttemp
