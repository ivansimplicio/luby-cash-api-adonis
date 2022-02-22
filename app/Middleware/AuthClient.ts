import StandardError from 'App/Exceptions/Errors/StandardError'
import { userHasRole } from 'App/Services/UserService'
import Roles from 'App/Enums/Roles'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthClient {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user
    if (user) {
      const isClient = await userHasRole(user, Roles.CLIENT)
      if (!isClient) {
        response.status(403).send(new StandardError('FORBIDDEN', 403, 'not authorized'))
      } else {
        await next()
      }
    }
  }
}
