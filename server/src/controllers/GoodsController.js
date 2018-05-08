const {
  Goods
} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let goods = null
      let page = req.params.page
      // console.log(`page: ${page}`)
      if (page) {
        // 每页4条记录
        let pageSize = 4

        // 将会跳过数据的条数
        let skip = (page - 1) * pageSize

        goods = await Goods.findAll({
          // 选择需要的column
          attributes: ['productName', 'productPrice', 'productImage'],
          // 跳过条目
          offset: skip,
          // 显示后续条目
          limit: pageSize,
          // ASC是升序
          // order: [['productPrice', 'ASC']],
          // DESC是降序
          order: [['productPrice', 'DESC']]
        })
        // console.log(`goods: ${goods}`)
      } else {
        goods = await Goods.findAll()
      }
      res.send(goods)
    } catch (err) {
      console.log(`err: ${err}`)
      res.status(500).send({
        error: `An error has occured trying to fetch the goods: ${err}`
      })
    }
  }
}
