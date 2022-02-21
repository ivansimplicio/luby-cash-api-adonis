import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullName: schema.string.optional({ trim: true }, [rules.maxLength(100)]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({ trim: true }, [rules.minLength(8), rules.maxLength(30)]),
  })

  public messages = {}
}
