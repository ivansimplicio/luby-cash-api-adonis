import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClient from 'App/Validators/CreateClientValidator'
import Status from 'App/Enums/Status'

export default class ClientsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClient)
    const { fullName, email, password, cpfNumber } = payload
    await User.create({ name: fullName, email, password, cpf: cpfNumber, status: Status.PENDING })
    return response.created()
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
