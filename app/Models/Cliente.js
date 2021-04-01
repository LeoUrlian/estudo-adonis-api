'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
  static boot () {
      super.boot()
  
      // caseparse deve vir primeiro
      this.addTrait('CaseParse')
      this.addTrait('NoTimestamp')
  }
  
  static get Serializer () {
      return use('App/Models/Serializers/JsonSerializer')
  }
  
  static get table() {
      return 'cliente'
  }
  
  static get createdAtColumn(){
     return null
  }
  
  static get updatedAtColumn(){
     return null
  }
   
  static get primaryKey () {
      return 'ID_CLIENTE'
  }

  produto() {
      return this.hasMany('App/Models/Produto', 'FK_ID_PRODUTO', 'ID_PRODUTO')
  }
}

module.exports = Cliente
