import ConsumerService from 'App/Services/Kafka/ConsumerService'
import Route from '@ioc:Adonis/Core/Route'

import 'App/Modules/Admin/routes'
import 'App/Modules/Client/routes'
import 'App/Modules/Transfer/routes'

new ConsumerService().consume('valued_client')

Route.post('login', 'AuthController.login')
Route.post('forgot-password', 'PasswordsController.forgotPassword')
Route.post('reset-password', 'PasswordsController.resetPassword')

Route.get('/', async () => {
  return { api: 'luby-cash' }
})
