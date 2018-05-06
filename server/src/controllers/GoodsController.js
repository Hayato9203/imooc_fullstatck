const {Goods} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let goods = null
      goods = await Goods.findAll()

      console.log(`goods: ${goods}`)
      res.send(goods)
    } catch (err) {
      console.log(`err: ${err}`)
      res.status(500).send({
        error: `An error has occured trying to fetch the goods: ${err}`
      })
    }
  }
}
