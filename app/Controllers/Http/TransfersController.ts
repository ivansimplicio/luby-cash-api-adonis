import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransferValidator from 'App/Validators/TransferValidator'
import validateTransaction from 'App/Services/TransferService'

export default class TransfersController {
  public async index({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(TransferValidator)
    if (auth.user) {
      await validateTransaction({
        cpfOrigin: auth.user.cpf,
        cpfDestination: payload.cpf,
        value: payload.value,
      })
    }
    return response.noContent()
  }

  public async show({}: HttpContextContract) {}
}
