import StandardError from 'App/Exceptions/Errors/StandardError'
import Roles from 'App/Enums/Roles'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { userHasRole } from 'App/Services/UserService'

export default class AuthAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user
    if (user) {
      const isAdmin = await userHasRole(user, Roles.ADMIN)
      if (!isAdmin) {
        response.status(403).send(new StandardError('FORBIDDEN', 403, 'not authorized'))
      } else {
        await next()
      }
    }
  }
}
