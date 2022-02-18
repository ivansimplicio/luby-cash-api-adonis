import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('pix', 'TransfersController.store').middleware('isClient')
})
  .prefix('transfers')
  .middleware(['auth'])
