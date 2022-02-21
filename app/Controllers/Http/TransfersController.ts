import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransferValidator from 'App/Validators/TransferValidator'
import { makePixTransfer, searchClientTransfers } from 'App/Services/TransferService'

export default class TransfersController {
  public async index({ request, response, params }: HttpContextContract) {
    const requestParams = request.only(['from', 'to'])
    const transfers = await searchClientTransfers(params.cpf, requestParams)
    return response.ok(transfers)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(TransferValidator)
    if (auth.user) {
      await makePixTransfer({
        cpfOrigin: auth.user.cpfNumber,
        cpfDestination: payload.cpf,
        value: payload.value,
      })
    }
    return response.noContent()
  }

  public async show({}: HttpContextContract) {}
}
