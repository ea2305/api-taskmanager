'use strict'

/*
| Auth Route Contoller
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Create resource
  Route.post('/', 'WorkspaceController.store')
    .middleware(['auth'])
    .validator('Workspace')

  // Update current resource
  Route.put('/:workspace_uid', 'WorkspaceController.update')
    .middleware(['auth', 'workspace', 'workspace_owner'])
    .validator('Workspace')
})
  .prefix('api/v1/workspace')
