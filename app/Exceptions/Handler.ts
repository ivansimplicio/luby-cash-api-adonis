import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StandardError from './Errors/StandardError'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error.code === 'E_AUTHORIZATION_FAILURE') {
      return ctx.response.status(403).send(new StandardError('FORBIDDEN', 403, 'not authorized'))
    }
    return super.handle(error, ctx)
  }
}
