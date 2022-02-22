import Status from 'App/Enums/Status'
import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StandardError from 'App/Exceptions/Errors/StandardError'
import LoginUser from 'App/Validators/LoginUserValidator'
import { loadUserRoles } from 'App/Services/UserService'
import { getOnlyAdminInfo } from 'App/Services/AdminService'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(LoginUser)
    try {
      const user = await User.findBy('email', payload.email)
      if (user?.status === Status.DISAPPROVED || user?.status === Status.PENDING) {
        throw new Error()
      }
      const token = await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '7days',
        name: user?.serialize().email,
      })
      if (user) {
        const result = await loadUserRoles(user)
        if (result.roles.includes('admin')) {
          return { token, user: getOnlyAdminInfo(result) }
        }
        return { token, user: result }
      }
    } catch {
      return response.badRequest(
        new StandardError('BAD_REQUEST', 400, 'Invalid credentials or inactive registration')
      )
    }
  }
}
