import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableTransfers extends BaseSchema {
  protected tableName = 'transfers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('cpf_origin', 20).notNullable()
      table.string('cpf_destination', 20).notNullable()
      table.double('price').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
