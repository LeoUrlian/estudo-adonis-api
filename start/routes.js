'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

//USUARIO
Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

//PRODUTOS
Route.post('/api/produto', 'ProdutoController.create').middleware('auth')
Route.get('/api/produto', 'ProdutoController.get').middleware('auth')
Route.get('/api/produto/:id', 'ProdutoController.getById').middleware('auth')
Route.put('/api/produto/:id', 'ProdutoController.update').middleware('auth')
Route.delete('/api/produto/:id', 'ProdutoController.delete').middleware('auth')