'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('cliente', (table) => {
      table.increments('ID_CLIENTE').unsigned().notNullable()
      table.integer('FK_ID_PRODUTO').unsigned().references('ID_PRODUTO').inTable('produto')
      table.integer('CPF', 11).unique().notNullable()
      table.string('NOME', 255).notNullable()
      table.string('SOBRENOME', 255).notNullable()
      table.string('EMAIL', 255).unique()
      table.date('DATA_NASCIMENTO').notNullable()
    })
  }

  down () {
    this.drop('cliente')
  }
}

module.exports = ClienteSchema