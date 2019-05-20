'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Workspace = use('App/Models/Workspace')

class WorkspaceEntity {
  /**
   * @param {object} ctx
   * @param {Function} next
   */
  async handle (ctx, next) {
    const { workspace_uid } = ctx.params

    try {
      // find entity
      const workspace = await Workspace.findOrFail(workspace_uid)
      // inject into request object
      ctx.workspace = workspace
      // call next to advance the request
      await next()
    } catch (error) {
      return ctx.response.notFound({ error: 'Workspace not found' })
    }
  }
}

module.exports = WorkspaceEntity
