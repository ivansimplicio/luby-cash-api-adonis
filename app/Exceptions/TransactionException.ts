import StandardError from 'App/Exceptions/Errors/StandardError'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class TransactionException extends Exception {
  public code = 'UNPROCESSABLE_ENTITY'
  public status = 422

  constructor(message: string) {
    super(message)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    return ctx.response
      .status(error.status)
      .send(new StandardError(error.code, error.status, error.message))
  }
}
