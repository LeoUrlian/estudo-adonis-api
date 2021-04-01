'use strict'

const Produto = use("App/Models/Produto")

class ProdutoController {
  async create ({response, request}){
    const data = request.post()
      
    const produtoCreated = await Produto.create(data)

    response.status(200).send({"error": false, "result": produtoCreated})
  }
}

module.exports = ProdutoController
