'use strict'

/*
| Auth Route Contoller
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Login intent
  Route.post('login', 'AuthController.login')
    .middleware(['request_attemp'])

  Route.post('password/restore', 'AuthController.restoreRequest')
    .middleware(['request_attemp'])
})
  .prefix('api/v1/auth')
