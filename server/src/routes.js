// 集中处理从client端过来的请求
const GoodsController = require('./controllers/GoodsController')
const CartController = require('./controllers/CartController')
const AuthenticationController = require('./controllers/AuthenticationController')
const isAuthenticated = require('./policies/isAuthenticated')
// 将下面的server路由请求暴露一个名为app的模块
module.exports = (app) => {
  app.get('/goods', GoodsController.index)
  // app.get('/goods/:page', GoodsController.index)
  app.post('/addcart',
    isAuthenticated,
    CartController.post)
  app.post('/login',
    AuthenticationController.login)
  app.get('/checkout',
    isAuthenticated,
    CartController.checkout)
  // app.post('/a',
  //   AuthenticationController.a)
}
