import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transfer from 'App/Models/Transfer'

export default class TranferSeeder extends BaseSeeder {
  public async run() {
    await Transfer.createMany([
      {
        cpfOrigin: '21505781078',
        cpfDestination: '91512389005',
        value: 250,
      },
      {
        cpfOrigin: '21505781078',
        cpfDestination: '33469009082',
        value: 250,
      },
      {
        cpfOrigin: '33469009082',
        cpfDestination: '21505781078',
        value: 150,
      },
    ])
  }
}
