/* eslint-disable */
const {
  User,
  // Goods,
  CartList
} = require('../models')
// const {Sequelize} = require('Sequelize')
const {inspect} = require('util')
pe = require('parse-error')

const to = function (promise) {
  return promise
    .then(data => {
      return [null, data]
    }).catch(err => [pe(err)])
}

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

      // let user = req.user
      // let err, companies
      // console.log(`user: ${inspect(user)}`)
      // [err, companies] = await to(cartlists.getUser({
      //   include: [{
      //     association: Cartlist.Users
      //   }]
      // }))
      [err, companies] = await to(user.getCartlists())
      console.log(`companies: ${inspect(companies)}`)
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
