import { DateTime } from 'luxon'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transfer from 'App/Models/Transfer'

export default class TranferSeeder extends BaseSeeder {
  public async run() {
    await Transfer.createMany([
      {
        cpfOrigin: '222.222.222-22',
        cpfDestination: '333.333.333-33',
        value: 50,
        createdAt: DateTime.local(2022, 2, 1, 0, 0, 0),
      },
      {
        cpfOrigin: '222.222.222-22',
        cpfDestination: '444.444.444-44',
        value: 60,
        createdAt: DateTime.local(2022, 2, 15, 0, 0, 0),
      },
      {
        cpfOrigin: '333.333.333.33',
        cpfDestination: '222.222.222-22',
        value: 80,
        createdAt: DateTime.local(2022, 2, 21, 0, 0, 0),
      },
    ])
  }
}
