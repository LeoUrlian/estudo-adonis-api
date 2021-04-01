'use strict'

const _ = use('lodash')

class CaseParse {

  register (Model, customOptions = {}) {
    const defaultOptions = {}

    function parse (obj) {

      const json = _.transform(obj, (result, value, key) => {

        // trata objetos
        if(Object.prototype.toString.apply(value) === '[object Object]'){
          result[_.snakeCase(key).toUpperCase()] = parse(value)
          return result
        }
        // trata array
        else if(Object.prototype.toString.apply(value) === '[object Array]'){
          result[_.snakeCase(key).toUpperCase()] = []
  
          Object.values(parse(value)).forEach((element) => {
            result[_.snakeCase(key).toUpperCase()].push(element)  
          })

          return result
        } 
        // trata chave valor padrao
        else {
          result[_.snakeCase(key).toUpperCase()] = value
  
          return result
        }
      }, {})

      return json

    }
    
    // evento de criação
    Model.addHook('beforeCreate', (modelInstance) => {
      // converte para senake case
      const response = parse(modelInstance.dirty)

      // substitui cammel case para snake case no atributo de insert no banco
      modelInstance.$attributes = response
    })

    // evento de update
    Model.addHook('beforeUpdate', (modelInstance) => {
      // armazena objeto original (cammel case)
      let originalObject = modelInstance.dirty

      // converte para snake case
      const response = parse(modelInstance.dirty)

      // junta snake case com o cammel case no atributo de insert no banco
      modelInstance.merge(response)

      // remove os cammel case para insert no banco
      modelInstance.$attributes = _.omit(modelInstance.$attributes, _.keys(originalObject))
    })
  }
}

module.exports = CaseParse