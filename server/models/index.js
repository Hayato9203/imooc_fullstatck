const Sequelize = require('sequelize')
const db = {}
const path = require('path')

const sequelize = new Sequelize('imooc_mall', 'root', 'Qshh92100#', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate().then(() => {
  console.log(`Connection has been established successfully.`)
}).catch(err => {
  console.error(`Unable to connect to the database: ${err}`)
})

const model = sequelize.import(path.join(__dirname, 'Goods.js'))
// console.log(`model.name: ${model.name}`)
db[model.name] = model

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
