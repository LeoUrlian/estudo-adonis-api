'use strict'

const Produto = use("App/Models/Produto")

class ProdutoController {
  async create ({response, request}){
    const data = request.post()
      
    const produtoCreated = await Produto.create(data)

    response.status(200).send({"error": false, "result": produtoCreated})
  }

  async get ({response, request}){
    const page = request.input('page', 1)
    const limit = request.input('limit', null)
    let produtos = {}

    if(limit){
      produtos = await Produto.query().paginate(page, limit)
    }
    else{
      let produtosData = await Produto.query().fetch()
      produtos.total = produtosData.toJSON().length
      produtos.perPage = produtosData.toJSON().length
      produtos.page = 1
      produtos.lastPage = 1
      produtos.data = produtosData.toJSON()
    }

    response.status(200).send({"error": false, "result": produtos})
  }

  async getById ({response, params}){

    const produtos = await Produto.find(params.id)

    if(produtos === null){

      response.status(404).send({"error": true, "result": "Produto Not Found"})
    }
    else{

      response.status(200).send({"error": false, "result": produtos})
    }
  }

  async update ({response, request, params}){
    const data = request.post()

    const produtos = await Produto.find(params.id)

    if(produtos === null){
      response.status(404).send({"error": true, "result": "Produto Not Found"})
    }
    else{
      produtos.merge(data)
      let result = await produtos.save()

      response.status(200).send({"error": true, "result": result})
    }
  }

  async delete ({response, params}){
    const affectRows = await Produto.query()
      .where('ID_PRODUTO', params.id)
      .update({
        "STATUS": 0
      })

    response.status(200).send({"error": false, "result": affectRows})
  }

}

module.exports = ProdutoController
