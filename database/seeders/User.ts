import Status from 'App/Enums/Status'
import User from 'App/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DateTime } from 'luxon'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        fullName: 'User Admin',
        email: 'admin@email.com',
        password: 'senha123',
        cpfNumber: '111.111.111-11',
        createdAt: DateTime.local(2022, 1, 1, 0, 0, 0),
      },
      {
        fullName: 'Ivan Simplício',
        email: 'ivan@email.com',
        password: 'senha123',
        uuidClient: '9e384fa1-25f6-4822-b0e2-c06e30af0bc2',
        cpfNumber: '222.222.222-22',
        status: Status.APPROVED,
        createdAt: DateTime.local(2022, 2, 1, 0, 0, 0),
      },
      {
        fullName: 'José Alves',
        email: 'jose@email.com',
        password: 'senha123',
        uuidClient: 'e1619208-8582-4c70-b58b-cde41dcf6c32',
        cpfNumber: '333.333.333-33',
        status: Status.APPROVED,
        createdAt: DateTime.local(2022, 2, 15, 0, 0, 0),
      },
      {
        fullName: 'Maria Silva',
        email: 'maria@email.com',
        password: 'senha123',
        uuidClient: 'a1f0e57b-3c75-4bdb-91b3-e3f4f0cd9cbb',
        cpfNumber: '444.444.444-44',
        status: Status.APPROVED,
        createdAt: DateTime.local(2022, 2, 21, 0, 0, 0),
      },
      {
        fullName: 'João Paulo',
        email: 'joao@email.com',
        password: 'senha123',
        uuidClient: '19bae3dd-f2e0-4757-86d7-676f9c34d7c7',
        cpfNumber: '555.555.555-55',
        status: Status.DISAPPROVED,
        createdAt: DateTime.local(2022, 2, 21, 0, 0, 0),
      },
    ])
  }
}
