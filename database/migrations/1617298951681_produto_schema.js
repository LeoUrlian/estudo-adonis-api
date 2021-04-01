
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produto', (table) => {
      table.increments('ID_PRODUTO').unsigned().notNullable()
      table.string('NOME', 255).notNullable()
      table.decimal('PRECO', 20, 8).notNullable()
      table.string('DESCRICAO', 255)
      table.string('MARCA', 255)
      table.bigInteger('STATUS').defaultTo(1)
    })
  }

  down () {
    this.drop('produto')
  }
}

module.exports = ProdutoSchema