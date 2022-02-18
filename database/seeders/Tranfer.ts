import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transfer from 'App/Models/Transfer'

export default class TranferSeeder extends BaseSeeder {
  public async run() {
    await Transfer.createMany([
      {
        cpfOrigin: '222.222.222-22',
        cpfDestination: '333.333.333-33',
        value: 250,
      },
      {
        cpfOrigin: '333.333.333-33',
        cpfDestination: '222.222.222-22',
        value: 150,
      },
    ])
  }
}
