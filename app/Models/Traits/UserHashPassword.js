'use strict'

const _ = use('lodash')
const Hash = use('Hash')

class UserHashPassword {

  register (Model, customOptions = {}) {
    const defaultOptions = {}

    Model.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.SENHA) {
        userInstance.SENHA = await Hash.make(userInstance.SENHA)
      }
    })
  }
}

module.exports = UserHashPassword