/* eslint-disable */
const {
  User,
  // Goods,
  CartList
} = require('../models')
// const {Sequelize} = require('Sequelize')
const {inspect} = require('util')

module.exports = {
  async post (req, res) {
    try {
      const {productId} = req.body
      const userId = req.user.id
      console.log(`userId: ${userId}, productId: ${productId}`)
      // const productItem = await CartList.update({
      //   quantity: 3
      // }, {
      //   where: {
      //     productId: productId
      //   }
      // })
      const productItem = await CartList.findAll({
        where: {
          UserId: userId
        },
        include: [{
          model: User
        }]
      })
      if (productItem.length === 0) {
        productItem = await CartList.create({
          productId: productId,
          quantity: productId
        })
      }
      console.log(`productItem: ${inspect(productItem)}`)
      // const newCart = {}
      res.send(productItem)
    } catch (err) {
      console.log(`CartList error: ${err}`)
      res.status(500).send({
        error: `An error has occured when add product to cart: ${err}`
      })
    }
  },
  async checkout (req, res) {}
}
