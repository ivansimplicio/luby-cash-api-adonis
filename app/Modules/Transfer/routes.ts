import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:cpf', 'TransfersController.index').middleware('isAdmin')
  Route.post('pix', 'TransfersController.store').middleware('isClient')
})
  .prefix('transfers')
  .middleware(['auth'])
