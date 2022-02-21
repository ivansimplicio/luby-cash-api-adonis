import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullName: schema.string({ trim: true }, [rules.maxLength(100)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(30)]),
  })

  public messages = {}
}
