import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    fullName: schema.string({ trim: true }, [rules.maxLength(100)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(30)]),
    phone: schema.string(),
    cpfNumber: schema.string({ trim: true }, [
      rules.cpfIsValid(),
      rules.unique({ table: 'users', column: 'cpf_number' }),
    ]),
    averageSalary: schema.number(),
    address: schema.object().members({
      address: schema.string(),
      city: schema.string(),
      state: schema.string(),
      zipcode: schema.string(),
    }),
  })

  public messages = {}
}
