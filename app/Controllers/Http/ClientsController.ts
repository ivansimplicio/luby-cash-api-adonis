import Roles from 'App/Enums/Roles'
import UserRoles from 'App/Models/UserRoles'
import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClient from 'App/Validators/CreateClientValidator'
import Status from 'App/Enums/Status'
import ProducerService from 'App/Services/Kafka/ProducerService'
import { allClients, getOnlyClientInfo } from 'App/Services/ClientService'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.only(['status', 'from', 'to'])
    const clients = await allClients(params)
    return response.ok({ clients })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClient)
    const { fullName, email, password, cpfNumber } = payload
    const clientCreated = await User.create({
      fullName,
      email,
      password,
      cpfNumber,
      status: Status.PENDING,
    })
    await UserRoles.create({ userId: clientCreated.id, roleId: Roles.CLIENT })
    new ProducerService().produceTopicCustomerRegistration(payload)
    const client = getOnlyClientInfo(clientCreated)
    return response.created({ client })
  }
}
