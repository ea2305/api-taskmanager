'use strict'

/*
| Auth Route Contoller
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Login intent
  Route.post('login', 'AuthController.login')
    .middleware(['login_attemp'])

  Route.post('password/restore', 'AuthController.restoreRequest')
})
  .prefix('api/v1/auth')
