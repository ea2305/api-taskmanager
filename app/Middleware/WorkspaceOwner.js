'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class WorkspaceOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ workspace, response, auth }, next) {
    // get ws owner
    const workspace_owner = await workspace.owner().fetch()

    if (workspace_owner.uid === auth.user.uid) {
      // call next to advance the request
      await next()
    } else {
      return response.unauthorized({ error: 'You are not the owner of this workspace'})
    }
  }
}

module.exports = WorkspaceOwner
