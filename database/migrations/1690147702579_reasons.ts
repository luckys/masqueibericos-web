import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reasons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.string('email').notNullable()
      table.string('reason_type').notNullable()
      table.text('reason_text').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
