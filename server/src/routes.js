// 集中处理从client端过来的请求
const GoodsController = require('./controllers/GoodsController')

// 将下面的server路由请求暴露一个名为app的模块
module.exports = (app) => {
  app.get('/goods', GoodsController.index)
}
