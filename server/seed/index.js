const {sequelize, Good} = require('../models')

const Promise = require('bluebird')
const goods = require('./seed.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      goods.result.map(good => {
        Good.create(good)
      })
    )
  })
