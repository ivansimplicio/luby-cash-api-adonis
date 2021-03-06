import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import ForgotPassword from 'App/Validators/ForgotPasswordValidator'
import ResetPassword from 'App/Validators/ResetPasswordValidator'
import TokenExpired from 'App/Exceptions/TokenExpiredException'
import ProducerService from 'App/Services/Kafka/ProducerService'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotPassword)
    const user = await User.findByOrFail('email', email)
    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')
    user.related('tokens').updateOrCreate(
      {
        userId: user.id,
      },
      { token }
    )
    const url = request.completeUrl().replace(request.url(), '/reset-password')
    const resetPasswordUrlWithToken = `${url}?token=${token}`
    await new ProducerService().produceTopicForgotPassword({
      name: user.fullName,
      email,
      url: resetPasswordUrlWithToken,
    })
    return response.noContent()
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const payload = await request.validate(ResetPassword)
    const token = request.input('token')
    const userByToken = await User.query()
      .whereHas('tokens', (query) => {
        query.where('token', token)
      })
      .preload('tokens')
      .firstOrFail()
    const tokenAge = Math.abs(userByToken.tokens[0].createdAt.diffNow('hours').hours)
    if (tokenAge > 4) {
      throw new TokenExpired()
    }
    userByToken.merge(payload)
    await userByToken.save()
    await userByToken.tokens[0].delete()
    return response.noContent()
  }
}
