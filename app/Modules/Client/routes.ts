import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'ClientsController.store')
  Route.get('', 'ClientsController.index').middleware('auth').middleware('isAdmin')
}).prefix('clients')
