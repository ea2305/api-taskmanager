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
})
  .prefix('api/v1/workspace')
