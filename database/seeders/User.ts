import Status from 'App/Enums/Status'
import User from 'App/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'User Admin',
        email: 'admin@email.com',
        password: 'senha123',
        cpf: '111.111.111-11',
      },
      {
        name: 'Ivan Simplício',
        email: 'ivan@email.com',
        password: 'senha123',
        cpf: '222.222.222-22',
        status: Status.APPROVED,
      },
      {
        name: 'José Alves',
        email: 'jose@email.com',
        password: 'senha123',
        cpf: '333.333.333-33',
        status: Status.APPROVED,
      },
      {
        name: 'Maria Silva',
        email: 'maria@email.com',
        password: 'senha123',
        cpf: '444.444.444-44',
        status: Status.DISAPPROVED,
      },
    ])
  }
}
