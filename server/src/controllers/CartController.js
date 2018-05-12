const {
  User,
  // Goods,
  CartList
} = require('../models')
const {
  Sequelize
} = require('Sequelize')
const {
  inspect
} = require('util')

module.exports = {
  async post (req, res) {
    try {
      const {
        productId
      } = req.body
      const userId = req.user
      const productItem = await CartList.update({
        quantity: Sequelize.literal('quantity+1')
      })
      console.log(`productItem: ${inspect(productItem)} ${productId}, userId: ${inspect(userId)}, ${User + 1}`)
      const newCart = {}
      res.send(newCart)
    } catch (err) {
      console.log(`CartList error: ${err}`)
      res.status(500).send({
        error: `An error has occured when add product to database: ${err}`
      })
    }
  },
  async checkout (req, res) {}
}
