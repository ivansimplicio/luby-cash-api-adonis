import Status from 'App/Enums/Status'
import User from 'App/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DateTime } from 'luxon'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'User Admin',
        email: 'admin@email.com',
        password: 'senha123',
        cpf: '111.111.111-11',
        createdAt: DateTime.local(2022, 1, 1, 0, 0, 0),
      },
      {
        name: 'Ivan Simplício',
        email: 'ivan@email.com',
        password: 'senha123',
        cpf: '222.222.222-22',
        status: Status.APPROVED,
        createdAt: DateTime.local(2022, 2, 1, 0, 0, 0),
      },
      {
        name: 'José Alves',
        email: 'jose@email.com',
        password: 'senha123',
        cpf: '333.333.333-33',
        status: Status.APPROVED,
        createdAt: DateTime.local(2022, 2, 15, 0, 0, 0),
      },
      {
        name: 'Maria Silva',
        email: 'maria@email.com',
        password: 'senha123',
        cpf: '444.444.444-44',
        status: Status.DISAPPROVED,
        createdAt: DateTime.local(2022, 2, 21, 0, 0, 0),
      },
    ])
  }
}
