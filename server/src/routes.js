// 集中处理从client端过来的请求
const GoodsController = require('./controllers/GoodsController')
const AuthenticationController = require('./controllers/AuthenticationController')

// 将下面的server路由请求暴露一个名为app的模块
module.exports = (app) => {
  app.get('/goods', GoodsController.index)
  // app.get('/goods/:page', GoodsController.index)
  app.post('/addcart', GoodsController.post)
  app.post('/login',
    AuthenticationController.login)
  app.post('/a',
    AuthenticationController.a)
}
