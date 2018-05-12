const {Goods} = require('../models')
const {Sequelize} = require('Sequelize')
// const {inspect} = require('util')

module.exports = {
  async index (req, res) {
    try {
      let goods = null
      let page = Number(req.query.page)
      // console.log(typeof req.query.start)
      if (page) {
        // 每页记录条数
        let pageSize = Number(req.query.pagesize) || 8
        // 价格区间
        let start = parseFloat(req.query.start).toFixed(2)
        let end = parseFloat(req.query.end).toFixed(2)
        // console.log(!isNaN(start), !isNaN(end))
        if (!isNaN(start) && !isNaN(end)) {
          var options = {
            productPrice: {
              [Sequelize.Op.between]: [start, end]
            }
          }
        }
        // console.log(`start: ${start}, end: ${end}, options: ${inspect(options)}`)
        // 将会跳过数据的条数
        let skip = (page - 1) * pageSize

        goods = await Goods.findAll({
          // 选择需要的column
          attributes: ['productId', 'productName', 'productPrice', 'productImage'],
          // 跳过条目
          offset: skip,
          // 显示后续条目
          limit: pageSize,
          where: options
          // ASC是升序,这里暂时不需要排序,有client端自动完成
          // order: [['productPrice', 'ASC']],
          // DESC是降序
          // order: [['productPrice', 'DESC']]
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
