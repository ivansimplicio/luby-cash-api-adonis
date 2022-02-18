import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransferValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    cpf: schema.string({ trim: true }, [rules.exists({ table: 'users', column: 'cpf' })]),
    value: schema.number([rules.unsigned()]),
  })

  public messages = {}
}
