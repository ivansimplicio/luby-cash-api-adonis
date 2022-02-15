import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.string('email', 100).unique().notNullable()
      table.string('password', 150).notNullable()
      table.string('uuid_client', 100).unique()
      table.string('cpf', 14).unique()
      table.enu('status', ['', 'pending', 'approved', 'disapproved']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
