import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Enums/Roles'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'role'
    await Role.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        role: Roles.ADMIN,
      },
      {
        id: 2,
        role: Roles.CLIENT,
      },
    ])
  }
}
