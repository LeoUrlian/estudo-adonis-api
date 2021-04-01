'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FornecedorSchema extends Schema {
  up () {
    this.create('fornecedor', (table) => {
      table.increments('ID_FORNECEDOR').unsigned().notNullable()
      table.integer('FK_ID_PRODUTO').unsigned().references('ID_PRODUTO').inTable('produto')
      table.integer('NOME', 255).notNullable()
      table.integer('CNPJ', 14).unique().notNullable()
      table.string('NOME_FANTASIA', 255).notNullable()
      table.string('RAZAO_SOCIAL', 255)
      table.integer('TELEFONE', 255)
      table.bigInteger('ATIVO').defaultTo(1)
    })
  }

  down () {
    this.drop('fornecedor')
  }
}

module.exports = FornecedorSchema