import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StandardError from './Errors/StandardError'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response
        .status(404)
        .send(new StandardError('NOT_FOUND', 404, 'non-existent or already used token'))
    }
    if (error.code === 'E_AUTHORIZATION_FAILURE') {
      return ctx.response.status(403).send(new StandardError('FORBIDDEN', 403, 'not authorized'))
    }
    if (error.code === 'ER_WRONG_VALUE') {
      return ctx.response
        .status(404)
        .send(new StandardError('BAD_REQUEST', 400, 'Invalid date. Use the yyyy-mm-dd format.'))
    }
    return super.handle(error, ctx)
  }
}
