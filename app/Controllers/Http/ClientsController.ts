import Roles from 'App/Enums/Roles'
import UserRoles from 'App/Models/UserRoles'
import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClient from 'App/Validators/CreateClientValidator'
import Status from 'App/Enums/Status'
import ProducerService from 'App/Services/Kafka/ProducerService'

export default class ClientsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClient)
    const { fullName, email, password, cpfNumber } = payload
    const client = await User.create({
      name: fullName,
      email,
      password,
      cpf: cpfNumber,
      status: Status.PENDING,
    })
    await UserRoles.create({ userId: client.id, roleId: Roles.CLIENT })
    new ProducerService().produceTopicCustomerRegistration(payload)
    return response.created()
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
