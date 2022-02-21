import StandardError from 'App/Exceptions/Errors/StandardError'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class ClientNotFoundException extends Exception {
  public code = 'NOT_FOUND'
  public status = 404

  constructor() {
    super('No client record was found that has this CPF number.')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    return ctx.response
      .status(error.status)
      .send(new StandardError(error.code, error.status, error.message))
  }
}
