'use strict'

/*
| Auth Route Contoller
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Login intent
  Route.post('login', 'AuthController.login')
})
  .prefix('api/v1/auth')
