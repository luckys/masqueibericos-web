/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('main/app')
})

Route.get('login', async ({ view }) => {
  return view.render('auth/login')
})

Route.post('auth/login', 'AuthLoginController.store')

Route.get('dashboard', async ({ view }) => {
  return view.render('admin/dashboard')
})

Route.post('bookings', 'BookingsController.store').as('booking.store')
Route.post('reasons', 'ReasonsController.store').as('reason.store')
