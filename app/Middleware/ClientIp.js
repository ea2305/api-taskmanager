'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ClientIp {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ($, next) {
    // call next to advance the request
    let headers = $.request.headers()
      
    // Tier header search by ip
    let ip = (headers['x-forwarded-for']) ? 
      headers['x-forwarded-for'].split(',')[0] : 
      $.request.ip()
    
    // set ip to request
    $.clientIp = ip

    await next()
  }
}

module.exports = ClientIp
