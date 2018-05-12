const {
  sequelize,
  Goods,
  User,
  CartList
} = require('../src/models')
const Promise = require('bluebird')
const goods = require('./goods.json')
const users = require('./users.json')
const cartlists = require('./cartlists.json')

sequelize.sync({
  force: true
})
  .then(async function () {
    await Promise.all(
      goods.map(good => {
        Goods.create(good)
      }),
      users.map(user => {
        User.create(user)
      }),
      cartlists.map(cartlist => {
        CartList.create(cartlist)
      })
    )
  })/* .then(process.exit(0)) */
  .catch(err => {
    console.log(`Insert Data Error: ${err}`)
    process.exit(1)
  })
