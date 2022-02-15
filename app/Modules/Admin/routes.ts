import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('admins', 'AdminsController').apiOnly()
}).middleware(['auth', 'isAdmin'])
