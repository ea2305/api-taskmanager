'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Workspace = use('App/Models/Workspace')

/**
 * Resourceful controller for interacting with workspaces
 */
class WorkspaceController {
  /**
   * Show a list of all workspaces.
   * GET workspaces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
  }

  /**
   * Create/save a new workspace.
   * POST workspaces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Response} ctx.auth
   */
  async store ({ request, response, auth }) {
    // required parameters
    const parameters = ['name', 'description']
    const workspaceData = request.only(parameters)

    // Store entity
    const workspace = await Workspace.create(workspaceData)
    const user = auth.user
    // make relationship
    await workspace.owner().associate(user)

    return response.created(workspace)
  }

  /**
   * Display a single workspace.
   * GET workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
  }

  /**
   * Update workspace details.
   * PUT or PATCH workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a workspace with id.
   * DELETE workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = WorkspaceController
