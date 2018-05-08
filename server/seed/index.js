const {
  sequelize,
  Goods,
  User
} = require('../src/models')
const Promise = require('bluebird')
const goods = require('./seed.json')
const users = require('./users.json')

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
      })
    )
  })/* .then(process.exit(0)) */
  .catch(err => {
    console.log(`Insert Data Error: ${err}`)
    process.exit(1)
  })
